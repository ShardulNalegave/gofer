
import jwt from 'jsonwebtoken';
import { Request } from 'express';

import { Right, getUser } from './utils.js';

export interface APIContext {
  isAuth: boolean,
  authError?: string,
  token?: string,
  userID?: string,
  userEmail?: string,
  getAllRights?: () => Promise<Right[]>,
}

export async function getAPIContext_WebSocket(ctx, _msg, _args): Promise<APIContext> {
  const token = ctx.connectionParams.authentication;
  if (!token || token === '') {
    return { isAuth: false };
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.GOFER_JWT_SECRET_KEY);
  } catch (err) {
    return {
      isAuth: false,
      authError: err,
    };
  }

  if (!decodedToken) {
    return { isAuth: false };
  }

  return {
    isAuth: true,
    userID: decodedToken.userID,
    userEmail: decodedToken.email,
    token,
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

export async function getAPIContext_Express(req: Request): Promise<APIContext> {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    return { isAuth: false };
  }

  const token = authHeader.split(' ')[1];
  if (!token || token === '') {
    return { isAuth: false };
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.GOFER_JWT_SECRET_KEY);
  } catch (err) {
    return {
      isAuth: false,
      authError: err,
    };
  }

  if (!decodedToken) {
    return { isAuth: false };
  }

  return {
    isAuth: true,
    userID: decodedToken.userID,
    userEmail: decodedToken.email,
    token,
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