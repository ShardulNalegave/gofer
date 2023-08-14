
import { Schema, model } from 'mongoose';

export interface IProject {
  title: string,
  description: string,
  assignees: string[],
}

export const ProjectSchema = new Schema<IProject>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  assignees: {
    type: [String],
    required: true,
    default: [],
  },
});

export const ProjectModel = model('Project', ProjectSchema, 'projects');