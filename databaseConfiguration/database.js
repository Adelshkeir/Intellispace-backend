import { Sequelize } from "sequelize";
import pg from "pg";

const sequelize = new Sequelize(
  "postgres://postgres:jgV7RbgsMUHRuT2s@tzkdkkpzvlujpjvjpsqu.db.eu-central-1.nhost.run:5432/tzkdkkpzvlujpjvjpsqu",
  {
    dialectModule: pg,
  }
  // "uqkhbksarmcusxmdboyh",
  // "postgres",
  // "eMq8f!6Pr9yUE2F",
  // {
  //   host: "uqkhbksarmcusxmdboyh.db.eu-central-1.nhost.run",
  //   dialect: "postgres",
  //   port: "5432",
  // }
);
try {
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

export default sequelize;
