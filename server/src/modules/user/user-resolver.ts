import { User } from "./user";
import { UserService } from "./user-service";
import { userEvents, USER_EVENTS } from "./user-events";

let userService: UserService;

export const setUserService = (service: UserService) => {
  userService = service;
};

export const userResolvers = {
  Query: {
    users: async () => {
      return userService.getUsers();
    },
    user: async (parent: any, { id }: { id: string }) => {
      return userService.getUserById(parseInt(id));
    },
  },
  Mutation: {
    createUser: async (
      parent: any,
      { input }: { input: { name: string; email: string } }
    ) => {
      const user = await userService.createUser(input.name, input.email);
      userEvents.emit(USER_EVENTS.USER_CREATED, user);
      return user;
    },
    updateUser: async (
      parent: any,
      { id, input }: { id: string; input: { name: string; email: string } }
    ) => {
      const user = await userService.updateUser(
        parseInt(id),
        input.name,
        input.email
      );
      if (user) {
        userEvents.emit(USER_EVENTS.USER_UPDATED, user);
      }
      return user;
    },
    deleteUser: async (parent: any, { id }: { id: string }) => {
      const result = await userService.deleteUser(parseInt(id));
      if (result) {
        userEvents.emit(USER_EVENTS.USER_DELETED, id);
      }
      return result;
    },
  },
  Subscription: {
    userCreated: {
      subscribe: () => {
        return {
          [Symbol.asyncIterator]: async function* () {
            while (true) {
              const user = await new Promise((resolve) => {
                userEvents.once(USER_EVENTS.USER_CREATED, resolve);
              });
              yield { userCreated: user };
            }
          },
        };
      },
    },
    userUpdated: {
      subscribe: () => {
        return {
          [Symbol.asyncIterator]: async function* () {
            while (true) {
              const user = await new Promise((resolve) => {
                userEvents.once(USER_EVENTS.USER_UPDATED, resolve);
              });
              yield { userUpdated: user };
            }
          },
        };
      },
    },
    userDeleted: {
      subscribe: () => {
        return {
          [Symbol.asyncIterator]: async function* () {
            while (true) {
              const id = await new Promise((resolve) => {
                userEvents.once(USER_EVENTS.USER_DELETED, resolve);
              });
              yield { userDeleted: id };
            }
          },
        };
      },
    },
  },
};
