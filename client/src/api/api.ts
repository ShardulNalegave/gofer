
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { LOGIN_QUERY, VALIDATE_AUTH_TOKEN_QUERY } from './authQueries';
import { GET_USER_BY_ID, GET_USER_BY_EMAIL } from './userQueries';

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'http://localhost:8080',
});

export const queries = {
  LOGIN_QUERY,
  VALIDATE_AUTH_TOKEN_QUERY,
  GET_USER_BY_EMAIL,
  GET_USER_BY_ID,
};