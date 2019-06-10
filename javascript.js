const express = require('express');
const mysql = require('mysql');


const db = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: '',
    database: 'databasetest',

});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected');
});

const app = express();

app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE IF NOT EXISTS databasetest';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('database created');
    });
});


app.get('/createpoststable', (req, res) => {
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Posts table created');
    })
});


app.listen('3000', () => {
    console.log('Server started on port 3000');
});