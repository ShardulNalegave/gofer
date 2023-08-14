
import { APIContext } from "../context.js";
import { RoleModel } from "../models/role.js";
import { Right, getRole, getRoles } from "../utils.js";

export const roleResolvers = {
  queries: {
    async roles(_parent, _args, _ctx: APIContext, _info) {
      return await getRoles({});
    },

    async role(_parent, args, _ctx: APIContext, _info) {
      return await getRole({ _id: args.id });
    },
  },

  mutations: {
    async createRole(_parent, args, ctx: APIContext, _info) {
      if (!ctx.isAuth) throw new Error("Operation requires login!");
      let rights = await ctx.getAllRights();
      if (!rights.includes(Right.ROLES_CREATE)) throw new Error('Your roles don\'t provide you with enough rights for this action.');

      let role = new RoleModel({
        title: args.inp.title,
        rights: args.inp.rights,
      });

      let result = await role.save();

      return await getRole({
        _id: result.id,
      });
    },

    async updateRole(_parent, args, ctx: APIContext, _info) {
      if (!ctx.isAuth) throw new Error("Operation requires login!");
      let rights = await ctx.getAllRights();
      if (!rights.includes(Right.ROLES_UPDATE)) throw new Error('Your roles don\'t provide you with enough rights for this action.');
  
      let roleID = args.updt.id;
      let roleUpdateData = args.updt;
      delete roleUpdateData.id;
  
      let role = await RoleModel.findOne({ _id: roleID });
      await role.updateOne({
        ...role.toObject(),
        ...roleUpdateData,
      });
  
      return await getRole({
        _id: roleID,
      });
    },
  },
};