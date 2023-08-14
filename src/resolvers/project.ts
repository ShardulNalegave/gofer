
import { getProject, getProjects } from "../utils.js";

export const ProjectResolvers = {
  queries: {
    async projects() {
      return await getProjects({});
    },

    async project(_parent, args, _contextValue, _info) {
      return await getProject({ _id: args.id });
    },
  },

  mutations: {},
};