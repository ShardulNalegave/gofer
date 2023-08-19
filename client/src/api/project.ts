
import { gql } from "@apollo/client";

const GET_PROJECTS = gql`
  query GetProjectsQuery{
    projects {
      id
      title
      description
    }
  }
`;

const GET_PROJECT = gql`
  query GetProject($id: String!) {
    project(id: $id) {
      id
      title
      description
      tasks {
        id
        title
        description
        completed
        due
      }
    }
  }
`;

export default {
  queries: {
    GET_PROJECT,
    GET_PROJECTS,
  },
  subscriptions: {},
};