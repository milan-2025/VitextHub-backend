import { Document } from "mongoose"

export interface IUser {
  name: string
  username: string
  email: string
  password: string
}
export interface IUserDocument extends IUser, Document {}
