
import { TaskModel } from "../models/task.js";

export const TaskResolvers = {
  queries: {
    async tasks() {
      return await TaskModel.find();
    },

    async task(_parent, args, _contextValue, _info) {
      return await TaskModel.findOne({ _id: args.id });
    },
  },

  mutations: {},
};