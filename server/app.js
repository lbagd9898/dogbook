import express from "express";
import { prisma } from "./prismaClient.js";

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  const user = prisma.users.findUnique({
    where: {
      id: 1,
    },
  });
  res.send(user);
});

app.listen(PORT, () => {
  console.log("server running");
});
