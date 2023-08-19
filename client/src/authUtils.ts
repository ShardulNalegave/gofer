
import { apolloClient, getApolloClientLink, queries } from "./api/api";
import { Errors } from "./errors";

interface AuthData {
  isAuth: boolean | null,
  userID: string | null,
  userEmail: string | null,
  token: string | null,
}

function setAuthData(data: AuthData) {
  if (data.isAuth && data.token && data.userID && data.userEmail) {
    apolloClient.setLink(getApolloClientLink(data.token));
    localStorage.setItem('auth-token', data.token);
    localStorage.setItem('auth-userID', data.userID);
    localStorage.setItem('auth-userEmail', data.userEmail);
  }
}

function resetAuthData() {
  apolloClient.setLink(getApolloClientLink(null));
  localStorage.removeItem('auth-userID');
  localStorage.removeItem('auth-userEmail');
  localStorage.removeItem('auth-token');
}

export function getAuthData(): AuthData {
  let userID = localStorage.getItem('auth-userID');
  let userEmail = localStorage.getItem('auth-userEmail');
  let token = localStorage.getItem('auth-token');

  return {
    isAuth: true,
    userID, userEmail, token,
  };
}

export async function validateToken() {
  let token = localStorage.getItem('auth-token');
  if (!token || token === '') {
    resetAuthData();
    throw new Error(Errors.INVALID_TOKEN);
  }

  let res: any;
  try {
    res = await apolloClient.query({
      query: queries.VALIDATE_AUTH_TOKEN_QUERY,
      variables: { token },
    });
  } catch (err: any) {
    if (err.message === Errors.TOKEN_EXPIRED) {
      resetAuthData(); // TODO: Don't reset, get a new token
      throw new Error(Errors.TOKEN_EXPIRED);
    } else {
      resetAuthData();
      throw new Error(err);
    }
  }

  if (!res.data.validateAuthToken) {
    resetAuthData();
    console.log(res); // TODO check how errors are reported and return accordingly
    throw new Error(Errors.INVALID_TOKEN);
  }

  let data = res.data.validateAuthToken;
  setAuthData({
    token,
    isAuth: true,
    userID: data.userID,
    userEmail: data.userEmail,
  });
}

export async function loginUser(email: string, password: string) {
  email = email.trim();
  password = password.trim();

  if (!email || email === '') throw new Error('Invalid email provided');
  if (!password || password === '') throw new Error('Invalid password provided');

  let res: any;
  try {
    res = await apolloClient.query({
      query: queries.LOGIN_QUERY,
      variables: { email, password },
    });
  } catch (err: any) {
    if (err.message === Errors.USER_DOES_NOT_EXIST) {
      throw new Error('User does not exist');
    } else if (err.message === Errors.INCORRECT_PASSWORD) {
      throw new Error('Incorrect password provided');
    } else {
      throw err;
    }
  }

  if (!res.data.login || res.errors) throw new Error('Login failed. Please check your credentials.');

  let data = res.data.login;
  setAuthData({
    isAuth: true,
    userID: data.userID,
    userEmail: data.userEmail,
    token: data.token,
  });
}

export function logoutUser() {
  resetAuthData();
}