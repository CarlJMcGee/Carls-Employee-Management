-- @block
DROP DATABASE IF EXISTS business_db;
CREATE DATABASE business_db;

USE business_db;
DROP TABLE IF EXISTS `department`;
CREATE TABLE department(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    dep_name VARCHAR(255) NOT NULL UNIQUE
);

USE business_db;
DROP TABLE IF EXISTS `roles`;
CREATE TABLE roles(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL UNIQUE,
    salary DECIMAL NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

USE business_db;
DROP TABLE IF EXISTS `employees`;
CREATE TABLE employees(  
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    first_name VARCHAR(255) NOT NULL COMMENT 'first name',
    last_name VARCHAR(255) NOT NULL COMMENT 'last name',
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (manager_id) REFERENCES employees(id)
);
