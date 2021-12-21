// import requirements 
const inquirer = require('inquirer');
const db = require('./db/connection');

db.connect(err => {
    if(err) throw err;
    console.log('Database connected.');
    promptUser();
})
// prompt user 
const promptUser = () => {
    console.log(`
    ==========================
    🄴🄼🄿🄻🄾🅈🄴🄴 🅃🅁🄰🄲🄺🄴🅁
    ==========================
    `)
    return inquirer
        .prompt([
            {
                type: 'list',
                name: 'choices',
                message: 'What would you like do to?',
                choices: ['View All Departments', 'View All Roles', 'View all Employees', 'Add a Department', 
                'Add a Role', 'Add an Employee', 'Update Employee', 'Update Manager', 'View Employees by Manager',
                'View Employees by Department', 'Delete Department', 'Delete Role', 'Delete Employee', 'View Department Budget Utilization']
            }
        ])
}

    // then enter if statements based on what they want to do 
    // call indivitual action functions 



// view all departments 

// view all roles 

// view all employees 

// add a department 

// add a role 

// add an employee 

// update employee 

// up manager 

// view employees by manager 

// view employees by department 

// delete departments

// delete roles 

// delete employees 

// view budget
