
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

export const ProjectModel = model('Project', ProjectSchema);

export async function getProjects() {
  return await ProjectModel.find();
}