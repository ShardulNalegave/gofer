import { gql } from "@apollo/client";

const UPDATE_TASK = gql`
  mutation($updt: TaskUpdate!) {
    updateTask(updt: $updt) {
      id
      title
      completed
    }
  }
`;

const ADD_TASK = gql`
  mutation($inp: TaskInput!) {
    createTask(inp: $inp) {
      id
    }
  }
`;

export default {
  queries: {},

  mutations: {
    UPDATE_TASK,
    ADD_TASK,
  },

  subscriptions: {},
}