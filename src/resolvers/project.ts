
import { APIContext } from "../context.js";
import { Errors } from "../errors.js";
import { ProjectModel } from "../models/project.js";
import { Events, pubsub } from "../pubsub.js";
import { Right, getProject, getProjects } from "../utils.js";

export const projectResolvers = {
  queries: {
    async projects(_parent, _args, _contextValue: APIContext, _info) {
      // Return projects
      return await getProjects({});
    },

    async project(_parent, args, _contextValue: APIContext, _info) {
      // Return provided with provided ID
      return await getProject({ _id: args.id });
    },

    async loggedInUserProjects(_parent, _args, ctx: APIContext, _info) {
      // Check auth-status
      if (!ctx.isAuth) throw new Error(Errors.REQUIRES_LOGIN);
      // Return projects
      return getProjects({
        assignees: { $in: [ctx.userID] },
      });
    }
  },

  mutations: {
    async createProject(_parent, args, ctx: APIContext, _info) {
      // Check auth-status and if enough rights are present
      if (!ctx.isAuth) throw new Error(Errors.REQUIRES_LOGIN);
      let rights = await ctx.getAllRights();
      if (!rights.includes(Right.PROJECTS_CREATE)) throw new Error(Errors.NOT_ENOUGH_RIGHTS);

      // Create new document
      let project = new ProjectModel({
        title: args.inp.title,
        description: args.inp.description,
      });

      // Save the document
      let result = await project.save();

      // Publish event as 'projects' were updated
      pubsub.publish(Events.PROJECTS_UPDATE, {
        projects: getProjects.bind(this, {})
      });

      // Return newly created project
      return await getProject({
        _id: result.id,
      });
    },

    async updateProject(_parent, args, ctx: APIContext, _info) {
      // Check auth-status and if enough rights are present
      if (!ctx.isAuth) throw new Error(Errors.REQUIRES_LOGIN);
      let rights = await ctx.getAllRights();
      if (!rights.includes(Right.PROJECTS_UPDATE)) throw new Error(Errors.NOT_ENOUGH_RIGHTS);
  
      let projectID = args.updt.id;
      let projectUpdateData = args.updt;
      delete projectUpdateData.id;
  
      // Find and update
      let project = await ProjectModel.findOne({ _id: projectID });
      let finalData = {
        ...project.toObject(),
        ...projectUpdateData,
      };
      await project.updateOne(finalData);

      // Publish event as 'projects' were updated
      pubsub.publish(Events.PROJECTS_UPDATE, {
        projects: getProjects.bind(this, {})
      });
  
      // Return updated project
      return await getProject({
        _id: projectID,
      });
    },
  },

  subscriptions: {
    projects: {
      subscribe: () => pubsub.asyncIterator([Events.PROJECTS_UPDATE]),
    },
  },
};