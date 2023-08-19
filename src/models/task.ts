
import { Schema, model } from 'mongoose';

export interface ITask {
  title: string,
  description: string,
  project: string | null,
  assignees: string[],
  completed: boolean,
  due: Date,
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
    required: false,
    default: null,
  },
  assignees: {
    type: [String],
    required: true,
    default: [],
  },
  completed: {
    type: Boolean,
    required: false,
    default: false,
  },
  due: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

export const TaskModel = model('Task', TaskSchema, 'tasks');