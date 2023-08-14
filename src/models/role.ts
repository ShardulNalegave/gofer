
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
    default: [],
  },
});

export const RoleModel = model('Role', RoleSchema, 'roles');