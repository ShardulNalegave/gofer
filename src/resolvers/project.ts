
import { APIContext } from "../context.js";
import { ProjectModel } from "../models/project.js";
import { Right, getProject, getProjects } from "../utils.js";

export const projectResolvers = {
  queries: {
    async projects(_parent, _args, _contextValue: APIContext, _info) {
      return await getProjects({});
    },

    async project(_parent, args, _contextValue: APIContext, _info) {
      return await getProject({ _id: args.id });
    },
  },

  mutations: {
    async createProject(_parent, args, ctx: APIContext, _info) {
      if (!ctx.isAuth) throw new Error("Operation requires login!");
      let rights = await ctx.getAllRights();
      if (!rights.includes(Right.PROJECTS_CREATE)) throw new Error('Your roles don\'t provide you with enough rights for this action.');

      let project = new ProjectModel({
        title: args.inp.title,
        description: args.inp.description,
      });

      let result = await project.save();

      return await getProject({
        _id: result.id,
      });
    },

    async updateProject(_parent, args, ctx: APIContext, _info) {
      if (!ctx.isAuth) throw new Error("Operation requires login!");
      let rights = await ctx.getAllRights();
      if (!rights.includes(Right.PROJECTS_UPDATE)) throw new Error('Your roles don\'t provide you with enough rights for this action.');
  
      let projectID = args.updt.id;
      let projectUpdateData = args.updt;
      delete projectUpdateData.id;
  
      let project = await ProjectModel.findOne({ _id: projectID });
      await project.updateOne({
        ...project.toObject(),
        ...projectUpdateData,
      });
  
      return await getProject({
        _id: projectID,
      });
    },
  },
};