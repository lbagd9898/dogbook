import { prisma } from "../prismaClient";
import { body } from "express-validator";

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
  const body = req.body;
  res.json({ body });
}
