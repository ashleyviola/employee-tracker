const mysql = require('mysql2');

// connect to database 
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Ilovedogs123',
        database: 'company'
    },
    console.log('connected to the company database.')
);

module.exports = db;