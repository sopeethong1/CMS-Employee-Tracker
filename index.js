  
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
          'Update Employee Department',
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
            
            case 'Update Employee Department':
            updateEmployeeDept();
            break;

            case 'Exit': 
            connection.end();
            break; 
            default:
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
    const  viewDept = () => {
      var query = "SELECT * FROM department";
        connection.query(query, function(err, res) {
            console.log(`DEPARTMENTS:`)
          res.forEach(department => {
              console.log(`ID: ${department.id} | Name: ${department.name}`)
          })
          runSearch();
          });
      };

      const viewRoles = () => {
        const query = "SELECT * FROM role";
          connection.query(query, function(err, res) {
              console.log(`Role:`)
            res.forEach(role => {
                console.log(`ID: ${role.id} | Title: ${role.title}`)
            })
            runSearch();
            });
        };

        const addEmployee = () => {
            connection.query('SELECT * FROM role', function (err, res) {
                if (err) throw err;
                inquirer
                    .prompt([
                        {
                            name: 'first_name',
                            type: 'input', 
                            message: "What is the employee's first name? ",
                        },
                        {
                            name: 'last_name',
                            type: 'input', 
                            message: "What is the employee's last name? "
                        },
                        {
                            name: 'manager_id',
                            type: 'input', 
                            message: "What is the employee's manager's ID? "
                        },
                        {
                            name: 'role', 
                            type: 'list',
                            choices: function() {
                            var roleArray = [];
                            for (let i = 0; i < res.length; i++) {
                                roleArray.push(res[i].title);
                            }
                            return roleArray;
                            },
                            message: "What is this employee's role? "
                        }
                        ]).then(function (answer) {
                            let role_id;
                            for (let a = 0; a < res.length; a++) {
                                if (res[a].title == answer.role) {
                                    role_id = res[a].id;
                                    console.log(role_id)
                                }                  
                            }  
                            connection.query(
                            'INSERT INTO employee SET ?',
                            {
                                first_name: answer.first_name,
                                last_name: answer.last_name,
                                manager_id: answer.manager_id,
                                role_id: role_id,
                            },
                            function (err) {
                                if (err) throw err;
                                console.log('Your employee has been added!');
                                runSearch();
                            })
                        })
                })
        };
      
        const updateEmployeeDept = () =>{
            inquirer
                .prompt([
                    {
                        name: 'newDepartment', 
                        type: 'input', 
                        message: 'Which department would you like to add?'
                    }
                    ]).then(function (answer) {
                        connection.query(
                            'INSERT INTO department SET ?',
                            {
                                name: answer.newDepartment
                            });
                        var query = 'SELECT * FROM department';
                        connection.query(query, function(err, res) {
                        if(err)throw err;
                        console.log('Your department has been added!');
                        console.table('All Departments:', res);
                        runSearch();
                        })
                    })
        };
        
      
        const updateEmployeeRole = () => {
            connection.query('SELECT * FROM department', function(err, res) {
                if (err) throw err;
            
                inquirer 
                .prompt([
                    {
                        name: 'new_role',
                        type: 'input', 
                        message: "What new role would you like to add?"
                    },
                    {
                        name: 'salary',
                        type: 'input',
                        message: 'What is the salary of this role? (Enter a number)'
                    },
                    {
                        name: 'Department',
                        type: 'list',
                        choices: function() {
                            var deptArry = [];
                            for (let i = 0; i < res.length; i++) {
                            deptArry.push(res[i].name);
                            }
                            return deptArry;
                        },
                    }
                ]).then(function (answer) {
                    let department_id;
                    for (let a = 0; a < res.length; a++) {
                        if (res[a].name == answer.Department) {
                            department_id = res[a].id;
                        }
                    }
            
                    connection.query(
                        'INSERT INTO role SET ?',
                        {
                            title: answer.new_role,
                            salary: answer.salary,
                            department_id: department_id
                        },
                        function (err, res) {
                            if(err)throw err;
                            console.log('Your new role has been added!');
                            console.table('All Roles:', res);
                            runSearch();
                        })
                })
            })
        };
        
       