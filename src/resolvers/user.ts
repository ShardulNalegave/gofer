
import { APIContext } from "../context.js";
import { Errors } from "../errors.js";
import { UserModel } from "../models/user.js";
import { Events, pubsub } from "../pubsub.js";
import { Right, getUser, getUsers } from "../utils.js";

export const userResolvers = {
  queries: {
    async users(_parent, _args, _ctx: APIContext, _info) {
      // Return all users
      return await getUsers({});
    },

    async userByEmail(_parent, args, _ctx: APIContext, _info) {
      // Return user with provided email
      return await getUser({ email: args.email });
    },

    async userByID(_parent, args, _ctx: APIContext, _info) {
      // Return user with provided ID
      return await getUser({ _id: args.id });
    },

    async loggedInUserData(_parent, _args, ctx: APIContext, _info) {
      // Check auth-status
      if (!ctx.isAuth) throw new Error(Errors.REQUIRES_LOGIN);

      // Return user data
      return getUser({
        _id: ctx.userID,
      });
    }
  },

  mutations: {
    async updateUser(_parent, args, ctx: APIContext, _info) {
      // Check auth-status and if enough rights are present
      if (!ctx.isAuth) throw new Error(Errors.REQUIRES_LOGIN);
      let rights = await ctx.getAllRights();
      if (!rights.includes(Right.USERS_UPDATE)) throw new Error(Errors.NOT_ENOUGH_RIGHTS);
  
      let userID = args.updt.id;
      let userUpdateData = args.updt;
      delete userUpdateData.id;
  
      // Find and update the document
      let user = await UserModel.findOne({ _id: userID });
      await user.updateOne({
        ...user.toObject(),
        ...userUpdateData,
      });

      // Publish an event as 'users' were updated
      pubsub.publish(Events.USERS_UPDATE, {
        users: getUsers.bind(this, {}),
      });
  
      // Return updated user data
      return await getUser({
        _id: userID,
      });
    },

    async deleteUser(_parent, args, ctx: APIContext, _info) {
      // Check auth-status and if enough rights are present
      if (!ctx.isAuth) throw new Error(Errors.REQUIRES_LOGIN);
      let rights = await ctx.getAllRights();
      if (!rights.includes(Right.USERS_DELETE)) throw new Error(Errors.NOT_ENOUGH_RIGHTS);

      await UserModel.findOneAndDelete({ _id: args.id });

      // Publish an event as 'users' were updated
      pubsub.publish(Events.USERS_UPDATE, {
        users: getUsers.bind(this, {}),
      });

      return getUsers({});
    },
  },

  subscriptions: {
    users: {
      subscribe: () => pubsub.asyncIterator([Events.USERS_UPDATE]),
    },
  },
};