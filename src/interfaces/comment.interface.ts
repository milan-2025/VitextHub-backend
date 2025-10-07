import { Document, Types } from "mongoose"

export interface IComment {
  text: string
  addedBy: Types.ObjectId
  post: Types.ObjectId
}

export interface ICommentDocument extends IComment, Document {}
