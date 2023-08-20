
import { gql } from "@apollo/client";

const GET_USER_BY_ID = gql`
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

const GET_USER_BY_EMAIL = gql`
  query GetUserByEmailQuery($email: String!) {
    userByEmail(email: $email) {
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

const LOGGED_IN_USER_DATA = gql`
  query {
    loggedInUserData {
      id
      name
      email
      roles {
        id
        title
        rights
      }
    }
  }
`;

export default {
  queries: {
    LOGGED_IN_USER_DATA,
    GET_USER_BY_ID,
    GET_USER_BY_EMAIL,
  },

  mutations: {},

  subscriptions: {},
};