//Employee Class
class employee {
    constructor(first_name, last_name,role_id,manager_id) {
      this.first_name=first_name;
      this.last_name=last_name;
      this.role_id=role_id;
      this.manager_id=manager_id;
    }
/* Menu information
    view all departments (name and Ids), 
    view all roles, 
    view all employees, 
    add a department,
    Update employee managers.
    Upade employee role
View employees by manager.
View employees by department.
Delete departments, roles, and employees.

*/
//View all Employees
viewAllemployees(){
  const sql = `SELECT e.id as employee_id, e.first_name, e.last_name, r.title, r.salary,
   e2.first_name as manager_first_name, e2.last_name as manager_last_name, d.name as department
  FROM employee e
  JOIN role r on e.role_id = r.id
  JOIN department d on r.department_id = d.id
  LEFT JOIN employee e2 on e.manager_id = e2.id
    `; 
  return sql;
}

//View employees by manager.

viewEmployeebyManager(xx){
  const sql = `SELECT * FROM employee WHERE manager_id= '${xx}'`; 
  return sql;
}
//View Employees by Department

viewEmployeebyDepartment(xx){
  const sql = `SELECT * FROM employee WHERE  role_id IN ( SELECT id FROM role WHERE department_id = '${xx}')`; 
  return sql;
}
// Add an employee
addEmployee(){
  const sql = `INSERT INTO employee(first_name,last_name,role_id) VALUES (' ${this.firt_name}',' ${this.last_name}',' ${this.role_id}')`; 
  return sql;
}
//Update employee managers
updateManager(xx,yy){
  const sql = `UPDATE employee SET manager_id = '${xx}'  WHERE id ='${yy}'`; 
  return sql;
}
//Update employee Role
updateRole(xx,yy){
  const sql = `UPDATE employee SET role_id = '${xx}'  WHERE id ='${yy}'`; 
  return sql;
}

//Delete Employee
deleteEmployee(xx,yy){
  const sql = `DELETE FROM employee WHERE first_name= '${xx}' and last_name= '${yy}'`; 
  return sql;
}
};
//Department Class
class deparTment {
  constructor(name) {
    this.name=name;
  }
  //View all departments
viewAlldepartments(){
  const sql = `SELECT *  FROM department`; 
 return sql;
}
//Add a department
addDepartment(){
  const sql = `INSERT INTO department(name) VALUES ('${this.name}')`; 
  return sql;
}

//Delete department
deleteDepartment(xx){
  const sql = `DELETE FROM department WHERE name= '${xx}'`; 
  return sql;
}

};
//Role Class
/*
 title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,
     add a role, 
     delete Role
*/
class roLe {
  constructor(title,salary,department_id) {
    this.name=title;
    this.salary=salary;
    this.department_id=department_id;
  }
 //View all Roles
viewAllroles(){
  const sql = `SELECT *  FROM role`; 
  return sql;
}
//Add a Role 
  addRole(){ 
      const sql = `INSERT INTO role(title,salary,department_id) VALUES (' ${this.name}',' ${this.salary}',' ${this.department_id}')`; 
      return sql;
    }
//Delete a role
deleteRole(xx){
  const sql = `DELETE FROM role WHERE title= '${xx}'`; 
  return sql;
}


};


module.exports = {employee,deparTment,roLe};