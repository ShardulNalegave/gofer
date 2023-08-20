
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { ApolloClient, InMemoryCache } from '@apollo/client';

import auth from './auth';
import user from './user';
import task from './task';
import project from './project';

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
  ...auth.queries,
  ...user.queries,
  ...task.queries,
  ...project.queries,
};

export const mutations = {
  ...auth.mutations,
  ...user.mutations,
  ...task.mutations,
  ...project.mutations,
};

export const subscriptions = {
  ...auth.subscriptions,
  ...user.subscriptions,
  ...task.subscriptions,
  ...project.subscriptions,
}