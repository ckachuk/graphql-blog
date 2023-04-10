import mongoose from "mongoose"

const Schema = mongoose.Schema

const CredentialsSchema = new Schema({
  isAuthor: { type: Boolean, require: true },
  isAdmin: { type: Boolean, require: true },
})

export default mongoose.model("Credential", CredentialsSchema)
