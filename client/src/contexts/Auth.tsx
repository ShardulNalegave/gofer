
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { Center, Loader } from "@mantine/core";

import { apolloClient, queries } from "../api/api";
import Page from "../components/Page";

export interface AuthData {
  isAuth: boolean,
  userID?: string | null,
  userEmail?: string | null,
  token?: string | null,
  validate: () => Promise<AuthData>,
  logout: () => Promise<AuthData>,
  login: (
    email: String,
    password: String,
  ) => Promise<AuthData>,
}

const initialValue: AuthData = {
  isAuth: false,
  async validate() {
    this.token = localStorage.getItem('auth-token');

    if (!this.token || this.token === '') {
      this.isAuth = false;
      this.userEmail = null;
      this.userID = null;
      this.token = null;
      return this;
    }

    let res = await apolloClient.query({
      query: queries.VALIDATE_AUTH_TOKEN_QUERY,
      variables: {
        token: this.token,
      },
    });

    if (!res.data.validateAuthToken) {
      this.isAuth = false;
      this.userEmail = null;
      this.userID = null;
      this.token = null;
      return this;
    }

    this.isAuth = true;
    this.userEmail = res.data.validateAuthToken.userEmail;
    this.userID = res.data.validateAuthToken.userID;
    return this;
  },

  async login(email, password) {
    email = email.trim();
    password = password.trim();

    if (!email || email === '') throw new Error('Invalid email provided');
    if (!password || password === '') throw new Error('Invalid password provided');

    let res = await apolloClient.query({
      query: queries.LOGIN_QUERY,
      variables: { email, password },
    });

    if (!res.data.login || res.errors) throw new Error('Login failed. Please check your credentials.');

    this.isAuth = true;
    this.token = res.data.login.token;
    this.userEmail = res.data.login.userEmail;
    this.userID = res.data.login.userID;
    localStorage.setItem('auth-token', res.data.login.token);

    return this;
  },

  async logout() {
    localStorage.removeItem('auth-token');
    this.userEmail = null;
    this.userID = null;
    this.token = null;
    this.isAuth = false;

    return this;
  },
};

const AuthContext = createContext<AuthData>(initialValue);

export const useAuth = () => {
  return useContext(AuthContext);
}

interface AuthProviderProps {
  children: ReactNode,
}

export function AuthProvider({ children } : AuthProviderProps) {
  let value = initialValue;
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    value.validate()
      .then(_ => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={value}>
      {
        loading ?
          <Page scroll={false} padding={0}>
            <Center style={{ height: '100vh' }}>
              <Loader />
            </Center>
          </Page>
          : children
      }
    </AuthContext.Provider>
  );
}