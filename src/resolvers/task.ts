
import { APIContext } from "../context.js";
import { TaskModel } from "../models/task.js";
import { Events, pubsub } from "../pubsub.js";
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

      pubsub.publish(Events.TASKS_UPDATE, {
        tasks: getTasks.bind(this, {})
      });

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
      let finalData = {
        ...task.toObject(),
        ...taskUpdateData,
      };
      await task.updateOne(finalData);

      pubsub.publish(Events.TASKS_UPDATE, {
        tasks: getTasks.bind(this, {})
      });

      if (finalData.assignees.includes(ctx.userID)) pubsub.publish(Events.CURRENT_USER_TASKS_UPDATED, {
        loggedInUserTasks: getTasks.bind(this, {
          assignees: { $in: [ctx.userID] },
        }),
      });
  
      return await getTask({
        _id: taskID,
      });
    },
  },

  subscriptions: {
    tasks: {
      subscribe: () => pubsub.asyncIterator([Events.TASKS_UPDATE])
    },
    loggedInUserTasks: {
      subscribe: () => pubsub.asyncIterator([Events.CURRENT_USER_TASKS_UPDATED]),
    },
  },
};