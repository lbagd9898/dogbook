// authControllers.test.js
// Place this at: ./controllers/authControllers.test.js

import { jest } from "@jest/globals";

// --- Mocks (must come before any import of the module under test) ---

const mockIssueTokens = jest.fn();
jest.unstable_mockModule("../middleware/issueTokens.js", () => ({
  issueTokens: mockIssueTokens,
}));

// passport.authenticate returns a middleware function — we mock the whole module
// and expose a setter so each test can control what the callback receives.
let mockAuthImpl;
jest.unstable_mockModule("passport", () => ({
  default: {
    authenticate: jest.fn((strategy, options, callback) => {
      // passport.authenticate("github", async (err, user, info) => {...})(req, res, next)
      // When called with a custom callback (2-arg form), options IS the callback.
      const cb = typeof options === "function" ? options : callback;
      // Return a middleware that, when invoked, calls mockAuthImpl with the cb
      return (req, res, next) => mockAuthImpl(cb, req, res, next);
    }),
  },
}));

// Dynamic imports AFTER unstable_mockModule calls
const { getGithubCallback, postLogIn } = await import(
  "../controllers/authControllers.js"
);

// --- Helpers ---

function makeRes() {
  return {
    redirect: jest.fn(),
    cookie: jest.fn(),
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
}

function makeReq() {
  return {
    session: {},
  };
}

const next = jest.fn();

// --- Tests ---

describe("getGithubCallback", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.CLIENT_URL = "http://localhost:5173/";
  });

  describe("when passport returns an error", () => {
    it("redirects to login?error=github_failed", async () => {
      mockAuthImpl = async (cb) => {
        await cb(new Error("OAuth failure"), null, null);
      };

      const req = makeReq();
      const res = makeRes();

      await getGithubCallback(req, res, next);

      expect(res.redirect).toHaveBeenCalledWith(
        "http://localhost:5173/login?error=github_failed"
      );
      expect(mockIssueTokens).not.toHaveBeenCalled();
    });
  });

  describe("when passport returns a user", () => {
    it("calls issueTokens and redirects to dashboard", async () => {
      const fakeUser = { id: 1, username: "lydia" };

      mockAuthImpl = async (cb) => {
        await cb(null, fakeUser, null);
      };

      const req = makeReq();
      const res = makeRes();

      await getGithubCallback(req, res, next);

      expect(mockIssueTokens).toHaveBeenCalledWith(res, fakeUser);
      expect(res.redirect).toHaveBeenCalledWith(
        "http://localhost:5173/dashboard"
      );
    });

    it("does not set req.session.oauthLink", async () => {
      const fakeUser = { id: 1, username: "lydia" };

      mockAuthImpl = async (cb) => {
        await cb(null, fakeUser, null);
      };

      const req = makeReq();
      const res = makeRes();

      await getGithubCallback(req, res, next);

      expect(req.session.oauthLink).toBeUndefined();
    });
  });

  describe("when passport returns no user and no githubProfile.id", () => {
    it("redirects to login?error=github_failed", async () => {
      mockAuthImpl = async (cb) => {
        await cb(null, false, {}); // info has no githubProfile
      };

      const req = makeReq();
      const res = makeRes();

      await getGithubCallback(req, res, next);

      expect(res.redirect).toHaveBeenCalledWith(
        "http://localhost:5173/login?error=github_failed"
      );
      expect(mockIssueTokens).not.toHaveBeenCalled();
    });

    it("also redirects when info is null", async () => {
      mockAuthImpl = async (cb) => {
        await cb(null, false, null);
      };

      const req = makeReq();
      const res = makeRes();

      await getGithubCallback(req, res, next);

      expect(res.redirect).toHaveBeenCalledWith(
        "http://localhost:5173/login?error=github_failed"
      );
    });
  });

  describe("when passport returns no user but has githubProfile.id", () => {
    it("sets req.session.oauthLink and redirects to /github", async () => {
      const fakeProfile = { id: "gh_99999" };

      mockAuthImpl = async (cb) => {
        await cb(null, false, { githubProfile: fakeProfile });
      };

      const req = makeReq();
      const res = makeRes();

      await getGithubCallback(req, res, next);

      expect(req.session.oauthLink).toEqual({
        provider: "github",
        githubId: "gh_99999",
      });
      expect(res.redirect).toHaveBeenCalledWith("http://localhost:5173/github");
      expect(mockIssueTokens).not.toHaveBeenCalled();
    });
  });
});

describe("postLogIn", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("when passport returns an error", () => {
    it("calls next with the error", async () => {
      const fakeError = new Error("DB exploded");

      mockAuthImpl = async (cb, req, res, next) => {
        await cb(fakeError, null, null);
      };

      const req = makeReq();
      const res = makeRes();
      const next = jest.fn();

      await postLogIn(req, res, next);

      expect(next).toHaveBeenCalledWith(fakeError);
      expect(res.status).not.toHaveBeenCalled();
      expect(mockIssueTokens).not.toHaveBeenCalled();
    });
  });

  describe("when passport returns no user", () => {
    it("responds 401 with the info message", async () => {
      mockAuthImpl = async (cb) => {
        await cb(null, false, { message: "Incorrect password" });
      };

      const req = makeReq();
      const res = makeRes();
      const next = jest.fn();

      await postLogIn(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: "Incorrect password" });
      expect(mockIssueTokens).not.toHaveBeenCalled();
    });
  });

  describe("when passport returns a user", () => {
    it("calls issueTokens and responds 200", async () => {
      const fakeUser = { id: 1, username: "lydia" };

      mockAuthImpl = async (cb) => {
        await cb(null, fakeUser, null);
      };

      const req = makeReq();
      const res = makeRes();
      const next = jest.fn();

      await postLogIn(req, res, next);

      expect(mockIssueTokens).toHaveBeenCalledWith(res, fakeUser);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Login successful",
        user: fakeUser,
      });
    });

    it("calls next if issueTokens throws", async () => {
      const fakeUser = { id: 1, username: "lydia" };
      const tokenError = new Error("Token signing failed");
      mockIssueTokens.mockRejectedValueOnce(tokenError);

      mockAuthImpl = async (cb) => {
        await cb(null, fakeUser, null);
      };

      const req = makeReq();
      const res = makeRes();
      const next = jest.fn();

      await postLogIn(req, res, next);

      expect(next).toHaveBeenCalledWith(tokenError);
      expect(res.status).not.toHaveBeenCalled();
    });
  });
});
