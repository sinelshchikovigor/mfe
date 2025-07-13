import { User } from "./user";

export const typeDefs = `
  type User {
    id: ID!
    name: String!
    email: String!
  }

  input CreateUserInput {
    name: String!
    email: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
    hello: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(id: ID!, input: CreateUserInput!): User!
    deleteUser(id: ID!): Boolean!
  }

  type Subscription {
    userCreated: User!
    userUpdated: User!
    userDeleted: ID!
  }
`;
