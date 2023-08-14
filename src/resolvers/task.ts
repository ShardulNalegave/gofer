
import { APIContext } from "../context.js";
import { TaskModel } from "../models/task.js";
import { Right, getTask, getTasks } from "../utils.js";

export const taskResolvers = {
  queries: {
    async tasks(_parent, _args, _contextValue: APIContext, _info) {
      return await getTasks({});
    },

    async task(_parent, args, _contextValue: APIContext, _info) {
      return await getTask({ _id: args.id });
    },
  },

  mutations: {
    async createTask(_parent, args, ctx: APIContext, _info) {
      if (!ctx.isAuth) throw new Error("Operation requires login!");
      let rights = await ctx.getAllRights();
      if (!rights.includes(Right.TASKS_CREATE)) throw new Error('Your roles don\'t provide you with enough rights for this action.');

      let task = new TaskModel({
        title: args.inp.title,
        description: args.inp.description,
        project: args.inp.project,
      });

      let result = await task.save();

      return await getTask({
        _id: result.id,
      });
    },

    async updateTask(_parent, args, ctx: APIContext, _info) {
      if (!ctx.isAuth) throw new Error("Operation requires login!");
      let rights = await ctx.getAllRights();
      if (!rights.includes(Right.TASKS_UPDATE)) throw new Error('Your roles don\'t provide you with enough rights for this action.');
  
      let taskID = args.updt.id;
      let taskUpdateData = args.updt;
      delete taskUpdateData.id;
  
      let task = await TaskModel.findOne({ _id: taskID });
      await task.updateOne({
        ...task.toObject(),
        ...taskUpdateData,
      });
  
      return await getTask({
        _id: taskID,
      });
    },
  },
};