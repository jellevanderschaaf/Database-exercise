const express = require('express');
const mysql = require('mysql');


const connection = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: 'jelle',

});

connection.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected');
});

const app = express();

app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE databasetest';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('database created');
    });
});


app.listen('3000', () => {
    console.log('Server started on port 3000');
});