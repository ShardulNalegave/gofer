
import { Schema, model } from 'mongoose';

export interface IUser {
  name: string,
  email: string,
  passwordHash: string,
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
  passwordHash: {
    type: String,
    required: true,
  },
  roles: {
    type: [String],
    required: true,
  },
});

export const UserModel = model('User', UserSchema, 'users');