  
const mysql = require('mysql');
const inquirer = require('inquirer');
var consoleTable = require("console.table");

const connection = mysql.createConnection({
    host: 'localhost',
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: 'root',
  
    // Be sure to update with your own MySQL password!
    password: 'Target03!',
    database: 'sopeecompany_DB',
  });

  
  connection.connect((err) => {
    if (err) throw err;
    runSearch();
  });

  const runSearch = () => {
    inquirer
      .prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
          'View All Employees',
          'View All Employees By Department',
          'View All Employees By Manager',
          'Add Employee',
          'Remove Employee',
          'Update Employee Role',
          'Update Employee Manager',
          'Exit',
        ],
      })
      .then((answer) => {
        switch (answer.action) {
          case 'View All Employees':
            viewEmployees();
            break;

            case 'View All Employees By Department':
            viewEmployeeByDept();
            break;

            case 'View All Employees By Manager': 
            viewEmployeeByManager();
            break;

            case 'Add Employee': 
            addEmployee();
            break;

            case 'Remove Employee': 
            removeEmployee();
            break;

            case 'Update Employee Role': 
            updateEmployeeRole();
            break;
            
            case 'Update Employee Manager':
            updateEmployeeManager();
            break;

            case 'Exit': 
            connection.end();
            break; 
            default:

          console.log(`Invalid action: ${answer.action}`);
          break;
          }
        });
    };

    const viewEmployees = () => {
      inquirer
      .prompt({
        name: 'viewEmployees',
        type: 'input',
        message: 'Which Employee would you like to select?',
      })
      .then((answer) => {
        const query = "SELECT first_name, last_name, id FROM employee WHERE ?";
        connection.query(query, { last_name: answer.viewEmployees }, function (err, res) {
          for (var i = 0; i < res.length; i++) {
            console.log("First Name: " + res[i].first_name + " || Last name: " + res[i].last_name + " || Id: " + res[i].id);
          }
  
          runSearch();
        });
      });
  }
//   const viewEmployeeByDept = () => {
//     inquirer
//     .prompt({
//       name: 'Department',
//       type: 'input',
//       message: 'Type which Department?',
     
//     })
//     .then((answer) => {
//     const query = "SELECT name FROM department";
//     connection.query(query, function (err, res) {
//       for (var i = 0; i < res.length; i++) {
//         console.log(res[i].name);
//       };
//       runSearch();
//     });
//   });
// }

// const viewEmployeeByManager = () => {
//   const query = "SELECT id, first_name, last_name FROM Employee WHERE id IN (SELECT manager_id FROM employee WHERE manager_id IS NOT NULL)";
//   connection.query(query, function (err, res) {
//     for (var i = 0; i < res.length; i++) {
//       console.log(res[i].first_name + " " + res[i].last_name + " || Id: " + res[i].id);
//     }

//     runSearch();
//   });
// }