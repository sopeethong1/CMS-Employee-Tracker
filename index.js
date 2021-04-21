  
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
        name: 'Employee',
        type: 'list',
        message: 'Which Employee would you like to select?',
      })
      .then((answer) => {
      const query = 'SELECT Employee.first_name, Employee.last_name FROM Employee';
      connection.query(query, { employee: answer.employee}, (err, res) => {
        res.forEach(({ first_name, last_name }) => {
          console.log(
            `Employee: ${first_name} || Employee: ${last_name}`
          );
        });
        runSearch();
      });
    });
};