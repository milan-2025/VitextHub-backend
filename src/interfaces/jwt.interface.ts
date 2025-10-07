import { JwtPayload } from "jsonwebtoken"

export interface ITokenPayload extends JwtPayload {
  userId: string
  email: string
  username: string
}
