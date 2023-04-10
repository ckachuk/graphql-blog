import mongoose from "mongoose"

const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: { type: String, require: true, minLength: 5, unique: true },
  password: { type: String, require: true, minLength: 8 },
  name: { type: String, require: true, minLength: 3 },
  credentials: {
    type: Schema.Types.ObjectId,
    ref: "Credentials",
    require: true,
  },
  token: { type: String, require: true },
})

export default mongoose.model("User", UserSchema)
