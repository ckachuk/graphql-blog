import { timeStamp } from "console"
import mongoose from "mongoose"

const Schema = mongoose.Schema

const CommentSchema = new Schema(
  {
    body: { type: String, require: true, minLength: 3 },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Comment", CommentSchema)
