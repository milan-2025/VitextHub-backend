import express, { Request, Response } from "express"
import { userSignupRules } from "../middlewares/user.validation"
import { handleValidationResults } from "../middlewares/validation.handler"
import { UserModel } from "../models/user.model."
import { signToken } from "../utils/jwt.utils"

const router = express.Router()

router.post(
  "/sign-up",
  userSignupRules,
  handleValidationResults,
  async (req: Request, res: Response) => {
    let foundUser = null
    try {
      const { username, email, password } = req.body
      foundUser = await UserModel.find({ username: username })
      if (foundUser.length > 0) {
        return res.status(400).json({ message: "Username already exist." })
      }
      foundUser = null
      foundUser = await UserModel.find({ email: email })
      if (foundUser.length > 0) {
        return res.status(400).json({ message: "Email already exist." })
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
      return res.status(400).json({ message: "some error while sign up" })
    }
  }
)
