function getAnswers(xxx) {
    const questions = [
    { type: 'input',
      name: 'mngName',
      message: 'What is the team Manager Name?',},
      { type: 'input',
      name: 'mngId',
      message: 'What is the Manager Employee Id',
      validate: NumberValidator,
     },
      { type: 'input',
      message:'What is the Manager Email?' ,
      name: 'mngEmail',
      validate:EmailValidator,
    },
      { type: 'input',
      name: 'mngofficeNumber',
      message:'What is the Manager office number?' ,
      validate: NumberValidator,
    },
      
    ];
    //Engineer’s name, ID, email, and GitHub username
    const questions1 = [
      { type: 'input',
        name: 'engName',
        message: 'What is the Engineer Name?',},
        { type: 'input',
      name: 'engId',
      message: 'What is the Engineer employee Id',
      validate: NumberValidator,
    },
        { type: 'input',
        message:'What is the Engineer Email?' ,
        name: 'engEmail',
        validate: EmailValidator,
      },
        { type: 'input',
        name: 'engitHub',
        message:'What is the Engineer github name?' ,},
      
      ];
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
    const questions4=[
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
    //Add interns questions 
    //intern’s name, ID, email, and school
    const questions2 = [
      { type: 'input',
        name: 'intName',
        message: 'What is the Intern Name?'},
        { type: 'input',
          name: 'intId',
         message: 'What is the Intern employee Id',
         validate: NumberValidator,
        },
        { type: 'input',
        message:'What is the Intern Email?' ,
        name: 'intEmail',
        validate: EmailValidator, 
      },
        { type: 'input',
        name: 'intSchool',
        message:'What is the Intern School name?' ,},
       
      ];
    
    //Manager xxx =1 ;Engineer xxx=3; exit xxx=0; intern xxx=2; Menu xxx=4;
    if (xxx=== 1){
      return inquirer.prompt(questions).then((answers) => {
          //Push answer in Global variables
        //  var Engn= new Manager(answers.mngName, answers.mngId, answers.mngEmail,answers.mngofficeNumber);
         // allAnswers.push(Engn);
          displaySQldata(answers.userChoice,db);
          return getAnswers(4);
         
      });
    }
      else if (xxx=== 3){
        return inquirer.prompt(questions1).then((answers) => {
            //Push answer in Global variables
            var Engn= new Engineer(answers.engName, answers.engId, answers.engEmail,answers.engitHub);
            allAnswers.push(Engn);
            return getAnswers(4);
           
        });
      }
      else if (xxx === 2){
        return inquirer.prompt(questions2).then((answers) => {
          var Engn= new Intern(answers.intName, answers.intId, answers.intEmail,answers.intSchool);
          allAnswers.push(Engn);
          return getAnswers(4);
    
        });
      }
      else if (xxx === 4){
          //Menu
        /*
        'View all departments','View all roles','Add department', 'Add Role', 
        'Add Employee','Update Employee role','Update Employee Manager',
        'View Employees by Manager','View employees by Department','Exit'
        */
        return inquirer.prompt(questions4).then((answers) => {
           var xcount =0;
          if (answers.adEmploye === "view all departments"){ xcount=1;}
            else if (answers.adEmploye === "view all roles"){ xcount=2;}
            else if (answers.adEmploye === "add department"){ xcount=3;}
            else if (answers.adEmploye === "add role"){ xcount=5;}
            else if (answers.adEmploye === "add employee"){ xcount=6;}
            else if (answers.adEmploye === "update employee role"){ xcount=7;}
            else if (answers.adEmploye === "update employee manager"){ xcount=8;}
            else if (answers.adEmploye === "view employees by manager"){ xcount=9;}
            else if (answers.adEmploye === "view employees by department"){ xcount=10;}
            else if (answers.adEmploye === "exit"){ xcount=0;}
        //  console.log("Count is " . xcount);
          return getAnswers(xcount);
    
        });
      }
      else{
        return Promise.resolve( allAnswers);
    }
    };
    module.exports=askQuestions;