
import http from 'http';
import { readFileSync } from 'fs';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';

import { resolvers } from './resolvers.js';
import {
  APIContext,
  getAPIContext_Express,
  getAPIContext_WebSocket,
} from './context.js';

// Load .env file
dotenv.config();

// Read our schema file for GQL type-definitions
const typeDefs = readFileSync('schema.gql', { encoding: 'utf-8' });

// Connect to our MongoDB instance
await mongoose.connect(`${process.env.GOFER_MONGODB_URI}/${process.env.GOFER_MONGODB_DATABASE}`);

// Initialize Express & HTTP server instances
const app = express();
const httpServer = http.createServer(app);

// Create our schema based
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Initialize WebSocket server for GQL Subscriptions
const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/',
});
const serverCleanup = useServer({
  schema,
  context: async (ctx, msg, args) => {
    return await getAPIContext_WebSocket(ctx, msg, args);
  },
}, wsServer);

// Initialize Apollo Server
const server = new ApolloServer<APIContext>({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          }
        }
      },
    },
  ],
});
// Run apollo server instance
await server.start();

// Make sure apollo server handles the '/' route with required CORS headers
app.use(
  '/',
  cors<cors.CorsRequest>({
    origin: [ 'http://localhost:5173' ],
  }),
  bodyParser.json(),
  expressMiddleware<APIContext>(server, {
    context: async ({ req }) => getAPIContext_Express(req),
  }),
)

// Finally, start listening on specified host and port
await new Promise<void>(resolve => {
  httpServer.listen(Number(process.env.GOFER_PORT), process.env.GOFER_HOST, resolve);
});

console.log(`Listening at: http://${process.env.GOFER_HOST}:${process.env.GOFER_PORT}`);
