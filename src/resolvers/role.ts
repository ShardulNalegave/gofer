
import { APIContext } from "../context.js";
import { Errors } from "../errors.js";
import { RoleModel } from "../models/role.js";
import { Events, pubsub } from "../pubsub.js";
import { Right, getRole, getRoles } from "../utils.js";

export const roleResolvers = {
  queries: {
    async roles(_parent, _args, _ctx: APIContext, _info) {
      // Return all roles
      return await getRoles({});
    },

    async role(_parent, args, _ctx: APIContext, _info) {
      // Return role with given ID
      return await getRole({ _id: args.id });
    },
  },

  mutations: {
    async createRole(_parent, args, ctx: APIContext, _info) {
      // Check auth-status and if enough rights are present
      if (!ctx.isAuth) throw new Error(Errors.REQUIRES_LOGIN);
      let rights = await ctx.getAllRights();
      if (!rights.includes(Right.ROLES_CREATE)) throw new Error(Errors.NOT_ENOUGH_RIGHTS);

      // Create new document
      let role = new RoleModel({
        title: args.inp.title,
        rights: args.inp.rights,
      });

      // Save the document
      let result = await role.save();

      // Publish event as 'roles' were updated
      pubsub.publish(Events.ROLES_UPDATE, {
        roles: getRoles.bind(this, {})
      });

      // Return newly create role
      return await getRole({
        _id: result.id,
      });
    },

    async updateRole(_parent, args, ctx: APIContext, _info) {
      // Check auth-status and if enough rights are present
      if (!ctx.isAuth) throw new Error(Errors.REQUIRES_LOGIN);
      let rights = await ctx.getAllRights();
      if (!rights.includes(Right.ROLES_UPDATE)) throw new Error(Errors.NOT_ENOUGH_RIGHTS);
  
      let roleID = args.updt.id;
      let roleUpdateData = args.updt;
      delete roleUpdateData.id;
  
      // Find and update
      let role = await RoleModel.findOne({ _id: roleID });
      await role.updateOne({
        ...role.toObject(),
        ...roleUpdateData,
      });

      // Publish event as 'roles' were updated
      pubsub.publish(Events.ROLES_UPDATE, {
        roles: getRoles.bind(this, {})
      });
  
      // Return updated role
      return await getRole({
        _id: roleID,
      });
    },
  },

  subscriptions: {
    roles: {
      subscribe: () => pubsub.asyncIterator([Events.ROLES_UPDATE])
    },
  },
};