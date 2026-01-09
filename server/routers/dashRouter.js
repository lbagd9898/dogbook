import express from "express";
import verifyToken from "../middleware/jwtVerify.js";
import { verify } from "crypto";
import { getPosts } from "../controllers/dashControllers.js";

const dashRouter = express.Router();

dashRouter.get("/", (req, res) => {
  res.send("Dashboard API working");
});
dashRouter.get("/get-posts", verifyToken, getPosts);

export default dashRouter;
