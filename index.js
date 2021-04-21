const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: 'root',
  
    // Be sure to update with your own MySQL password!
    password: 'Target03!',
    database: 'top_songsDB',
  });

  
  connection.connect((err) => {
    if (err) throw err;
    runSearch();
  });

  const fullView = [
    'View All Employees',
    'View All Employees By Department',
    'View All Employees By Manager',
    'Add Employee',
    'Remove Employee',
    'Update Employee Role',
    'Update Employee Manager',
    "Exit"

];

const employeeList = [
  "Sopee Thong",
  "Tommy Thong",
  "Labat Yancey",
  "Sandy Ho",
  "Sebastian Issa",
  "Asher Jones",
  "Dara Inthamone",
  "Jonsie Jones",
  "Sayan Marcella",
  "Paulina Cohen"
];

const employeeUpdateOptions = [
  "Update Employee First Name",
  "Update Employee Last Name",
  "Update Employee Role",
  "Exit Update"
];
  // command-line that allows user to view departments, roles, and employees
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
          'Exit'
        ],
      })
      .then((answer) => {
        switch (answer.action) {
          case fullView[0]: viewEmployees();
            break;

            case fullView[1]: viewEmployeeByDept();
            break;

            case fullView[2]: viewEmployeeByManager();
            break;

            case fullView[3]: addEmployee();
            break;

            case fullView[4]: removeEmployee();
            break;

            case fullView[5]: updateEmployeeRole();
            break;
            
            case fullView[6]: updateEmployeeManager();
            break;

            case fullView[7]: connection.end();
            break; 
          }
        })
    }
