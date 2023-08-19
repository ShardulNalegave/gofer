
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { Events, pubsub } from '../pubsub.js';
import { APIContext } from '../context.js';
import { UserModel } from "../models/user.js";
import { Right, getUser, getUsers } from '../utils.js';
import { Errors } from '../errors.js';

export const authResolvers = {
  queries: {
    async login(_parent, args, _ctx: APIContext, _info) {
      // Check if the user actually exists
      const user = await UserModel.findOne({ email: args.email });
      if (!user) throw new Error(Errors.USER_DOES_NOT_EXIST);

      // Compare provied password with stored hash-password
      const isPassCorrect = await bcrypt.compare(args.password, user.passwordHash);
      if (!isPassCorrect) throw new Error(Errors.INCORRECT_PASSWORD);

      // Sign a new token with required metadata
      const token = jwt.sign(
        { userID: user.id, email: user.email },
        process.env.GOFER_JWT_SECRET_KEY,
        {
          expiresIn: '1h',
        }
      );

      // Return auth-data
      return {
        userID: user.id,
        userEmail: user.email,
        token,
      };
    },

    async validateAuthToken(_parent, args, _ctx, _info) {
      // Get the token arg
      const token = args.token;
      if (!token || token === '') throw new Error(Errors.INVALID_TOKEN);

      // Decode it
      let decodedToken;
      try {
        decodedToken = jwt.verify(token, process.env.GOFER_JWT_SECRET_KEY);
      } catch (err) {
        if (err instanceof jwt.TokenExpiredError) throw new Error(Errors.TOKEN_EXPIRED);
        throw new Error(err);
      }

      if (!decodedToken) throw new Error(Errors.INVALID_TOKEN);

      // Reutn auth-data
      return {
        userID: decodedToken.userID,
        userEmail: decodedToken.email,
        token,
      };
    }
  },

  mutations: {
    async createUser(_parent, args, ctx: APIContext, _info) {
      // Check Auth-status and if enough rights are present
      if (!ctx.isAuth) throw new Error(Errors.REQUIRES_LOGIN);
      let rights = await ctx.getAllRights();
      if (!rights.includes(Right.USERS_CREATE)) throw new Error(Errors.NOT_ENOUGH_RIGHTS);

      // Check if user with same email already exists
      const existingUser = await UserModel.findOne({ email: args.inp.email });
      if (existingUser) throw new Error(Errors.USER_ALREADY_EXISTS);

      // Create a new User document with provied data and the hashed password
      const passwordHash = await bcrypt.hash(args.inp.password, 12);
      const newUser = new UserModel({
        name: args.inp.name,
        email: args.inp.email,
        passwordHash,
        roles: [],
      });

      // Save the document
      const result = await newUser.save();

      // Publish an event as 'users' were updated
      pubsub.publish(Events.USERS_UPDATE, {
        tasks: getUsers.bind(this, {})
      });

      // Return the created user data
      return await getUser({ _id: result.id });
    }
  },

  subscriptions: {},
};