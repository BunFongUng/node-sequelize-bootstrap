import { check } from "express-validator/check";

export const loginValidation = [
  check("email", "Email is required.").exists(),
  check("email").isEmail().withMessage("Invalid email."),
  check("password", "Password is required.").exists(),
  check("password").isLength({ min: 6 }).withMessage("Password must be 6 characters long."),
];

export const registerValidation = [
  check("email", "Email is required").exists(),
  check("email").isEmail().withMessage("Invalid email"),
  check("password", "Password is required.").exists(),
  check("password").isLength({ min: 6 }).withMessage("Password must be 6 characters long."),
  check("fullName", "FullName is required").exists(),
  check("fullName").isLength({ min: 6 }).withMessage("FullName must be 6 characters long."),
];
export default {
  loginValidation,
  registerValidation,
};
