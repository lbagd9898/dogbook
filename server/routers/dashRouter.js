import express from "express";
import verifyToken from "../middleware/jwtVerify";

const dashRouter = express.Router();

dashRouter.get("/", (req, res) => {
  res.send("Dashboard API working");
});

export default dashRouter;
