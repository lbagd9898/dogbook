import express from "express";
import cors from "cors";
import authRouter from "./routers/authRouter.js";
import dashRouter from "./routers/dashRouter.js";
import userRouter from "./routers/userRouter.js";
import passport from "./middleware/passport.js";
import session from "express-session";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

//configure environment variables
dotenv.config();

const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL?.replace(/\/$/, ""),
    credentials: true,
  })
);

//SET THIS UP
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 10 * 60 * 1000, //10 minutes
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
    },
  })
);
app.use(express.json());
app.use(passport.initialize());

app.use("/auth", authRouter);
app.use("/dash", dashRouter);
app.use("/user", userRouter);

//error handler
app.use((err, req, res, next) => {
  console.error(err.stack); // log it server-side
  res
    .status(err.status || 500)
    .json({ error: err.message || "Something went wrong" });
});

export default app;
