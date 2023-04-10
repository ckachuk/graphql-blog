import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { ApolloError } from "apollo-server-errors"
import * as dotenv from "dotenv"
import Category from "../models/Category.js"
import Comment from "../models/Comment.js"
import Credential from "../models/Credential.js"
import Post from "../models/Post.js"
import User from "../models/User.js"
dotenv.config()
export const resolvers = {
  Query: {
    user: async (_, { _id }) => {
      const user = await User.findById(_id)
      if (!user) throw new Error("User not found")
      return user
    },
    users: async () => {
      const users = await User.find()

      if (!users) throw new Error("Users not found")
      return users
    },
    category: async (_, { _id }) => {
      const category = await Category.findById(_id)
      if (!category) throw new Error("Category not found")
      return category
    },
    categories: async () => {
      const categories = await Category.find()
      if (!categories) throw new Error("Categories not found")
      return categories
    },
    post: async (_, { _id }) => {
      const post = await Post.findById(_id)
      if (!post) throw new Error("Post not found")
      return post
    },
    posts: async () => {
      const posts = await Post.find()
      if (!posts) throw new Error("Posts not found")
      return posts
    },
    comment: async (_, { _id }) => {
      const comment = await Comment.findById(_id)
      if (!comment) throw new Error("Comment not found")
      return comment
    },
    comments: async () => {
      const comments = await Comment.find()
      if (!comments) throw new Error("Comments not found")
      return comments
    },
  },
  Mutation: {
    createCategory: async (_, { name }) => {
      const category = new Category({ name })
      const savedCategory = await category.save()
      return savedCategory
    },
    deleteCategory: async (_, { _id }) => {
      const deletedCategory = await Category.findByIdAndDelete(_id)

      if (!deletedCategory) throw new Error("Category not found")
      return deletedCategory
    },
    updateCategory: async (_, { _id, name }) => {
      const updatedCategory = await Category.findByIdAndUpdate(_id, name, {
        new: true,
      })
      if (!updatedCategory) throw new Error("Category not found")
      return updatedCategory
    },
    createUser: async (_, { username, password, name }) => {
      const credentials = await new Credential({
        isAdmin: false,
        isAuthor: true,
      })
      const credentialsSaved = await credentials.save()

      const encryptedPassword = bcrypt.hashSync(password, 10)
      const token = jwt.sign({ username, password }, process.env.TOKEN_SECRET, {
        expiresIn: "2hr",
      })

      const user = new User({
        username,
        password: encryptedPassword,
        name,
        credentials: credentialsSaved.id,
        token,
      })
      return await user.save()
    },
    login: async (_, { username, password }) => {
      const user = await User.findOne({ username })

      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
          { username, password },
          process.env.TOKEN_SECRET,
          {
            expiresIn: "2hr",
          }
        )
        user.token = token
        return user
      } else {
        throw new ApolloError("Incorrect password", "INCORRECT_PASSWORD")
      }
    },
    updatePassword: async (_, { _id, oldPassword, newPassword }) => {
      const user = await User.findById(_id)
      if (user && (await bcrypt.compare(oldPassword, user.password))) {
        const newEncryptedPassword = bcrypt.hashSync(newPassword, 10)
        user.password = newEncryptedPassword
        return user
      } else {
        throw new ApolloError("Incorrect password", "INCORRECT_PASSWORD")
      }
    },
    createComment: async (_, { body, postId, userId }) => {
      const post = await Post.findById(postId)
      const user = await User.findById(userId)
      if (!post) throw new Error("Post not found")
      if (!user) throw new Error("User not found")

      const comment = new Comment({
        body,
        post: post._id,
        user: user._id,
      })
      return await comment.save()
    },
    deleteComment: async (_, { _id }) => {
      const commentDeleted = await Comment.findByIdAndDelete(_id)
      if (!commentDeleted) throw new Error("Comment not found")
      return commentDeleted
    },
    updateComment: async (_, args) => {
      const updatedPost = await Comment.findByIdAndUpdate(args._id, args, {
        new: true,
      })
      if (!updatedPost) throw new Error("Comment not found")
      return updatedPost
    },
    createPost: async (_, { title, body, categoryId, userId }) => {
      const category = await Category.findById(categoryId)
      const user = await User.findById(userId)
      if (!category) throw new Error("Category not found")
      if (!user) throw new Error("User not found")

      const post = new Post({
        title,
        body,
        category: category._id,
        user: user._id,
      })
      return await post.save()
    },
    deletePost: async (_, { _id }) => {
      const deletedPost = await Post.findByIdAndDelete(_id)
      if (!deletedPost) throw new Error("Post not found")

      await Comment.deleteMany({ post: deletedPost._id })
      return deletedPost
    },
    updatePost: async (_, args) => {
      const updatedPost = await Post.findByIdAndUpdate(args._id, args, {
        new: true,
      })
      if (!updatedPost) throw new Error("Post not found")
      return updatedPost
    },
  },
  Comment: {
    user: async (parent) => {
      const user = await User.findById(parent.user)
      if (!user) throw new Error("User not found")
      return user
    },
    post: async (parent) => {
      const post = await Post.findById(parent.post)
      if (!post) throw new Error("Post not found")
      return post
    },
  },
  Post: {
    category: async (parent) => {
      const category = await Category.findById(parent.category)
      if (!category) throw new Error("Category not found")
      return category
    },
    user: async (parent) => {
      const user = await User.findById(parent.user)
      if (!user) throw new Error("User not found")
      return user
    },
    comments: async (parent) => {
      const comments = await Comment.find({ post: parent._id })
      if (!comments) throw new Error("User not found")
      return comments
    },
  },
}
