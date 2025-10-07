// import {  validationR } from 'express-validator';
import { body } from "express-validator"

const passwordRegex = new RegExp(
  "^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$"
)

export const userSignupRules = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required.")
    .isString()
    .withMessage("Username must be a string.")
    .matches(/^[a-zA-Z][a-zA-Z0-9_]{7,}$/)
    .withMessage(
      "Username must start with a letter, contain only letters, numbers, or underscores, and be at least 8 characters long."
    ),

  body("email")
    .trim()
    .normalizeEmail()
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Enter a valid email"),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required.")
    .matches(passwordRegex)
    .withMessage(
      "Password must have atleast 1 capital letter 1 number and 1 special symbol and must be atleast 8 characters long."
    ),
]
