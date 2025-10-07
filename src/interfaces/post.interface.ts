import { Document, Types } from "mongoose"

export interface IPost {
  text: string
  imageUrls: string[]
  addedBy: Types.ObjectId
  likes: Types.ObjectId[]
}

export interface IPostDocument extends IPost, Document {}
