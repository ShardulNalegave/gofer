
import { Schema, model } from 'mongoose';

export interface IUser {
  name: string,
  email: string,
  roles: string[],
}

export const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  roles: {
    type: [String],
    required: true,
  },
});

export const UserModel = model('User', UserSchema);

export async function getUsers() {
  return await UserModel.find();
}