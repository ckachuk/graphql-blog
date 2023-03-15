import mongoose from "mongoose"

const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: { type: String, require: true, minLength: 5 },
  password: { type: String, require: true, minLength: 8 },
  name: { type: String, require: true, minLength: 3 },
  credential: {
    type: Schema.Types.ObjectId,
    ref: "Credential",
    require: true,
  },
})

export default mongoose.model("User", UserSchema)
