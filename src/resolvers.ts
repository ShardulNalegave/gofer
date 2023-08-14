
import { AuthResolvers } from './resolvers/auth.js';
import { UserResolvers } from './resolvers/user.js';
import { RoleResolvers } from './resolvers/role.js';
import { TaskResolvers } from './resolvers/task.js';
import { ProjectResolvers } from './resolvers/project.js';

export const Resolvers = {
  RootQuery: {
    ...AuthResolvers.queries,
    ...UserResolvers.queries,
    ...RoleResolvers.queries,
    ...TaskResolvers.queries,
    ...ProjectResolvers.queries,
  },
  RootMutation: {
    ...AuthResolvers.mutations,
    ...UserResolvers.mutations,
    ...RoleResolvers.mutations,
    ...TaskResolvers.mutations,
    ...ProjectResolvers.mutations,
  }
}