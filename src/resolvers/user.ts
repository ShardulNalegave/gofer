
import { APIContext } from "../context.js";
import { getUser, getUsers } from "../utils.js";

export const UserResolvers = {
  queries: {
    async users(_parent, _args, _contextValue: APIContext, _info) {
      return await getUsers({});
    },

    async userByEmail(_parent, args, _contextValue: APIContext, _info) {
      return await getUser({ email: args.email });
    },

    async userByID(_parent, args, _contextValue: APIContext, _info) {
      return await getUser({ _id: args.id });
    },
  },

  mutations: {},
};