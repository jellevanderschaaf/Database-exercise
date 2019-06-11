// Global variables

var idCounter = 10;
var valueRemove;

// Food Items objects

let foodItems = [];

class FoodItem {
    constructor(id, name, fat, carbs, protein, kcals, price) {
        this.id = id;
        this.name = name;
        this.fat = fat;
        this.carbs = carbs;
        this.protein = protein;
        this.kcals = kcals;
        this.price = price;
    }
}

function newFoodItem(id, name, fat, carbs, protein, kcals, price) {

    foodItems[id] = new FoodItem(id, name, fat, carbs, protein, kcals, price);

}

newFoodItem(0, 'minced beef', 72, 1.8, 120, 1140, 6.4);
newFoodItem(1, 'egg', 6.7, 0.9, 7.7, 95, 0.164);
newFoodItem(2, 'butter', 82.5, 0.7, 0.7, 748, 1.196);
newFoodItem(3, 'chicken legg', 39, 0, 54, 570, 1.22);
newFoodItem(4, 'mackerel', 63, 0, 77, 875, 3.32);
newFoodItem(9, 'apple', 0, 12, 0.4, 54, 0.12);

console.log(foodItems[0].name);

// Create food items

function createFoodItem() {
    document.getElementById("createFoodItem").classList.remove('hidden');
}

function createItem() {

    var entryName = document.getElementById('name').value;
    var entryFat = Number(document.getElementById('fat').value);
    var entryCarbs = Number(document.getElementById('carbs').value);
    var entryProtein = Number(document.getElementById('protein').value);
    var entryKcals = Number(document.getElementById('kcals').value);
    var entryPrice = Number(document.getElementById('price').value);
    var id = idCounter + 1;
    updateIdCounter();

    function updateIdCounter() {
        idCounter = idCounter + 1;
    }

    newFoodItem(id, entryName, entryFat, entryCarbs, entryProtein, entryKcals, entryPrice);
    console.log(foodItems);


    var newFoodItem2 = document.createElement('div');
    newFoodItem2.innerHTML = "&bull; " + entryName;
    newFoodItem2.setAttribute("class", "FoodItem");
    document.getElementById("test").appendChild(newFoodItem2);

    // check if this works with space

    newFoodItem2.setAttribute("id", entryName);

    //    

    var newFoodItemAddButton = document.createElement('button');
    newFoodItemAddButton.innerHTML = '+';
    newFoodItemAddButton.value = id;
    newFoodItemAddButton.setAttribute("class", "btn btn-info add");

    newFoodItemAddButton.onclick = function() {
        addFoodItemToList(this.value);
    };

    document.getElementById(entryName).appendChild(newFoodItemAddButton);

}

function cancel() {
    document.getElementById('foodForm').reset();
    document.getElementById("createFoodItem").classList.add('hidden');
}


// Database

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

//