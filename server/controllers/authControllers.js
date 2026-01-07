import { prisma } from "../prismaClient.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import passport from "passport";
import jwt from "jsonwebtoken";

export const validateSignUp = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("username is required")
    .isLength({ min: 5, max: 15 })
    .withMessage("Username must be between 5 and 15 characters"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be a valid email address"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 4, max: 15 })
    .withMessage("Password must be between 4 and 15 characters")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)/)
    .withMessage("Password must contain at least one letter and one number"),
  body("confirmPassword")
    .notEmpty()
    .withMessage("Confirm password is required")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
];

export async function postSignUp(req, res) {
  console.log("server reached");
  //check for errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(200).json({ errors: errors.array() });
  }

  // extract data from req body
  const { username, email, password } = req.body;

  try {
    const existingUsername = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already in use." });
    }

    const existingEmail = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already in use." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return res.status(201).json({ user });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "server error" });
  }
}

export function postLogIn(req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: info.message });

    //user exists and login is successful
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET
    );
    res.cookie("token", token, {
      httpOnly: true,
    });
    return res.status(200).json({ message: "Login successful" });
  })(req, res, next);
}

export const getGithub = [
  passport.authenticate("github", { scope: ["user:email"] }),
];

export function getGithubCallback(req, res, next) {
  passport.authenticate("github", (err, user, info) => {
    if (err) return next(err);
    if (user) {
      console.log("token issued");
      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET
      );
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      return res.redirect(`${process.env.CLIENT_URL}dashboard`);
    }
    console.log(info.githubProfile.id);

    req.session.oauthLink = {
      provider: "github",
      githubId: info.githubProfile.id,
    };

    console.log(req.session.oauthLink);
    return res.redirect(`${process.env.CLIENT_URL}github`);
  })(req, res, next);
}

export function postLinkGithub(req, res, next) {
  passport.authenticate("local", async (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: info.message });
    console.log(user);
    console.log(req.session.oauthLink);
    if (!req.session.oauthLink?.githubId) {
      return res.status(400).json({ message: "No GitHub account to link" });
    }

    try {
      const githubId = req.session.oauthLink.githubId;
      console.log(githubId);

      //link githubid to user
      await prisma.user.update({
        where: { id: user.id },
        data: { githubId },
      });
      //user exists and login is successful
      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET
      );
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      return res
        .status(200)
        .json({ message: "github account linked!", user: user });
    } catch (e) {
      return next(e);
    }
  })(req, res, next);
}

export function getVerify(req, res) {
  const user = req.user;
  if (!user) {
    return res.sendStatus(401);
  }
  console.log("user verified");
  return res.sendStatus(200);
}
