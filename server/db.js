const Pool = require('pg').Pool;

//Connect your database
const pool = new Pool({
    'user': 'dino',
    'host': 'localhost',
    'port': 5432,
    'database': 'impulse',
});

module.exports = pool;
