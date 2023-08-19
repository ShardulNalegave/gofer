
import { APIContext } from "../context.js";
import { Errors } from "../errors.js";
import { TaskModel } from "../models/task.js";
import { Events, pubsub } from "../pubsub.js";
import { Right, getTask, getTasks } from "../utils.js";

export const taskResolvers = {
  queries: {
    async tasks(_parent, _args, _contextValue: APIContext, _info) {
      // Return tasks
      return await getTasks({});
    },

    async task(_parent, args, _contextValue: APIContext, _info) {
      // Return task with provided ID
      return await getTask({ _id: args.id });
    },

    async loggedInUserTasks(_parent, _args, ctx: APIContext, _info) {
      // Check auth-status
      if (!ctx.isAuth) throw new Error(Errors.REQUIRES_LOGIN);

      // Return tasks
      return getTasks({
        assignees: { $in: [ctx.userID] },
      });
    }
  },

  mutations: {
    async createTask(_parent, args, ctx: APIContext, _info) {
      // Check auth-status and if enough rights are present
      if (!ctx.isAuth) throw new Error(Errors.REQUIRES_LOGIN);
      let rights = await ctx.getAllRights();
      if (!rights.includes(Right.TASKS_CREATE)) throw new Error(Errors.NOT_ENOUGH_RIGHTS);

      // Create new document
      let task = new TaskModel({
        title: args.inp.title,
        description: args.inp.description,
        project: args.inp.project,
        due: args.inp.due,
        completed: false,
      });

      // Save the document
      let result = await task.save();

      // Publish event as 'tasks' were updated
      pubsub.publish(Events.TASKS_UPDATE, {
        tasks: getTasks.bind(this, {})
      });

      // Return newly created task
      return await getTask({
        _id: result.id,
      });
    },

    async updateTask(_parent, args, ctx: APIContext, _info) {
      // Check auth-status and if enough rights are present
      if (!ctx.isAuth) throw new Error(Errors.REQUIRES_LOGIN);
      let rights = await ctx.getAllRights();
      if (!rights.includes(Right.TASKS_UPDATE)) throw new Error(Errors.NOT_ENOUGH_RIGHTS);
  
      let taskID = args.updt.id;
      let taskUpdateData = args.updt;
      delete taskUpdateData.id;
  
      // Find and update
      let task = await TaskModel.findOne({ _id: taskID });
      let finalData = {
        ...task.toObject(),
        ...taskUpdateData,
      };
      await task.updateOne(finalData);

      // Publish event as 'tasks' were updated
      pubsub.publish(Events.TASKS_UPDATE, {
        tasks: getTasks.bind(this, {})
      });
      
      // Return updated task
      return await getTask({
        _id: taskID,
      });
    },

    async deleteTask(_parent, args, ctx: APIContext, _info) {
      // Check auth-status and if enough rights are present
      if (!ctx.isAuth) throw new Error(Errors.REQUIRES_LOGIN);
      let rights = await ctx.getAllRights();
      if (!rights.includes(Right.TASKS_DELETE)) throw new Error(Errors.NOT_ENOUGH_RIGHTS);

      await TaskModel.findOneAndDelete({ _id: args.id });

      // Publish an event as 'tasks' were updated
      pubsub.publish(Events.TASKS_UPDATE, {
        tasks: getTasks.bind(this, {}),
      });

      return getTasks({});
    },

    async assignUserToTask(_parent, args, ctx: APIContext, _info) {
      // Check auth-status and if enough rights are present
      if (!ctx.isAuth) throw new Error(Errors.REQUIRES_LOGIN);
      let rights = await ctx.getAllRights();
      if (!rights.includes(Right.TASKS_UPDATE)) throw new Error(Errors.NOT_ENOUGH_RIGHTS);

      await TaskModel.findOneAndUpdate(
        { _id: args.taskID },
        { $push: { assignees: args.userID } },
      );

      // Publish an event as 'tasks' were updated
      pubsub.publish(Events.TASKS_UPDATE, {
        tasks: getTasks.bind(this, {}),
      });

      // Return updated task
      return getTask({ _id: args.taskID });
    },
  },

  subscriptions: {
    tasks: {
      subscribe: () => pubsub.asyncIterator([Events.TASKS_UPDATE])
    },
  },
};