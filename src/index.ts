
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
import { APIContext, getAPIContext_Express, getAPIContext_WebSocket } from './context.js';

const typeDefs = readFileSync('schema.gql', { encoding: 'utf-8' });

// Load .env file
dotenv.config();

await mongoose.connect(`${process.env.GOFER_MONGODB_URI}/${process.env.GOFER_MONGODB_DATABASE}`);

const app = express();
const httpServer = http.createServer(app);

const schema = makeExecutableSchema({ typeDefs, resolvers });

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
await server.start();

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

await new Promise<void>(resolve => {
  httpServer.listen(Number(process.env.GOFER_PORT), process.env.GOFER_HOST, resolve);
});

console.log(`Listening at: http://${process.env.GOFER_HOST}:${process.env.GOFER_PORT}`);
