
import { APIContext } from "../context.js";
import { UserModel } from "../models/user.js";
import { Right, getUser, getUsers } from "../utils.js";

export const userResolvers = {
  queries: {
    async users(_parent, _args, _ctx: APIContext, _info) {
      return await getUsers({});
    },

    async userByEmail(_parent, args, _ctx: APIContext, _info) {
      return await getUser({ email: args.email });
    },

    async userByID(_parent, args, _ctx: APIContext, _info) {
      return await getUser({ _id: args.id });
    },
  },

  mutations: {
    async updateUser(_parent, args, ctx: APIContext, _info) {
      if (!ctx.isAuth) throw new Error("Operation requires login!");
      let rights = await ctx.getAllRights();
      if (!rights.includes(Right.USERS_UPDATE)) throw new Error('Your roles don\'t provide you with enough rights for this action.');
  
      let userID = args.updt.id;
      let userUpdateData = args.updt;
      delete userUpdateData.id;
  
      let user = await UserModel.findOne({ _id: userID });
      await user.updateOne({
        ...user.toObject(),
        ...userUpdateData,
      });
  
      return await getUser({
        _id: userID,
      });
    },
  },
};