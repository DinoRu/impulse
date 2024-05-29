const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');


//middleware
app.use(cors());
app.use(express.json());

//routes
//get all number
app.get('/number/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const number = await pool.query(
            "Select * from number where number_id =$1", [id]
        )
        res.json(number.rows[0]);
    } catch(e) {
        console.error(e);
    }
})

//create number
app.post('/api/create', async (req, res) => {
    try {
        console.log(req.body);
        const { value } = req.body;
        const now = new Date();
        const newNumber = await pool.query(
            "INSERT INTO number (value, timestamp) VALUES($1, $2) RETURNING *", [value, now]
        );
        res.json(newNumber.rows[0]);
    } catch(e) {
        console.error(e);
        res.send()
    }
})

//GET ALL VALUE STOCKED
app.get('/api/values', async (req, res) => {
    try {
        const values = await pool.query('SELECT * FROM number');
        res.json(values.rows);
    } catch(e) {
        console.error(e.message);
    }
})

app.listen(3000, () =>{
    console.log("Server start listen port 3000");
})