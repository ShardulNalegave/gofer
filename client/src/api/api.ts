
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { ApolloClient, InMemoryCache } from '@apollo/client';

import { LOGIN_QUERY, VALIDATE_AUTH_TOKEN_QUERY } from './auth';
import { GET_USER_BY_ID, GET_USER_BY_EMAIL, LOGGED_IN_USER_DATA } from './user';

const splitLink = (httpLink: HttpLink, wsLink: GraphQLWsLink) => {
  return split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  );
};

export function getApolloClientLink(token: string | null) {
  const httpLink = new HttpLink({
    uri: 'http://localhost:8080',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });
  
  const wsLink = new GraphQLWsLink(createClient({
    url: 'ws://localhost:8080',
    connectionParams: {
      authentication: token,
    },
  }));

  return splitLink(httpLink, wsLink);
}

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: getApolloClientLink(localStorage.getItem('auth-token')),
});

export const queries = {
  LOGIN_QUERY,
  VALIDATE_AUTH_TOKEN_QUERY,
  GET_USER_BY_EMAIL,
  GET_USER_BY_ID,
  LOGGED_IN_USER_DATA,
};

export const subscriptions = {}