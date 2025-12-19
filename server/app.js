import express from "express";
import cors from "cors";
import authRouter from "./routers/authRouter.js";
import passport from "./middleware/passport.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(passport.initialize());

const PORT = process.env.PORT || 3000;

app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

export default app;
