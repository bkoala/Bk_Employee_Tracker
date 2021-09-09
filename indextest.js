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
pool = mysql.createPool({
    host: 'localhost',
    // MySQL username,
    user:  process.env.DB_USER,
    // TODO: Add MySQL password here
    password:  process.env.DB_PASSWORD,
    database:  process.env.DB_DATAB
});
pool.query('select `name` from department').then(([rows, fields]) => {
    // Logs out a list of user
    console.log(rows);
});
 