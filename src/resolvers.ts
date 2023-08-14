
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
    USERS_CREATE: 'users/create',
    USERS_UPDATE: 'users/update',
    ROLES_CREATE: 'roles/create',
    ROLES_UPDATE: 'roles/update',
    PROJECTS_CREATE: 'projects/create',
    PROJECTS_UPDATE: 'projects/update',
    TASKS_CREATE: 'tasks/create',
    TASKS_UPDATE: 'tasks/update',
  },
}