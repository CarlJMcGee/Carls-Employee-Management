const inquirer = require("inquirer");
const inquirerPrompt = require("inquirer-autocomplete-prompt");
inquirer.registerPrompt("autocomplete", inquirerPrompt);
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
          console.log("Department Added");
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
      connection.execute(
        `INSERT INTO roles (title, salary, department_id)
          VALUES (?, ?, ?)`,
        [ans.roleName, ans.roleSal, depId],
        (err, rows) => {
          if (err) {
            console.error(err);
          }
          console.log("Role Added!");
          return promptInit();
        }
      );
    });
};

const addEmpl = function () {
  let manArr = [];
  let manNames = [];
  connection.execute(
    `SELECT employees.id, employees.first_name, employees.last_name FROM employees ORDER BY id`,
    (err, rows) => {
      rows.forEach((item) => {
        manArr.push(Object.values(item));
      });
      manArr.forEach((item) => {
        item.splice(0, 1);
        let joined = item.join(" ");
        manNames.push(joined);
      });
    }
  );

  let roleObj = {};
  connection.execute(
    `SELECT roles.id, roles.title FROM roles ORDER BY id`,
    (err, rows) => {
      roleObj = rows;
    }
  );

  return inquirer
    .prompt([
      {
        type: "input",
        name: "first",
        message: `Enter New Employee's First Name:`,
        validate: (input) => (input ? true : false),
      },
      {
        type: "input",
        name: "last",
        message: `Enter New Employee's Last Name:`,
        validate: (input) => (input ? true : false),
      },
      {
        type: "input",
        name: "role",
        message: `Enter New Employee's Role:`,
        validate: (input) => (input ? true : false),
      },
      {
        type: "input",
        name: "manager",
        message: `Enter New Employee's Manager:`,
        validate: (input) => (input ? true : false),
      },
    ])
    .then((ans) => {
      let manID = manNames.indexOf(ans.manager, 0) + 1;
      let roleID = roleObj.filter((item) => {
        return item.title === ans.role;
      })[0].id;
      connection.execute(
        `INSERT INTO employees (first_name, last_name, role_id, manager_id)
              VALUES (?, ?, ?, ?)`,
        [ans.first, ans.last, roleID, manID],
        (err, rows) => {
          if (err) {
            console.error(err);
          }
          console.log("Employee Added");
          promptInit();
        }
      );
    });
};

const updateRole = function () {
  let roleObj = {};
  connection.execute(
    `SELECT roles.id, roles.title FROM roles ORDER BY id`,
    (err, rows) => {
      roleObj = rows;
    }
  );
  let empArr = [];
  let empNames = [];
  connection.execute(
    `SELECT employees.id, employees.first_name, employees.last_name FROM employees ORDER BY id`,
    (err, rows) => {
      rows.forEach((item) => {
        empArr.push(Object.values(item));
      });
      empArr.forEach((item) => {
        item.splice(0, 1);
        let joined = item.join(" ");
        empNames.push(joined);
      });
    }
  );

  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: `Enter Employee's Name`,
        validate: (input) => (input ? true : false),
      },
      {
        type: "input",
        name: "role",
        message: "Enter Role Title:",
      },
    ])
    .then((ans) => {
      let roleID = roleObj.filter((item) => {
        return item.title === ans.role;
      })[0].id;
      let EID = empNames.indexOf(ans.name, 0) + 1;
      connection.execute(
        `UPDATE employees SET role_id = ? WHERE id = ?`,
        [roleID, EID],
        (err, rows) => {
          if (err) {
            console.error(err);
          }
          console.log("Employee Role Updated");
          promptInit();
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
          "Press ctrl C to Exit",
        ],
        loop: false,
        pageSize: 8,
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
        case "Add an Employee":
          return addEmpl();
          break;
        case "Update an Employee's Role":
          return updateRole();
          break;
        case "Exit":
          break;
      }
    });
};

promptInit();
