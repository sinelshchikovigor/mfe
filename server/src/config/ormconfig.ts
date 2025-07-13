import { DataSourceOptions } from "typeorm";
import path from "path";
import { entities } from "../core/entities";

const ormConfig: DataSourceOptions = {
  type: "sqlite",
  database: path.join(__dirname, "../../data/database.sqlite"),
  entities,
  synchronize: true,
  logging: false,
};

export default ormConfig;
