
import { APIContext } from "../context.js";
import { getTask, getTasks } from "../utils.js";

export const TaskResolvers = {
  queries: {
    async tasks(_parent, _args, _contextValue: APIContext, _info) {
      return await getTasks({});
    },

    async task(_parent, args, _contextValue: APIContext, _info) {
      return await getTask({ _id: args.id });
    },
  },

  mutations: {},
};