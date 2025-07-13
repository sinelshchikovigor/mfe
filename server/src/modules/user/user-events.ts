import { EventEmitter } from "events";

export const userEvents = new EventEmitter();

export const USER_EVENTS = {
  USER_CREATED: "userCreated",
  USER_UPDATED: "userUpdated",
  USER_DELETED: "userDeleted",
} as const;
