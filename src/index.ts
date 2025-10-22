import express, { Application, Request, Response } from "express"
import * as dotenv from "dotenv"
import * as mongoose from "mongoose"
import cors from "cors"
import userRouter from "./routes/user.route"
dotenv.config()

const app: Application = express()
const port: number = Number(process.env.PORT) || 3000
const mongoUri = process.env.MONGODB_URI || ""

app.use(cors())
app.use(express.json())

// app.get("/", (req: Request, res: Response) => {
//   res.send("Hello, World!")
// })
app.use("/api/user", userRouter)
mongoose
  .connect(mongoUri)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`)
    })
  })
  .catch((e) => {
    console.log("error while connecting to server or mongo db", e)
  })
