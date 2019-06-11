const express = require('express');
const mysql = require('mysql');


const db = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: '',
    database: 'diet_tracker',

});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected');
});

const app = express();

app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE diet_tracker';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('database created');
    });
});

app.get('/createfooditemstable', (req, res) => {
    let sql = 'CREATE TABLE food_items (id int AUTO_INCREMENT, name VARCHAR(255), fat VARCHAR(255), carbs VARCHAR(255), protein VARCHAR(255), kcals VARCHAR(255), price VARCHAR(255), PRIMARY KEY (id))';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Food items table created');
    })
});

app.get('/addfooditem', (req, res) => {
    let post = { name: 'kefir', fat: '1.6', carbs: '5', protein: '3.6', kcals: '48', price: '1' };
    let sql = 'INSERT INTO food_items SET ?';
    let query = db.query(sql, post, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Food item added');
    });
});

app.listen('3000', () => {
    console.log('Server started on port 3000');
});