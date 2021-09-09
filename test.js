// TODO: Include packages needed for this application
const inquirer = require('inquirer');
//const fs = require('fs');
const noteSql = require('./noteSql');
//const quesTion = require('./askQuestions');
const cTable = require('console.table');
//const util = require('util');
const express = require('express');
// Import and require mysql2


//const path = require('path');
const choices_v=[];
//const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
require('dotenv').config();
var allAnswers=[];

// Connect to database
var choicesv=[];
const mysql = require('promise-mysql2');
let connection;
mysql.createConnection({
    host: 'localhost',
    // MySQL username,
    user:  process.env.DB_USER,
    // TODO: Add MySQL password here
    password:  process.env.DB_PASSWORD,
    database:  process.env.DB_DATAB
}).then((conn) => {
    let result = conn.query('select `name` from department');
    conn.end();
    return result;
}).then(([rows, fields]) => {
    // list of user
    console.log(rows);
    choicesv.push(row.name);
});


/*
//Get department names from database
function getdepartmentNames(table,db,param) {
    var choicesv=[];
     db.query("SELECT name FROM "+ table + param, function (err, result) {
       // if any error while executing above query, throw error
       if (err) throw err;
       // if there is no error, you have the result
       // iterate for all the rows in result
       Object.keys(result).forEach(function(key) {
         var row = result[key];
         choicesv.push(row.name);
         console.log(row.name)
       });
      //console.log(choicesv);
     });
    }
*/

