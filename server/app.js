import express from "express";
import { prisma } from "./prismaClient.js";
import cors from "cors";
import path from "path";
import authRouter from "./routers/authRouter.js";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000;

app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log("server running");
});
