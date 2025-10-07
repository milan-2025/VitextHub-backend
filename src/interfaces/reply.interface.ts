import { Document, Types } from "mongoose"

export interface IReply {
  text: string
  addedBy: Types.ObjectId
  replyingTo: Types.ObjectId
  commentId: Types.ObjectId
}

export interface IReplyDocument extends IReply, Document {}
