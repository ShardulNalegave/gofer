
import { APIContext } from "../context.js";
import { getProject, getProjects } from "../utils.js";

export const ProjectResolvers = {
  queries: {
    async projects(_parent, _args, _contextValue: APIContext, _info) {
      return await getProjects({});
    },

    async project(_parent, args, _contextValue: APIContext, _info) {
      return await getProject({ _id: args.id });
    },
  },

  mutations: {},
};