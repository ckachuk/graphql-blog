import mongoose from "mongoose"

const Schema = mongoose.Schema

const CategorySchema = new Schema({
  name: { type: String, require: true, minLength: 3 },
})

module.exports = mongoose.model("Category", CategorySchema)
