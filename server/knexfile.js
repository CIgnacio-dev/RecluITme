import dotenv from "dotenv";
dotenv.config();

export default {
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "postgres",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "recluitme",
    },
    migrations: {
      directory: "./migrations",
    },
  },
};
