import mongoose from "mongoose"

const Schema = mongoose.Schema

const CredentialsSchema = new Schema({
  isAuthor: { type: Boolean, require: true },
  isAdmin: { type: Boolean, require: true },
})

module.exports = mongoose.model("Credentials", CredentialsSchema)
