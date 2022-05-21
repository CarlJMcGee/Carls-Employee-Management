-- @BLOCK
INSERT INTO department (dep_name)
VALUES ("Executive Officers"),
    ("Soft Engineering"),
    ("Hard Engineering"),
    ("Media");

INSERT INTO roles (title, salary, department_id)
VALUES ("CEO", 1000000.00, 1),
    ("Hard Engineering Manager", 100000.00, 3),
    ("Lead Pipline Engineer", 75000.00, 3),
    ("Senior Pipline Engineer", 50000.00, 3),
    ("Junior Pipline Engineer", 38000.00, 3),
    ("Lead Mechanical Engineer", 75000.00, 3),
    ("Senior Mechanical Engineer", 50000.00, 3),
    ("Junior Mechanical Engineer", 38000.00, 3),
    ("Lead Chemical Engineer", 75000.00, 3),
    ("Senior Chemical Engineer", 50000.00, 3),
    ("Junior Chemical Engineer", 38000.00, 3),
    ("Lead Electrical Engineer", 75000.00, 3),
    ("Senior Electrical Engineer", 50000.00, 3),
    ("Junior Electrical Engineer", 38000.00, 3),
    ("Software Engineering Manager", 100000.00, 2),
    ("Lead Software Engineer", 75000.00, 2),
    ("Senior Software Engineer", 50000.00, 2),
    ("Junior Software Engineer", 38000.00, 2),
    ("Social Media Manager", 100000.00, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Mr", "Business", 1, 1),
    ("Pat", "Hirl", 2, 1),
    ("Nate", 'Codes', 3, 1),
    ("Matt", "Casper", 19, 1),
    ("Dan", "Hirl", 5, 2),
    ("Cori", "Kobold", 7, 2),
    ("Barnes", "Gannon Murphy", 9, 2),
    ("Mike", "Musika", 13, 2),
    ("Carl", "McGee", 18, 3),
    ("Corwin", "Diamond", 16, 3),
    ("Ben", "Koster", 10, 2),
    ("Thomas", "Musika", 12, 2);


-- @BLOCK
SELECT
    employees.id as id,
    employees.first_name as first_name,
    employees.last_name as last_name,
    roles.title as job_title,
    roles.salary as salary,
    department.dep_name as department,
CONCAT(manager.first_name, ' ', manager.last_name) 
AS manager FROM employees 
LEFT JOIN roles on employees.role_id = roles.id 
LEFT JOIN department on roles.department_id = department.id 
LEFT JOIN employees manager on manager.id = employees.manager_id


-- @BLOCK
SELECT
    roles.id AS ID,
    roles.title AS Title,
    roles.Salary AS Salary,
    department.dep_name AS Department
FROM roles
LEFT JOIN department on roles.department_id = department.id
ORDER BY id