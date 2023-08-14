
import { ProjectModel } from "../models/project.js";

export const ProjectResolvers = {
  queries: {
    async projects() {
      return await ProjectModel.find();
    },

    async project(_parent, args, _contextValue, _info) {
      return await ProjectModel.findOne({ _id: args.id });
    },
  },

  mutations: {},
};