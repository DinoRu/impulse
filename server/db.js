const Pool = require("pg").Pool;

//Connect your database
const pool = new Pool({
  user: "me",
  host: "localhost",
  port: 5432,
  database: "impulse",
  password: "login123!",
});

module.exports = pool;
