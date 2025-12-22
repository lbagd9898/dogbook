import express from "express";
import {
  validateSignUp,
  postSignUp,
  postLogIn,
  getGithub,
  getGithubCallback,
  postLinkGithub,
} from "../controllers/authControllers.js";
const authRouter = express.Router();

authRouter.get("/", (req, res) => {
  res.send("check");
});
authRouter.post("/sign-up", validateSignUp, postSignUp);
authRouter.post("/log-in", postLogIn);
authRouter.get("/github", getGithub);
authRouter.get("/github/callback", getGithubCallback);
authRouter.post("/link-github", postLinkGithub);

export default authRouter;
