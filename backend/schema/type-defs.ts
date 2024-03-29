import { gql } from "graphql-tag"

export const typeDefs = gql`
  type Category {
    _id: ID!
    name: String!
  }
  type Comment {
    _id: ID!
    body: String!
    user: User
    post: Post!
    createAt: String
    updatedAt: String
  }
  type Post {
    _id: ID!
    title: String!
    body: String!
    category: Category
    user: User!
    comments: [Comment!]!
    createAt: String
    updatedAt: String
  }
  type Credentials {
    _id: ID!
    isAdmin: Boolean!
    isAuthor: Boolean!
  }

  type User {
    _id: ID!
    username: String!
    password: String!
    name: String!
    credentials: Credentials!
    token: String!
  }

  type Mutation {
    createCategory(name: String!): Category
    deleteCategory(_id: ID!): Category
    updateCategory(_id: ID!, name: String!): Category
    createUser(username: String, password: String, name: String): User!
    login(username: String, password: String): User!
    updatePassword(_id: ID!, oldPassword: String, newPassword: String): Boolean
    createComment(body: String!, postId: ID!, userId: ID!): Comment
    deleteComment(_id: ID!): Comment
    updateComment(_id: ID!, body: String!): Comment
    createPost(title: String, body: String, categoryId: ID, userId: ID): Post
    deletePost(_id: ID!): Post
    updatePost(_id: ID!, title: String, body: String, categoryId: ID!): Post
  }
  type Query {
    user(_id: ID!): User
    users: [User!]!
    category(_id: ID!): Category
    categories: [Category!]!
    post(_id: ID!): Post
    posts: [Post!]!
    comment(_id: ID!): Comment
    comments: [Comment!]!
  }
`
