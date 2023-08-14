
import { APIContext } from "../context.js";
import { getRole, getRoles } from "../utils.js";

export const RoleResolvers = {
  queries: {
    async roles(_parent, _args, _contextValue: APIContext, _info) {
      return await getRoles({});
    },

    async role(_parent, args, _contextValue: APIContext, _info) {
      return await getRole({ _id: args.id });
    },
  },

  mutations: {},
};