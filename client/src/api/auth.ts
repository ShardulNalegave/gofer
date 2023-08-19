import { gql } from "@apollo/client";

const LOGIN_QUERY = gql`
  query LoginQuery($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      userID
      userEmail
      token
    }
  }
`;

const VALIDATE_AUTH_TOKEN_QUERY = gql`
  query ValidateAuthTokenQuery($token: String!) {
    validateAuthToken(token: $token) {
      userID
      userEmail
      token
    }
  }
`;

export default {
  queries: {
    LOGIN_QUERY,
    VALIDATE_AUTH_TOKEN_QUERY,
  },
  subscriptions: {},
};