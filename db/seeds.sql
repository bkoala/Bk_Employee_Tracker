INSERT INTO department (name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");

INSERT INTO role(title, salary, department_id)
VALUES ("Salesperson",80000,1),
       ("Lead Engineer", 120000,2),
       ("Lawyer", 150000,4),
       ("Accountant",125000,3),
       ("Account Manager", 150000,3),
       ("Legal Team Lead", 180000,4),
       ("Software Engineer", 100000,2);

INSERT INTO employee(first_name,last_name,role_id) 
VALUES ("Mike","Chan",2),
        ("Papa","John",3),
        ("Tom","Levalier",4),
        ("Amanda","King",4),
        ( "Sarah","Lourd",5),
        ("Anah","Loka",6);