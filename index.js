const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");
const InputPrompt = require("inquirer/lib/prompts/input");
const connection = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "z@ai5GzE#Jv7",
    database: "business_db",
  },
  console.log("Connected to database")
);

const viewDep = function () {
  connection.execute(`SELECT * FROM department ORDER BY id`, (err, rows) => {
    console.table(rows);
    return promptInit();
  });
};

const viewRole = function () {
  connection.execute(
    `SELECT
    roles.id AS ID,
    roles.title AS Title,
    roles.Salary AS Salary,
    department.dep_name AS Department
FROM roles
LEFT JOIN department on roles.department_id = department.id
`,
    (err, rows) => {
      console.table(rows);
      return promptInit();
    }
  );
};

const viewEmpl = function () {
  connection.execute(
    `SELECT
    employees.id as ID,
    employees.first_name as First,
    employees.last_name as Last,
    roles.title as Job_Title,
    roles.salary as Salary,
    department.dep_name as Department,
    employees.manager_id as Manager
FROM employees
JOIN roles ON employees.role_id = roles.id
JOIN department ON roles.department_id = department.id
ORDER BY id`,
    (err, rows, fields) => {
      console.table(rows);
      return promptInit();
    }
  );
};

const addDep = function () {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "depName",
        message: "Enter New Department Name:",
        validate: (input) => (input ? true : false),
      },
    ])
    .then((ans) => {
      connection.execute(
        `INSERT INTO department (dep_name)
          VALUES (?)`,
        [ans.depName],
        (err, rows) => {
          console.log(rows);
          return promptInit();
        }
      );
    });
};

const addRole = function () {
  let depObj = {};
  let depArr = [];
  let depNames = [];
  connection.execute(`SELECT * FROM department ORDER BY id`, (err, rows) => {
    depObj = rows;
    rows.forEach((item) => {
      depArr.push(Object.values(item));
    });
    depNames = depArr.forEach((item) => {
      depNames.push(item[1]);
    });
  });

  return inquirer
    .prompt([
      {
        type: "input",
        name: "roleName",
        message: "Enter New Role Name:",
        validate: (input) => (input ? true : false),
      },
      {
        type: "input",
        name: "roleSal",
        message: "Enter Role Salary",
        validate: (input) => (input ? true : false),
      },
      {
        type: "list",
        name: "dep",
        message: "Select Department for Role:",
        choices: depNames,
      },
    ])
    .then((ans) => {
      depId = depObj.filter((item) => {
        return item.dep_name === ans.dep;
      })[0].id;
      console.log(depId);
      connection.execute(
        `INSERT INTO roles (title, salary, department_id)
          VALUES (?, ?, ?)`,
        [ans.roleName, ans.roleSal, depId],
        (err, rows) => {
          if (err) {
            console.error(err);
          }
          console.log(rows);
          console.log("Role Added!");
        }
      );
    });
};

const promptInit = function () {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "rootMenu",
        message: "Please select one of the following options:",
        choices: [
          "View Departments",
          "View Roles",
          "View Employees",
          "Add a Department",
          "Add a Role",
          "Add an Employee",
          "Update an Employee's Role",
          "Exit",
        ],
        loop: false,
      },
    ])
    .then((ans) => {
      switch (ans.rootMenu) {
        case "View Departments":
          return viewDep();
          break;
        case "View Roles":
          return viewRole();
          break;
        case "View Employees":
          return viewEmpl();
          break;
        case "Add a Department":
          return addDep();
          break;
        case "Add a Role":
          return addRole();
          break;
      }
    });
};

promptInit();
