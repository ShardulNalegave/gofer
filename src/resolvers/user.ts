
import { UserModel } from "../models/user.js";

export const UserResolvers = {
  queries: {
    async users() {
      return await UserModel.find();
    },

    async userByEmail(_parent, args, _contextValue, _info) {
      return await UserModel.findOne({ email: args.email });
    },

    async userByID(_parent, args, _contextValue, _info) {
      return await UserModel.findOne({ _id: args.id });
    },
  },

  mutations: {},
};