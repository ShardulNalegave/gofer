
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

import { resolvers } from './resolvers.js';
import { APIContext, getAPIContext } from './context.js';

const typeDefs = readFileSync('schema.gql', { encoding: 'utf-8' });

// Load .env file
dotenv.config();

await mongoose.connect(`${process.env.GOFER_MONGODB_URI}/${process.env.GOFER_MONGODB_DATABASE}`);

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer<APIContext>({
  typeDefs,
  resolvers,
  plugins: [ ApolloServerPluginDrainHttpServer({ httpServer }) ],
});
await server.start();

app.use(
  '/',
  cors<cors.CorsRequest>({
    origin: [],
  }),
  bodyParser.json(),
  expressMiddleware<APIContext>(server, {
    context: async ({ req }) => getAPIContext(req),
  }),
)

await new Promise<void>(resolve => {
  httpServer.listen(Number(process.env.GOFER_PORT), process.env.GOFER_HOST, resolve);
});

console.log(`Listening at: http://${process.env.GOFER_HOST}:${process.env.GOFER_PORT}`);
