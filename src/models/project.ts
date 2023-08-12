
import { Schema, model } from 'mongoose';

export interface IProject {
  title: string,
  description: string,
  tasks: string[],
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
  tasks: {
    type: [String],
    required: true,
  },
});

export const ProjectModel = model('Project', ProjectSchema, 'projects');

export async function getProjects() {
  return await ProjectModel.find();
}

export async function getProject(filter) {
  return await ProjectModel.findOne(filter);
}