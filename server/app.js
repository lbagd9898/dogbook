import express from "express";
import cors from "cors";
import authRouter from "./routers/authRouter.js";
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
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//SET THIS UP
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 10 * 60 * 1000 }, //10 minutes
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
