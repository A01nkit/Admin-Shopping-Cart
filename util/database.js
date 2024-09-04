const {Client} = require('pg');

const client = new Client({
    host: 'localhost',
    user: 'postgres',
    database: 'Node-Cart-Project',
    password: '1234',
    port:5432
});


module.exports = client;