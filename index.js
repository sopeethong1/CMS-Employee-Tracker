  
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
          'View Departments',
          'View Roles',
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

            case 'View Departments':
            viewDept();
            break;

            case 'View Roles': 
            viewRoles();
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
      const query = `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
      FROM employee e
      LEFT JOIN role r
      ON e.role_id = r.id
      LEFT JOIN department d
      ON d.id = r.department_id
      LEFT JOIN employee m
      ON m.id = e.manager_id`;
    
      connection.query(query, (err, res) => {
        if (err) throw err;
    
        console.table(res);
        runSearch();
      });
    }
    const viewEmployeeByDept = () => {
      var query = "SELECT * FROM department";
        connection.query(query, function(err, res) {
            console.log(`DEPARTMENTS:`)
          res.forEach(department => {
              console.log(`ID: ${department.id} | Name: ${department.name}`)
          })
          runSearch();
          });
      };