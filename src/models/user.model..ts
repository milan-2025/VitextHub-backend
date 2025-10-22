import { model, Schema } from "mongoose"
import { IUserDocument } from "../interfaces/user.interface"
import * as bcrypt from "bcrypt"

const userSchema = new Schema<IUserDocument>(
  {
    name: String,
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      // select: false,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.pre("save", async function (next) {
  const user = this
  if (!user.isModified("password")) {
    return next()
  }

  try {
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)

    next()
  } catch (error) {
    next(error as Error)
  }
})

userSchema.methods.comparePassword = function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password)
}

export const UserModel = model<IUserDocument>("User", userSchema)
