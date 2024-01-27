import { Sequelize, Dialect } from "sequelize";
const { PG_USER, PG_PASSWORD, PG_HOST, PG_PORT, PG_DATABASE } = process.env;

// console.log(PG_USER, PG_PASSWORD, PG_HOST, PG_PORT, PG_DATABASE);

class Database {
  con: any = null;

  constructor() {}
  connect() {
    try {
      if (
        PG_DATABASE === undefined ||
        PG_USER === undefined ||
        PG_PASSWORD === undefined
      ) {
        console.error("Database connection parameters are undefined.");
        // Handle the error or exit the application
      }

      this.con = new Sequelize(
        PG_DATABASE ?? "defaultDatabase",
        PG_USER ?? "defaultUser",
        PG_PASSWORD ?? "defaultPassword",
        {
          host: PG_HOST,
          port: Number(PG_PORT),
          dialect: "postgres",
          logging: false,
          pool: {
            max: 5,
            min: 0,

            acquire: 30000,
            idle: 10000,
          },
        }
      );
      // console.log(PG_USER, PG_PASSWORD, PG_HOST, PG_PORT, PG_DATABASE);

      return this.con;
    } catch (err) {
      console.log("Error: " + err);
      return null;
    }
  }
}

export const db = new Database().connect();
