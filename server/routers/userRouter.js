import express from "express";
import verifyToken from "../middleware/jwtVerify.js";
import {
  getUserData,
  getMyUser,
  updateUser,
  toggleFollow,
  searchUsers,
  getSuggestions,
} from "../controllers/userControllers.js";

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.send("user api working");
});
userRouter.get("/my-profile", verifyToken, getMyUser);
userRouter.get("/search", verifyToken, searchUsers);
userRouter.get("/suggestions", verifyToken, getSuggestions);
userRouter.get("/:userId", verifyToken, getUserData);
userRouter.post("/update-user", verifyToken, updateUser);
userRouter.post("/toggle-follow", verifyToken, toggleFollow);
export default userRouter;
