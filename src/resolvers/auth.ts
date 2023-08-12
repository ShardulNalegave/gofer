
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { UserModel, getUser } from "../models/user.js";

export const AuthResolvers = {
  queries: {
    async login(_parent, args, _contextValue, _info) {
      const user = await getUser({ email: args.email });
      if (!user) throw new Error('User does not exist!');

      const isPassCorrect = await bcrypt.compare(args.password, user.passwordHash);
      if (!isPassCorrect) throw new Error('Incorrect password provided!');

      const token = jwt.sign(
        { userID: user.id, email: user.email },
        process.env.GOFER_JWT_SECRET_KEY,
        {
          expiresIn: '24h',
        }
      );

      return {
        userID: user.id,
        token,
        tokenExpiration: 24,
      };
    },
  },

  mutations: {
    async createUser(_parent, args, _contextValue, _info) {
      try {
        const existingUser = await getUser({ email: args.email });
        if (existingUser) throw new Error('User already exists!');

        const passwordHash = await bcrypt.hash(args.password, 12);
        const newUser = new UserModel({
          name: args.name,
          email: args.email,
          passwordHash,
          roles: [],
        });

        const result = await newUser.save();

        return {
          id: result.id,
          name: result.name,
          email: result.email,
          roles: result.roles,
        };
      } catch (err) {
        throw err;
      }
    }
  },
};