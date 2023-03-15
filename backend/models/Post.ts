import mongoose from "mongoose"

const Schema = mongoose.Schema

const PostSchema = new Schema(
  {
    title: { type: String, require: true, minLength: 3 },
    body: { type: String, require: true, minLength: 3 },
    category: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
        require: true,
      },
    ],
    user: { type: Schema.Types.ObjectId, ref: "User", require: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Post", PostSchema)
