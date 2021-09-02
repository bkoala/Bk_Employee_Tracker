class noteSql {
    constructor() {
     // this.lastId = 0;
    }
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
//View all departments
viewAlldepartments(){
  const sql = `SELECT *  FROM departments`; 
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
       return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
}


}


module.exports = new noteSql();