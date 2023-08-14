
import { Right } from './utils.js';
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
  },

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
}