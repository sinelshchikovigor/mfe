import { altairExpress } from "altair-express-middleware";
import "reflect-metadata";
import express from "express";
import { DataSource } from "typeorm";
import { createHandler } from "graphql-http/lib/use/express";

import { buildSchema } from "graphql";
import ormConfig from "./config/ormconfig";
import { rootResolver } from "./core/root-resolver";
import { typeDefs as userTypeDefs } from "./modules/user/user-type";
import { UserService } from "./modules/user/user-service";
import { setUserService } from "./modules/user/user-resolver";

const main = async () => {
  const dataSource = new DataSource(ormConfig);
  await dataSource.initialize();

  // Initialize user service
  const userService = new UserService(dataSource);
  setUserService(userService);

  const app = express();

  const schema = buildSchema(`
    ${userTypeDefs}
  `);

  app.all(
    "/graphql",
    createHandler({
      schema,
      rootValue: rootResolver,
    })
  );

  app.use(
    "/playground",
    altairExpress({
      endpointURL: "/graphql",
    })
  );

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/graphql`);
  });
};

main().catch((err) => {
  console.error(err);
});
