import { prisma } from "../prismaClient.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";

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
      res.status(400).json({ message: "Username already in use." });
    }

    const existingEmail = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (existingEmail) {
      res.status(400).json({ message: "Email already in use." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ user });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "server error" });
  }
}
