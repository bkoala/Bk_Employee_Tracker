// TODO: Include packages needed for this application
const inquirer = require('inquirer');
//const fs = require('fs');
const noteSql = require('./noteSql');
//const quesTion = require('./askQuestions');
const cTable = require('console.table');
//const util = require('util');
const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
const { json } = require('express');
//const path = require('path');

//const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
require('dotenv').config();
var allAnswers=[];
// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user:  process.env.DB_USER,
    // TODO: Add MySQL password here
    password:  process.env.DB_PASSWORD,
    database:  process.env.DB_DATAB
  },
  console.log(`Connected to the movies_db database.`)
);
// TODO: Create an array of questions for user input
/*
    view all departments (name and Ids), 
    view all roles, 
    view all employees, 
    add a department,
     add a role, 
     add an employee,
      update an employee role
      * Update employee managers.

* View employees by manager.

* View employees by department.

* Delete departments, roles, and employees.

* View the total utilized budget of a department&mdash;in other words, the combined salaries of all employees in that department.

*/
//QUESTIONS

function getAnswers(xxx) {
  
  //Menu questions

  /* view all departments (name and Ids), 
  view all roles, 
  view all employees, 
  add a department,
   add a role, 
   add an employee,
    update an employee role
    * Update employee managers.
* View employees by manager.

* View employees by department.

* Delete departments, roles, and employees. */


 
 //console.log(localStorage.getItem("theChoices"))
  const questionsmenu=[
      {
          type: 'rawlist',
          name: 'userChoice',
          message: 'What would you like to do?',
          choices: ['View all departments','View all roles','Add department', 'Add Role', 'Add Employee','Update Employee role','Update Employee Manager','View Employees by Manager','View employees by Department','Exit'],
          filter(val) {
            return (val.toLowerCase());
          },
        },
    
    ];
    // add role --5

  const questions5 = [
   
    { type: 'input',
      name: 'roleName',
      message: 'What is the role Name to add?',},
      { type: 'input',
      name: 'roleSalary',
      message: 'What is the salary of the role?',},
      { type: 'rawlist',
      name: 'roleDpt',
      message: 'What is the role department?',
      choices:theChoices,
    },
      
    ];
    
    //Add employee 
    const questions6 = [
     
      { type: 'input',
        name: 'fName',
        message: 'What is the employee first name?',},
        { type: 'input',
        name: 'lName',
        message: 'What is the employee last name?',},
        { type: 'input',
        name: 'roleId',
        message: 'What is the employee role?',},
        
      ];

    //Add a department
    const questions3 = [
      
      { type: 'input',
        name: 'deptName',
        message: 'What department do you want to add?',}, 
      ];


  //Add interns questions 
  //intern’s name, ID, email, and school
  
  //Manager xxx =1 ;Engineer xxx=3; exit xxx=0; intern xxx=2; Menu xxx=4;
 
  if (xxx=== 1){
       const sqlN=new noteSql.deparTment('Dat flils');
       sql=sqlN.viewAlldepartments(); 
       show_results(sql,db);
  }
  else if (xxx===0){ return }
  else if (xxx=== 2){
    const sqlN=new noteSql.roLe('Dat','100',2);
    sql=sqlN.viewAllroles();
    show_results(sql,db);
 }

    else if (xxx=== 3){
      return inquirer.prompt(questions3).then((answers) => {
           const sqlN=new noteSql.deparTment(answers.deptName);
           sql=sqlN.addDepartment();
           show_results(sql,db);
      });
    }
    else if (xxx === 5){
     
      //console.log(theChoices);
      return inquirer.prompt(questions5).then((answers) => {
        //Add a role title,salary,department_id
        var sql1=`select id from department where name='${answers.roleDpt}'`;
        db.query(sql1,function(err, results) {
          if(err){console.log(err);}
          results=results[0].id; 
        const sqlN=new noteSql.roLe(answers.title,answers.salary,results);
        sql=sqlN.addRole();
        show_results(sql,db);
        })
      
      });
    }
    else if (xxx === 6){
      return inquirer.prompt(questions6).then((answers) => {

        const sqlN=new noteSql.roLe(answers.fName,answers.lName,answers.roleId);
        sql=sqlN.addRole();
        show_results(sql,db);
      });
    }

    else if (xxx === 4){
        //Menu for prompt answers 4
      /*
      'View all departments','View all roles','Add department', 'Add Role', 
      'Add Employee','Update Employee role','Update Employee Manager',
      'View Employees by Manager','View employees by Department','Exit'
      */
      return inquirer.prompt(questionsmenu).then((answers) => {
         var xcount =0;
        if (answers.userChoice === "view all departments"){ xcount=1;}
          else if (answers.userChoice === "view all roles"){ xcount=2;}
          else if (answers.userChoice === "add department"){ xcount=3;}
          else if (answers.userChoice === "add role"){ xcount=5;}
          else if (answers.userChoice === "add employee"){ xcount=6;}
          else if (answers.userChoice === "update employee role"){ xcount=7;}
          else if (answers.userChoice === "update employee manager"){ xcount=8;}
          else if (answers.userChoice === "view employees by manager"){ xcount=9;}
          else if (answers.userChoice === "view employees by department"){ xcount=10;}
          else if (answers.userChoice === "exit"){ 
            xcount=0;
          }
        
      //  console.log("Count is " . xcount);
        return getAnswers(xcount);
  
      });
    }
    return Promise.resolve();
  };

//Get department names from database


const getdepartmentNames = (table) =>{
 //var choices=[];
 const sql="select * from " +table
 return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
        if (err) {
            return reject(err);
        }
        resolve(result);
    });
});
 }
 
 /*
 function find_singlepar(sql,db){
  db.query(sql,function(err, results) {
    if(err){console.log(err);}
    results=results[0].id;
 });
 }
// var sql1="select id from department where name='legal'"
//find_singlepar(sql1,db);
*/
//Show results from sql calls
function show_results(sql,db) {
  db.query(sql,function(err, results) {
    console.table(results); // results contains rows returned by server
    getAnswers(4);
   if(err){console.log(err);}
 });
}

// TODO: Create a function to write README file
function displaySQldata(sql) {
//Exit the application
 process.kill(process.pid, 'SIGTERM')
}

theChoices=[];
// TODO: Create a function to initialize Readme app
function init() {
   // console.log(theChoices);

getdepartmentNames("department")
.then((result) => { 
    //call more queries here if needed     
    Object.keys(result).forEach(function(key) {
     var row = result[key];
     theChoices.push(row.name);
   });
   // console.log(theChoices);  
  getAnswers(4)
 .then((answers) => displaySQldata(answers))
 .then(() => console.log('Application Terminated') )
 .catch((err) => console.error(err));
})
.catch((err) => { console.error(err)});


  
}

// Function call to initialize app
init();
