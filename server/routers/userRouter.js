import express from "express";
import verifyToken from "../middleware/jwtVerify.js";
import { getUser } from "../controllers/userControllers.js";

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.send("user api working");
});
userRouter.get("/:id", verifyToken, getUser);

export default userRouter;
