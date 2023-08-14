
import { RoleModel } from "../models/role.js";

export const RoleResolvers = {
  queries: {
    async roles() {
      return await RoleModel.find();
    },

    async role(_parent, args, _contextValue, _info) {
      return await RoleModel.findOne({ _id: args.id });
    },
  },

  mutations: {},
};