
import { AuthResolvers } from './resolvers/auth.js';

import { getProject, getProjects } from './models/project.js';
import { getRole, getRoles } from './models/role.js';
import { getTask, getTasks } from './models/task.js';
import { getUser, getUsers } from './models/user.js';

export const Resolvers = {
  RootQuery: {
    async users() {
      return await getUsers();
    },
    async roles() {
      return await getRoles();
    },
    async projects() {
      return await getProjects();
    },
    async tasks() {
      return await getTasks();
    },

    async user_by_email(_parent, args, _contextValue, _info) {
      return await getUser({ email: args.email });
    },

    async user_by_id(_parent, args, _contextValue, _info) {
      return await getUser({ _id: args.id });
    },

    async project(_parent, args, _contextValue, _info) {
      return await getProject({ _id: args.id });
    },

    async role(_parent, args, _contextValue, _info) {
      return await getRole({ _id: args.id });
    },

    async task(_parent, args, _contextValue, _info) {
      return await getTask({ _id: args.id });
    },

    ...AuthResolvers.queries,
  },
  RootMutation: {
    ...AuthResolvers.mutations,
  }
}