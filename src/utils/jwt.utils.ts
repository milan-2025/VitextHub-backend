import * as jwt from "jsonwebtoken"
import { ITokenPayload } from "../interfaces/jwt.interface"

const jwt_secret = process.env.JWT_SECRET || ""
const expiry_time = "9h"

export const signToken = (
  tokenPayload: Omit<ITokenPayload, "iat" | "exp">
): string => {
  const token = jwt.sign(tokenPayload, jwt_secret, { expiresIn: expiry_time })

  return token
}
