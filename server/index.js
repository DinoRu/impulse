const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const pool = require("./db");
// const validator = require("validator");

require("dotenv").config();

//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

//routes
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// root endpoint
app.get("/", (request, response) => {
  response.json({
    info: "Node.js, Express, and Postgres API",
  });
});

//GET ALL VALUE STOCKED
app.get("/api/values", async (req, res) => {
  try {
    const values = await pool.query("SELECT * FROM meter");
    res.json(values.rows);
  } catch (e) {
    console.error(e.message);
  }
});

//get all number
// get meter by meter_id
app.get("/api/:meter_id", async (req, res) => {
  try {
    const { meter_id } = req.params;

    const meter = await pool.query("SELECT * FROM meter WHERE meter_id = $1", [
      meter_id,
    ]);

    if (meter.rows.length === 0) {
      return res.status(404).json({ error: "Meter not found" });
    }
    res.json(meter.rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).send("Server error");
  }
});

//create number
app.post("/api/create", async (req, res) => {
  try {
    console.log(req.body);
    const { imei, pulse } = req.body;
    const now = new Date();
    const newData = await pool.query(
      "INSERT INTO meter (imei, pulse, date) VALUES($1, $2, $3) RETURNING *",
      [imei, pulse, now]
    );
    res.json(newData.rows[0]);
  } catch (e) {
    console.error(e);
    res.send();
  }
});

//GET ALL VALUE STOCKED
app.get("/api/values", async (req, res) => {
  try {
    const values = await pool.query("SELECT * FROM meter");
    res.json(values.rows);
  } catch (e) {
    console.error(e.message);
  }
});

// DELETE all meter data
app.delete("/api/delete", async (req, res) => {
  try {
    await pool.query("DELETE FROM meter");
    res.json({ message: "All data deleted successfully!" });
  } catch (e) {
    console.error(e.message);
    res.status(500).send("An error occurred while deleting the data.");
  }
});

// set port
const PORT = process.env.NODE_DOCKER_PORT || 3000;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
