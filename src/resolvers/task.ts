
import { getTask, getTasks } from "../utils.js";

export const TaskResolvers = {
  queries: {
    async tasks() {
      return await getTasks({});
    },

    async task(_parent, args, _contextValue, _info) {
      return await getTask({ _id: args.id });
    },
  },

  mutations: {},
};