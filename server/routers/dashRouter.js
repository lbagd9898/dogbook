import express from "express";
import verifyToken from "../middleware/jwtVerify.js";
import {
  getPosts,
  postPost,
  postUpdateLikes,
  postComment,
} from "../controllers/dashControllers.js";

const dashRouter = express.Router();

dashRouter.get("/", (req, res) => {
  res.send("Dashboard API working");
});
dashRouter.get("/get-posts", verifyToken, getPosts);
dashRouter.post("/new-post", verifyToken, postPost);
dashRouter.post("/update-likes", verifyToken, postUpdateLikes);
dashRouter.post("/post-comment", verifyToken, postComment);

export default dashRouter;
