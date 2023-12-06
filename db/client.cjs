const { Client } = require("pg");
const client = new Client({
  user: "postgres",
  password: "password",
  host: "localhost",
  port: 5432,
  database: "adopt_a_bot",
});

module.exports = client;
