
import { getUser, getUsers } from "../utils.js";

export const UserResolvers = {
  queries: {
    async users() {
      return await getUsers({});
    },

    async userByEmail(_parent, args, _contextValue, _info) {
      return await getUser({ email: args.email });
    },

    async userByID(_parent, args, _contextValue, _info) {
      return await getUser({ _id: args.id });
    },
  },

  mutations: {},
};