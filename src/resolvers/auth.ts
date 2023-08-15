
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { Events, pubsub } from '../pubsub.js';
import { APIContext } from '../context.js';
import { UserModel } from "../models/user.js";
import { Right, getUser, getUsers } from '../utils.js';

export const authResolvers = {
  queries: {
    async login(_parent, args, _ctx: APIContext, _info) {
      const user = await UserModel.findOne({ email: args.email });
      if (!user) throw new Error('User does not exist!');

      const isPassCorrect = await bcrypt.compare(args.password, user.passwordHash);
      if (!isPassCorrect) throw new Error('Incorrect password provided!');

      const token = jwt.sign(
        { userID: user.id, email: user.email },
        process.env.GOFER_JWT_SECRET_KEY,
        {
          expiresIn: '1h',
        }
      );

      return {
        userID: user.id,
        userEmail: user.email,
        token,
      };
    },

    async validateAuthToken(_parent, args, _ctx, _info) {
      const token = args.token;
      if (!token || token === '') throw new Error('Invalid token');

      let decodedToken;
      try {
        decodedToken = jwt.verify(token, process.env.GOFER_JWT_SECRET_KEY);
      } catch (err) {
        throw new Error(err);
      }

      if (!decodedToken) throw new Error('Invalid token');

      return {
        userID: decodedToken.userID,
        userEmail: decodedToken.email,
        token,
      };
    }
  },

  mutations: {
    async createUser(_parent, args, ctx: APIContext, _info) {
      if (!ctx.isAuth) throw new Error("Operation requires login!");
      let rights = await ctx.getAllRights();
      if (!rights.includes(Right.USERS_CREATE)) throw new Error('Your roles don\'t provide you with enough rights for this action.');

      try {
        const existingUser = await UserModel.findOne({ email: args.inp.email });
        if (existingUser) throw new Error('User already exists!');

        const passwordHash = await bcrypt.hash(args.inp.password, 12);
        const newUser = new UserModel({
          name: args.inp.name,
          email: args.inp.email,
          passwordHash,
          roles: [],
        });

        const result = await newUser.save();

        pubsub.publish(Events.USERS_UPDATE, {
          tasks: getUsers.bind(this, {})
        });

        return await getUser({ _id: result.id });
      } catch (err) {
        throw err;
      }
    }
  },

  subscriptions: {},
};