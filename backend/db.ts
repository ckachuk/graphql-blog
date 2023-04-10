import mongoose from "mongoose"
import * as dotenv from "dotenv"
dotenv.config()
export const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false)
    const conn = await mongoose.connect(
      `mongodb+srv://carloskachuk:${process.env.DB_PASS}@cluster0.0s3ubhg.mongodb.net/test`
    )

    console.log(`Mongodb connected: ${conn.connection.name}`)
  } catch (err) {
    console.log(`Error: ${err.message}`)
    process.exit(1)
  }
}
