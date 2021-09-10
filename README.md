# Bk_Employee_Tracker
An application to manage employees.  This is a command line content management system.
## 
The command-line application allows a company to manage a company's employee database, using Node.js, Inquirer, and MySQL,npm Table. A video at the end shows how the application in action
## 
The application is started when the user type "node index".  This assume that database packages and daatabase connections are set.
When the user starts the application he is  presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role, 
view all departments, view all employees, add a department, add a role, add an employee, update an employee role and update employee managers.
##
When the user selects a "view option" he is presented with  a formatted table showing information for the corresponding viewing information from the database.
For example if the user choose to Views all roles he is presented with the job title, role id, the department that role belongs to, and the salary for that role.
When the user choose to view all employees
he is presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to.
##
When the user choose to add a department, a role or an employee he is presented with questions to provide information related to the choice.
For example when the user choose to add a role
he is prompted to enter the name, salary, and department for the role and that role is added to the database.  Also when the user choose to add an employee
he is  prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
##
The user could choose to update an employee role, employee manager and also delete employee, roles and department from the database.

Application Page Link :https://bkoala.github.io/Bk_Employee_Rracker/

Demo Video Link: https://drive.google.com/file/d/1IPXDTbMasdMHz7Tasjfj8rURkgeSnf2L/view