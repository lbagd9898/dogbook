import express from "express";
import { validateSignUp, postSignUp } from "../controllers/authControllers.js";
const authRouter = express.Router();

authRouter.get("/", (req, res) => {
  res.send("check");
});

authRouter.post("/sign-up", validateSignUp, postSignUp);

export default authRouter;
