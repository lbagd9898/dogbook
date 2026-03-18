import { jest } from "@jest/globals";

// --- Swap the real prisma client for the test client ---
// Must come before any import that touches prismaClient.js
// This affects both passport.js and issueTokens.js since both import from there

jest.unstable_mockModule("../prismaClient.js", async () => {
  const { prisma } = await import("../testClient.js");
  return { prisma };
});

// Dynamic imports AFTER mock is registered
const { default: app } = await import("../app.js");
const { prisma } = await import("../testClient.js");
const { default: request } = await import("supertest");

prisma
  .$connect()
  .then(() => console.log("testClient connected successfully"))
  .catch((e) => console.error("testClient connection error:", e.message));

// --- Helpers ---

async function seedUser(overrides = {}) {
  return prisma.user.create({
    data: {
      username: "testdog",
      email: "test@dogbook.com",
      password: "hashedpassword",
      githubId: "gh_12345",
      ...overrides,
    },
  });
}

async function cleanDb() {
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();
}

// --- Tests ---

describe("GET /auth/github/callback (integration)", () => {
  beforeEach(async () => {
    await cleanDb();
  });

  afterAll(async () => {
    await cleanDb();
    await prisma.$disconnect();
  });

  describe("when GitHub returns a user that exists in the DB", () => {
    it("sets cookies and redirects to /dashboard", async () => {
      const user = await seedUser();

      // Simulate passport having already authenticated and attached the user
      // by stubbing the session with the githubId that the strategy would match
      // We do this by hitting the callback URL with a mocked passport strategy.
      // Since we can't fully simulate GitHub's OAuth redirect in integration tests,
      // we test the session-based account linking branch as a proxy for the full flow.
      // For the user-exists branch, we directly invoke the callback via supertest
      // by mocking passport's github strategy response at the session level.

      // The most reliable approach: mock only the github strategy verify function
      // by pre-seeding the user and confirming issueTokens + redirect work end-to-end.

      // Patch: override passport's github strategy for this test only
      const { default: passport } = await import("passport");
      const originalAuthenticate = passport.authenticate.bind(passport);

      passport.authenticate = (strategy, cb) => {
        if (strategy === "github") {
          return (req, res, next) => cb(null, user, null);
        }
        return originalAuthenticate(strategy, cb);
      };

      const res = await request(app).get("/auth/github/callback");

      passport.authenticate = originalAuthenticate;

      expect(res.status).toBe(302);
      expect(res.headers.location).toContain("/dashboard");

      // Verify cookies were set
      const cookies = res.headers["set-cookie"];
      expect(cookies).toBeDefined();
      const cookieNames = cookies.map((c) => c.split("=")[0]);
      expect(cookieNames).toContain("accessToken");
      expect(cookieNames).toContain("refreshToken");
    });

    it("creates a session row in the database", async () => {
      const user = await seedUser();

      const { default: passport } = await import("passport");
      const originalAuthenticate = passport.authenticate.bind(passport);

      passport.authenticate = (strategy, cb) => {
        if (strategy === "github") {
          return (req, res, next) => cb(null, user, null);
        }
        return originalAuthenticate(strategy, cb);
      };

      await request(app).get("/auth/github/callback");

      passport.authenticate = originalAuthenticate;

      const sessions = await prisma.session.findMany({
        where: { userId: user.id },
      });

      expect(sessions).toHaveLength(1);
      expect(sessions[0].userId).toBe(user.id);
      expect(sessions[0].expiresAt).toBeInstanceOf(Date);
    });
  });

  describe("when GitHub returns a user with no matching DB record", () => {
    it("sets oauthLink on session and redirects to /github", async () => {
      const { default: passport } = await import("passport");
      const originalAuthenticate = passport.authenticate.bind(passport);

      passport.authenticate = (strategy, cb) => {
        if (strategy === "github") {
          return (req, res, next) =>
            cb(null, false, { githubProfile: { id: "gh_99999" } });
        }
        return originalAuthenticate(strategy, cb);
      };

      const res = await request(app).get("/auth/github/callback");

      passport.authenticate = originalAuthenticate;

      expect(res.status).toBe(302);
      expect(res.headers.location).toContain("/github");

      // No session should be created in the DB
      const sessions = await prisma.session.findMany();
      expect(sessions).toHaveLength(0);
    });
  });

  describe("when passport returns an error", () => {
    it("redirects to login?error=github_failed", async () => {
      const { default: passport } = await import("passport");
      const originalAuthenticate = passport.authenticate.bind(passport);

      passport.authenticate = (strategy, cb) => {
        if (strategy === "github") {
          return (req, res, next) => cb(new Error("OAuth failure"), null, null);
        }
        return originalAuthenticate(strategy, cb);
      };

      const res = await request(app).get("/auth/github/callback");

      passport.authenticate = originalAuthenticate;

      expect(res.status).toBe(302);
      expect(res.headers.location).toContain("login?error=github_failed");

      // No session should be created in the DB
      const sessions = await prisma.session.findMany();
      expect(sessions).toHaveLength(0);
    });
  });
});
