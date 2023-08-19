
import { gql } from "@apollo/client";

export const GET_USER_BY_ID = gql`
  query GetUserByIDQuery($id: String!) {
    userByID(id: $id) {
      id
      name
      email
      roles {
        title
        rights
      }
    }
  }
`;

export const GET_USER_BY_EMAIL = gql`
  query GetUserByEmailQuery($email: String!) {
    userByID(email: $email) {
      id
      name
      email
      roles {
        title
        rights
      }
    }
  }
`;

export const LOGGED_IN_USER_DATA = gql`
  query {
    loggedInUserData {
      id
      name
      email
    }
  }
`;