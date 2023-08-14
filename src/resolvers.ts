
import { Right } from './utils.js';
import { authResolvers } from './resolvers/auth.js';
import { userResolvers } from './resolvers/user.js';
import { roleResolvers } from './resolvers/role.js';
import { taskResolvers } from './resolvers/task.js';
import { projectResolvers } from './resolvers/project.js';

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