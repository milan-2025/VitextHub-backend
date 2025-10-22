import { ITokenPayload } from "../interfaces/jwt.interface"
import { Request, Response, NextFunction } from "express"
import * as jwt from "jsonwebtoken"

declare global {
  namespace Express {
    export interface Request {
      user?: ITokenPayload // Add a 'user' property of type ITokenPayload
    }
  }
}

const jwt_secret = process.env.JWT_SECRET || ""

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization
  const token = authHeader?.split(" ")[1]

  if (!token) {
    return res.status(400).json({ errors: { error: "No token provided." } })
  }

  try {
    const decoded = jwt.verify(token, jwt_secret) as ITokenPayload
    req.user = decoded
    next()
  } catch (e) {
    return res.status(401).json({ errors: { error: "Invalid token." } })
  }
}
