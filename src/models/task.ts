
import { Schema, model } from 'mongoose';

export interface ITask {
  title: string,
  description: string,
  project: string,
  assignees: string[],
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
  project: {
    type: String,
    required: true,
    default: null,
  },
  assignees: {
    type: [String],
    required: true,
    default: [],
  },
});

export const TaskModel = model('Task', TaskSchema, 'tasks');