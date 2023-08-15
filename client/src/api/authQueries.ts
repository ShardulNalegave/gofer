import { gql } from "@apollo/client";

export const LOGIN_QUERY = gql`
  query LoginQuery($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      userID
      userEmail
      token
    }
  }
`;

export const VALIDATE_AUTH_TOKEN_QUERY = gql`
  query ValidateAuthTokenQuery($token: String!) {
    validateAuthToken(token: $token) {
      userID
      userEmail
      token
    }
  }
`;