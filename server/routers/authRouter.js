import express from "express";
import {
  validateSignUp,
  postSignUp,
  postLogIn,
  getGithub,
  getGithubCallback,
  postLinkGithub,
  getVerify,
} from "../controllers/authControllers.js";
import verifyToken from "../middleware/jwtVerify.js";
const authRouter = express.Router();

authRouter.get("/", (req, res) => {
  res.send("check");
});
authRouter.post("/sign-up", validateSignUp, postSignUp);
authRouter.post("/log-in", postLogIn);
authRouter.get("/github", getGithub);
authRouter.get("/github/callback", getGithubCallback);
authRouter.post("/link-github", postLinkGithub);
authRouter.get("/verify", verifyToken, getVerify);

export default authRouter;
