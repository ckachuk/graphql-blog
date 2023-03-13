import { gql } from "graphql-tag"

export const typeDefs = gql`
  type Category {
    id: ID!
    name: String!
  }
  type Comments {
    id: ID!
    body: String!
    user: User
  }
  type Post {
    id: ID!
    title: String!
    body: String!
    datePublished: String
    category: Category
  }
  type Credential {
    isAdmin: Boolean!
    isAutor: Boolean!
  }

  type User {
    id: ID!
    username: String!
    password: String!
    name: String!
    credential: Credential!
    dayOfBirth: String
    posts: [Post!]!
    comments: String
  }

  type Query {
    user(id: ID!): User!
    example: String!
  }
`
