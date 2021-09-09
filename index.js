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

function getAnswers() {
  theChoices=[];
  theRoles=[];
  const questionsmenu=[
    {
        type: 'rawlist',
        name: 'userChoice',
        message: 'What would you like to do?',
        choices: ['View all departments','View all roles','View all employees','Add department', 'Add Role', 'Add Employee','Update Employee role','Update Employee Manager','View Employees by Manager','View employees by Department','Exit'],
        filter(val) {
          return (val.toLowerCase());
        },
      },
  
  ];
      return inquirer.prompt(questionsmenu).then((answers) => {
         
        if (answers.userChoice === "view all departments"){
          const sqlN=new noteSql.deparTment('Dat flils');
          sql=sqlN.viewAlldepartments(); 
          show_results(sql,db,0);  
        
        }
          else if (answers.userChoice === "view all roles"){ 
            const sqlN=new noteSql.roLe('Dat','100',2);
           sql=sqlN.viewAllroles();
            show_results(sql,db,1);
          }
          else if (answers.userChoice === "view all employees"){ 
            const sqlN=new noteSql.employee('a','b',1,1);
            sql=sqlN.viewAllemployees();
            show_results(sql,db,1);
          }
          else if (answers.userChoice === "add department"){
            //Add department
            const questions3 = [     
              { type: 'input',
                name: 'deptName',
                message: 'What department do you want to add?',}, 
              ];
            return inquirer.prompt(questions3).then((answers) => {
              const sqlN=new noteSql.deparTment(answers.deptName);
              sql=sqlN.addDepartment();
              show_results(sql,db,2);
         });
          }
          else if (answers.userChoice === "add role"){ 
            var sql12="Select name from department";
            db.query(sql12,function(err, result) {
              if(err){console.log(err);}
              Object.keys(result).forEach(function(key) {
                var row = result[key];
                theChoices.push(row.name);
              });
          

            const questions5 = [
              { type: 'input',
                name: 'roleName',
                message: 'What is the role Name to add?',}, { type: 'input',
                name: 'roleSalary',
                message: 'What is the salary of the role?',},{ type: 'rawlist',
                name: 'roleDpt',
                message: 'What is the role department?',
                choices:theChoices,
              },   
              ];

            return inquirer.prompt(questions5).then((answers) => {
              //Add a role title,salary,department_id
              var sql1=`select id from department where name='${answers.roleDpt}'`;
              db.query(sql1,function(err, results) {
                if(err){console.log(err);}
                results=results[0].id; 
              const sqlN=new noteSql.roLe(answers.roleName,parseFloat(answers.roleSalary),results);
              sql=sqlN.addRole();
              show_results(sql,db,3);
              })
            
            });
          })
          }
          else if (answers.userChoice === "add employee"){ 
          //Add an employee
          var sql12="Select title from role";
          db.query(sql12,function(err, result) {
            if(err){console.log(err);}
            Object.keys(result).forEach(function(key) {
              var row = result[key];
              theChoices.push(row.title);
              });
           

          const questions6 = [
            { type: 'input',
              name: 'fName',
              message: 'What is the employee first name?',},{ type: 'input',
              name: 'lName',
              message: 'What is the employee last name?',},{ type: 'rawlist',
              name: 'roleId',
              message: 'What is the employee title?',
              choices:theChoices,
            },
            ];

            return inquirer.prompt(questions6).then((answers) => {
              var sql1=`select id from role where title='${answers.roleId}'`;
              db.query(sql1,function(err, results) {
                if(err){console.log(err);}
                results=results[0].id;
              const sqlN=new noteSql.employee(answers.fName,answers.lName,parseInt(results));
              sql=sqlN.addEmployee();
              show_results(sql,db,4);
            });
          });
        })
          }
          else if (answers.userChoice === "update employee role"){
          //Update Employee role
          var sql12="Select * from employee";
          db.query(sql12,function(err, result) {
            if(err){console.log(err);}
            Object.keys(result).forEach(function(key) {
              var row = result[key];
              var theName=row.first_name +" " + row.last_name;
              theChoices.push(theName);
             
              });
             
            
             var sql14="Select title from role";
            db.query(sql14,function(err, results) {
            if(err){console.log(err);}
            Object.keys(results).forEach(function(key) {
              var row = results[key];
              theRoles.push(row.title);
              });
             
              //console.log(theRoles);
              const questions7 = [
                { type: 'rawlist',
                  name: 'empName',
                  message: "Which employee's role do you want to update?",
                  choices:theChoices,
                },{ type: 'rawlist',
                  name: 'empRole',
                  message: "What is the employee new role?",
                  choices:theRoles,
                },
              ];
          
          return inquirer.prompt(questions7).then((answers) => {
            var fName=answers.empName;
            var fN=fName.split(" ")[0]; var lN=fName.split(" ")[1];
            var sql1=`select id from employee WHERE (first_name='${fN}' AND last_name='${lN}')`;
            db.query(sql1,function(err, results) {
              if(err){console.log(err);}
              resultsN=results[0].id;
              const sqlN=new noteSql.employee(fN,lN,resultsN,'2');
            
           
              var sql15=`select id from role where title='${answers.empRole}'`;
              db.query(sql15,function(err, results) {
                if(err){console.log(err);}
                resultsV=results[0].id;
               sql=sqlN.updateRole(parseInt(resultsV),parseInt(resultsN));
               show_results(sql,db,7);
          })
        });


        });
      })
    })
    //End of update
          }
          else if (answers.userChoice === "update employee manager"){
            //Udate employee Manager
            var sql12="Select * from employee";
          db.query(sql12,function(err, result) {
            if(err){console.log(err);}
            Object.keys(result).forEach(function(key) {
              var row = result[key];
              var theName=row.first_name +" " + row.last_name;
              theChoices.push(theName);
             
              });
             
              //console.log(theRoles);
              const questions8 = [
                { type: 'rawlist',
                  name: 'empName',
                  message: "Which employee's manager do you want to update?",
                  choices:theChoices,
                },{ type: 'rawlist',
                  name: 'empManager',
                  message: "Who is the employee new manager?",
                  choices:theChoices,
                },
              ];
          
          return inquirer.prompt(questions8).then((answers) => {
            var fName=answers.empName;
            var fN=fName.split(" ")[0]; var lN=fName.split(" ")[1];
            //Find employee id
            var sql1=`select id from employee WHERE (first_name='${fN}' AND last_name='${lN}')`;
            db.query(sql1,function(err, results) {
              if(err){console.log(err);}
              resultsN=results[0].id;
              const sqlN=new noteSql.employee(fN,lN,resultsN,'2');
              //Find Employee manager chosen
              var fName1=answers.empManager;
              var fN1=fName1.split(" ")[0]; var lN1=fName1.split(" ")[1];
              var sql15=`select id from employee WHERE (first_name='${fN1}' AND last_name='${lN1}')`;
              db.query(sql15,function(err, results) {
                if(err){console.log(err);}
                resultsV=results[0].id;
               sql=sqlN.updateManager(parseInt(resultsV),parseInt(resultsN));
               show_results(sql,db,8);
          })
        });
        });
    })
            
          //End of update
          }
          else if (answers.userChoice === "view employees by manager"){ 
            var sql12="Select * from employee WHERE manager_id IS NOT NULL";
            db.query(sql12,function(err, result) {
              if(err){console.log(err);}
              Object.keys(result).forEach(function(key) {
                var row = result[key];
                var theName=row.first_name +" " + row.last_name;
                theChoices.push(theName);
                });
               //Update questions
               const questions = [
                { type: 'rawlist',
                  name: 'empManager',
                  message: "Which manager employees do you want to see?",
                  choices:theChoices,
                },]
    

              })
            //End of option
          }
          else if (answers.userChoice === "view employees by department"){ xcount=10;}
          else if (answers.userChoice === "exit"){ 
            //Kill Process 
            process.kill(process.pid, 'SIGTERM')
          }

  }); }


//Show results from sql calls
function show_results(sql,db,xx) {
  db.query(sql,function(err, results) {
    if(xx===3){console.log("A role was added to the database") ;}
    else if(xx===2){console.log("A department was added to the database") ;}
    else if(xx===4){console.log("An employee was added to the database") ;}
    else if(xx===7){console.log("An employee role was updated") ;}
    else if(xx===8){console.log("An employee manager's was updated") ;}
    else{
    console.table(results); // results contains rows returned by server
    }
    getAnswers(4);
   if(err){console.log(err);}
 });
}

// TODO: Create a function to write README file
function displaySQldata(sql) {
//Exit the application
 process.kill(process.pid, 'SIGTERM')
}


// Create a function to initialize 
function init() {
 //Start call
  getAnswers();
}

// Function call to initialize app
init();
