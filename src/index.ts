
import { readFileSync } from 'fs';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { Resolvers } from './resolvers.js';

const typeDefs = readFileSync('schema.gql', { encoding: 'utf-8' });

// Load .env file
dotenv.config();

await mongoose.connect(`${process.env.GOFER_MONGODB_URI}/${process.env.GOFER_MONGODB_DATABASE}`);
const server = new ApolloServer({ typeDefs, resolvers: Resolvers });
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`Listening at: ${url}`);