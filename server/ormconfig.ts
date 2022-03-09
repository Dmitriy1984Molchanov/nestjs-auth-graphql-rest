import { join } from "path";
export default {
  type: "sqlite",
  synchronize: false, // disabled it for production
  autoLoadEntities: true,
  database: "tmp/data.sqlite",
  migrations: [join(__dirname, "src/database/migrations/*.ts")],
};
