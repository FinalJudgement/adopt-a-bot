const { Client } = require("pg");
const connection = process.env.DATABASE_URL || {
  user: "postgres",
  password: "password",
  host: "localhost",
  port: 5432,
  database: "adopt_a_bot",
};
const client = new Client(connection);

module.exports = client;
