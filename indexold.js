// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const noteSql = require('./noteSql');
//const util = require('util');
//const path = require('path');

//console.log(path);
//M
// create writeFile function using promises instead of a callback function
//const writeFileAsync = util.promisify(fs.writeFile);
const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');

//const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: '',
    database: 'movies_db'
  },
  console.log(`Connected to the movies_db database.`)
);
// TODO: Create an array of questions for user input
const questions = [
  {
    type: 'rawlist',
    name: 'userChoice',
    message: 'Please Choose Option from Menu Below?',
    choices: ['Add Engineer', 'Add Intern', 'Exit'],
    filter(val) {
      return (val.toLowerCase());
    },
  },
];
const promptUser = () => {
    return inquirer.prompt(questions);
};
// TODO: Create a function to write README file
function displaySQldata( data) {
  const filename = path.join("genReadMe/", fileName);
   const writeFileAsync = util.promisify(fs.writeFile);  
   return  writeFileAsync(filename, gMarkd.generateMarkdown(data));

}

// TODO: Create a function to initialize Readme app
function init() {
    promptUser()
    .then((answers) => writeToFile('Readme.md', answers))
    .then(() => console.log('Successfully wrote to Readme File'))
    .catch((err) => console.error(err));

}

// Function call to initialize app
init();
