
import { getProjects } from './models/project.js';
import { getRoles } from './models/role.js';
import { getTasks } from './models/task.js';
import { getUsers } from './models/user.js';

export const Resolvers = {
  Query: {
    users: async () => {
      return await getUsers();
    },
    roles: async () => {
      return await getRoles();
    },
    projects: async () => {
      return await getProjects();
    },
    tasks: async () => {
      return await getTasks();
    },
  }
}