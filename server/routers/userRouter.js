import express from "express";
import verifyToken from "../middleware/jwtVerify.js";

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.send("user api working");
});

export default userRouter;
