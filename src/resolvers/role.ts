
import { getRole, getRoles } from "../utils.js";

export const RoleResolvers = {
  queries: {
    async roles() {
      return await getRoles({});
    },

    async role(_parent, args, _contextValue, _info) {
      return await getRole({ _id: args.id });
    },
  },

  mutations: {},
};