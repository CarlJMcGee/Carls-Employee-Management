-- @BLOCK
INSERT INTO department (dep_name)
VALUES ("Executive Officers"),
    ("Soft Engineering"),
    ("Hard Engineering"),
    ("Media");

INSERT INTO roles (id, title, salary, department_id)
VALUES (0, "CEO", 1000000.00, 1),
    (1, "Hard Engineering Manager", 100000.00, 3),
    (111, "Lead Pipline Engineer", 75000.00, 3),
    (112, "Senior Pipline Engineer", 50000.00, 3),
    (113, "Junior Pipline Engineer", 38000.00, 3),
    (121, "Lead Mechanical Engineer", 75000.00, 3),
    (122, "Senior Mechanical Engineer", 50000.00, 3),
    (123, "Junior Mechanical Engineer", 38000.00, 3),
    (131, "Lead Chemical Engineer", 75000.00, 3),
    (132, "Senior Chemical Engineer", 50000.00, 3),
    (133, "Junior Chemical Engineer", 38000.00, 3),
    (141, "Lead Electrical Engineer", 75000.00, 3),
    (142, "Senior Electrical Engineer", 50000.00, 3),
    (143, "Junior Electrical Engineer", 38000.00, 3),
    (2, "Software Engineering Manager", 100000.00, 2),
    (211, "Lead Software Engineer", 75000.00, 2),
    (212, "Senior Software Engineer", 50000.00, 2),
    (213, "Junior Software Engineer", 38000.00, 2),
    (3, "Social Media Manager", 100000.00, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Mr", "Business", 0, 1),
    ("Pat", "Hirl", 1, 1),
    ("Nate", 'Codes', 2, 1),
    ("Matt", "Casper", 3, 1),
    ("Dan", "Hirl", 111, 2),
    ("Cori", "Kobold", 121, 2),
    ("Barnes", "Gannon Murphy", 131, 2),
    ("Mike", "Musika", 141, 2),
    ("Carl", "McGee", 213, 3),
    ("Corwin", "Diamond", 211, 3),
    ("Ben", "Koster", 132, 2),
    ("Thomas", "Musika", 122, 2);


-- @BLOCK
SELECT
    employees.id as id,
    employees.first_name as first_name,
    employees.last_name as last_name,
    roles.title as job_title,
    roles.salary as salary,
    department.dep_name as department,
    employees.manager_id as manager
FROM employees employees, employees managers
JOIN roles ON employees.role_id = roles.id
JOIN department ON roles.department_id = department.id