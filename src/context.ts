
import jwt from 'jsonwebtoken';
import { Request } from 'express';

import { Errors } from './errors.js';
import { Right, getUser } from './utils.js';

// This data is provided to each resolver of our schema.
// Has general info related to user-authentication
export interface APIContext {
  isAuth: boolean,
  authError?: string,
  token?: string,
  userID?: string,
  userEmail?: string,
  getAllRights?: () => Promise<Right[]>,
}

// Returns APIContext from WebSocket request params
export async function getAPIContext_WebSocket(ctx, _msg, _args): Promise<APIContext> {
  // Get the token
  const token = ctx.connectionParams.authentication;
  if (!token || token === '') {
    return { isAuth: false };
  }

  // Decode it using JWT
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.GOFER_JWT_SECRET_KEY);
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return {
        isAuth: false,
        authError: Errors.TOKEN_EXPIRED,
      };
    } else {
      return {
        isAuth: false,
        authError: err.message,
      };
    }
  }

  if (!decodedToken) {
    return { isAuth: false };
  }

  // Finally, return the data
  return {
    isAuth: true,
    userID: decodedToken.userID,
    userEmail: decodedToken.email,
    token,
    authError: "",
    async getAllRights(): Promise<Right[]> {
      let userData = await getUser({ _id: decodedToken.userID });
      let roles = await userData.roles();

      let rights = [];
      roles.map(role => {
        rights = [...rights, ...role.rights];
      });

      return rights;
    },
  };
}

// Returns APIContext from Express request params
export async function getAPIContext_Express(req: Request): Promise<APIContext> {
  // Get auth header
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    return { isAuth: false };
  }

  // Get token from header
  const token = authHeader.split(' ')[1];
  if (!token || token === '') {
    return { isAuth: false };
  }

  // Decode the token
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.GOFER_JWT_SECRET_KEY);
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return {
        isAuth: false,
        authError: Errors.TOKEN_EXPIRED,
      };
    } else {
      return {
        isAuth: false,
        authError: err.message,
      };
    }
  }

  if (!decodedToken) {
    return { isAuth: false };
  }

  // Finally, return the data
  return {
    isAuth: true,
    userID: decodedToken.userID,
    userEmail: decodedToken.email,
    token,
    authError: "",
    async getAllRights(): Promise<Right[]> {
      let userData = await getUser({ _id: decodedToken.userID });
      let roles = await userData.roles();

      let rights = [];
      roles.map(role => {
        rights = [...rights, ...role.rights];
      });

      return rights;
    },
  };
}