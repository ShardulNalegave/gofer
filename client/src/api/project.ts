
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
        assignees {
          id
        }
      }
    }
  }
`;

const ADD_PROJECT = gql`
  mutation($inp: ProjectInput!) {
    createProject(inp: $inp) {
      id
      title
      description
    }
  }
`;

export default {
  queries: {
    GET_PROJECT,
    GET_PROJECTS,
  },

  mutations: {
    ADD_PROJECT,
  },

  subscriptions: {},
};