import { gql } from "@apollo/client";

const SET_TASK_COMPLETED = gql`
  mutation($id: String!, $completed: Boolean!) {
    updateTask(updt: {
      id: $id,
      completed: $completed
    }) {
      id
      title
      completed
    }
  }
`;

export default {
  queries: {},

  mutations: {
    SET_TASK_COMPLETED,
  },

  subscriptions: {},
}