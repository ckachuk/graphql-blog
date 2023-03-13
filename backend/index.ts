import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from "@apollo/server/express4"
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer"
import express from "express"
import http from "http"
import cors from "cors"
import bodyParser from "body-parser"
import { typeDefs } from "./schema/type-defs.js"
import { resolvers } from "./schema/resolvers.js"
import { connectDB } from "./db.js"

interface MyContext {
  token?: string
}
connectDB()

const app = express()

const httpServer = http.createServer(app)

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
})

await server.start()
app.use(
  "/graphql",
  cors<cors.CorsRequest>(),
  bodyParser.json(),

  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  })
)

await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve))

console.log(`🚀 Server ready at http://localhost:4000/`)
