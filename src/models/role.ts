
import { Schema, model } from 'mongoose';

export interface IRole {
  title: string,
  rights: string[],
}

export const RoleSchema = new Schema<IRole>({
  title: {
    type: String,
    required: true,
  },
  rights: {
    type: [String],
    required: true,
  },
});

export const RoleModel = model('Role', RoleSchema, 'roles');

export async function getRoles() {
  return await RoleModel.find();
}

export async function getRole(filter) {
  return await RoleModel.findOne(filter);
}