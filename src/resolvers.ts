
import { GraphQLScalarType, Kind } from 'graphql';

import { Right } from './utils.js';
import { authResolvers } from './resolvers/auth.js';
import { userResolvers } from './resolvers/user.js';
import { roleResolvers } from './resolvers/role.js';
import { taskResolvers } from './resolvers/task.js';
import { projectResolvers } from './resolvers/project.js';

export const DateResolver = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
    if (value instanceof Date) {
      return value.getTime(); // Convert outgoing Date to integer for JSON
    }
    throw Error('GraphQL Date Scalar serializer expected a `Date` object');
  },
  parseValue(value) {
    if (typeof value === 'number') {
      return new Date(value); // Convert incoming integer to Date
    }
    throw new Error('GraphQL Date Scalar parser expected a `number`');
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      // Convert hard-coded AST string to integer and then to Date
      return new Date(parseInt(ast.value, 10));
    }
    // Invalid hard-coded value (not an integer)
    return null;
  },
});

// Resolvers defined on our GQL schema
export const resolvers = {
  RootQuery: {
    ...authResolvers.queries,
    ...userResolvers.queries,
    ...roleResolvers.queries,
    ...taskResolvers.queries,
    ...projectResolvers.queries,
  },
  RootMutation: {
    ...authResolvers.mutations,
    ...userResolvers.mutations,
    ...roleResolvers.mutations,
    ...taskResolvers.mutations,
    ...projectResolvers.mutations,
  },
  RootSubscription: {
    ...authResolvers.subscriptions,
    ...userResolvers.subscriptions,
    ...roleResolvers.subscriptions,
    ...taskResolvers.subscriptions,
    ...projectResolvers.subscriptions,
  },

  // Map Helper Rights enum values to GQL Rights enum
  Right: {
    USERS_CREATE: Right.USERS_CREATE,
    USERS_UPDATE: Right.USERS_UPDATE,
    ROLES_CREATE: Right.ROLES_CREATE,
    ROLES_UPDATE: Right.ROLES_UPDATE,
    TASKS_CREATE: Right.TASKS_CREATE,
    TASKS_UPDATE: Right.TASKS_UPDATE,
    PROJECTS_CREATE: Right.PROJECTS_CREATE,
    PROJECTS_UPDATE: Right.PROJECTS_UPDATE,
  },

  // Date scalar
  Date: DateResolver,
}