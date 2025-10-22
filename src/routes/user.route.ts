import express, { Request, Response } from "express"
import { userLoginRules, userSignupRules } from "../middlewares/user.validation"
import { handleValidationResults } from "../middlewares/validation.handler"
import { UserModel } from "../models/user.model."
import { signToken } from "../utils/jwt.utils"
import { authenticateToken } from "../middlewares/auth.middleware"

const userRouter = express.Router()

userRouter.post(
  "/sign-up",
  userSignupRules,
  handleValidationResults,
  async (req: Request, res: Response) => {
    let foundUser = null
    try {
      const { username, email, password } = req.body
      foundUser = await UserModel.find({ username: username })
      if (foundUser.length > 0) {
        return res
          .status(400)
          .json({ errors: { username: "Username already exist." } })
      }
      foundUser = null
      foundUser = await UserModel.find({ email: email })
      if (foundUser.length > 0) {
        return res
          .status(400)
          .json({ errors: { email: "Email already exist." } })
      }
      let newUser = new UserModel({ username, email, password })
      await newUser.save()

      const token = signToken({
        //@ts-ignore
        userId: newUser._id.toString(),
        email: newUser.email,
        username: newUser.username,
      })

      return res.status(200).json({
        message: "Login successful",
        token: token,
      })

      // return res.status(201).
    } catch (e) {
      console.log(e)
      return res.status(400).json({
        errors: {
          error: "some error occured while sign up",
          serverError: e,
        },
      })
    }
  }
)

userRouter.post(
  "/login",
  userLoginRules,
  handleValidationResults,
  async (req: Request, res: Response) => {
    try {
      const { usernameOrEmail, password } = req.body
      const existingUser = await UserModel.findOne({
        $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      })
      console.log("existing User--", existingUser)
      if (!existingUser) {
        return res
          .status(400)
          .json({ errors: { usernameOrEmail: "Account not found." } })
      }
      //@ts-ignore
      if (!(await existingUser.comparePassword(password))) {
        return res
          .status(400)
          .json({ errors: { password: "Invalid credentials." } })
      }
      const token = signToken({
        userId: existingUser._id,
        email: existingUser.email,
        username: existingUser.username,
      })
      return res.status(201).json({ message: "Logged in Successfully.", token })
    } catch (e: any) {
      console.log(e)
      return res.status(400).json({
        errors: { error: e.message || "Some error occurred while login." },
      })
    }
  }
)

userRouter.post(
  "/validate-token",
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(400).json({ errors: { error: "invalid token" } })
      } else {
        const existingUser = await UserModel.findById(req.user.userId)
        if (!existingUser) {
          return res.status(400).json({ errors: { error: "invalid token" } })
        }
        return res.status(200).json({ message: "Valid token" })
      }
    } catch (e) {
      console.log(e)
      return res.status(400).json({ errors: { error: "invalid token" } })
    }
  }
)

export default userRouter
