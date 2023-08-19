import { PubSub } from "graphql-subscriptions";

// Pubsub instance we use
export const pubsub = new PubSub();

// All possible Pub-Sub events
export enum Events {
  USERS_UPDATE = 'USERS_UPDATE',
  ROLES_UPDATE = 'ROLES_UPDATE',
  TASKS_UPDATE = 'TASKS_UPDATE',
  PROJECTS_UPDATE = 'PROJECTS_UPDATE',
}