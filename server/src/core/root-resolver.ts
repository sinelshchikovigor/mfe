import { userResolvers } from "../modules/user/user-resolver";

export const rootResolver = {
  hello: () => "Hello from GraphQL API!",
  ...userResolvers.Query,
  ...userResolvers.Mutation,
  ...userResolvers.Subscription,
};
