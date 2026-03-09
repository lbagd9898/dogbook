import express from "express";
import verifyToken from "../middleware/jwtVerify.js";
import {
  getDashboard,
  postPost,
  postUpdateLikes,
  postComment,
  getFollowing,
  getSinglePost,
  uploadImage,
} from "../controllers/dashControllers.js";
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });

const dashRouter = express.Router();

dashRouter.get("/", (req, res) => {
  res.send("Dashboard API working");
});
dashRouter.get("/get-posts", verifyToken, getDashboard);
dashRouter.post("/upload", verifyToken, upload.single("image"), uploadImage);
dashRouter.post("/new-post", verifyToken, postPost);
dashRouter.post("/update-likes", verifyToken, postUpdateLikes);
dashRouter.post("/post-comment", verifyToken, postComment);
dashRouter.get("/get-following", verifyToken, getFollowing);
dashRouter.get("/get-post/:postId", verifyToken, getSinglePost);

export default dashRouter;
