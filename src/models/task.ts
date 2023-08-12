
import { Schema, model } from 'mongoose';

export interface ITask {
  title: string,
  description: string,
  tasks: string[],
}

export const TaskSchema = new Schema<ITask>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tasks: {
    type: [String],
    required: true,
  },
});

export const TaskModel = model('Task', TaskSchema, 'tasks');

export async function getTasks() {
  return await TaskModel.find();
}

export async function getTask(filter) {
  return await TaskModel.findOne(filter);
}