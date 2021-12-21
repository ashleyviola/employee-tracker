// import requirements 
const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection');
const { initial } = require('lodash');

db.connect(err => {
    if(err) throw err;
    console.log('Database connected.');
    promptUser();
})

// prompt user function 
const promptUser = () => {
    console.log(`
    ==========================
        EMPLOYEE TRACKER 
    ==========================
    `)
    return inquirer
        .prompt([
            {
                type: 'list',
                name: 'choices',
                message: 'What would you like do to?',
                choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 
                'Add a Role', 'Add an Employee', 'Update Employee', 'Update Manager', 'View Employees by Manager',
                'View Employees by Department', 'Delete Department', 'Delete Role', 'Delete Employee', 'View Department Budget Utilization']
            }
        ])
        .then ((answers) => {
            const {choices} = answers;

            if(choices === 'View All Departments'){
                console.log('View all Departments Selected');
                viewDepartments();  
            }
            if (choices === 'View All Roles'){
                console.log('View All Roles Selected');
                viewRoles();
            }
            if (choices === 'View all Employees'){
                console.log('View all Employees Selected');
                viewEmployees();
            }
            if (choices === 'Add a Department'){
                console.log('Add a Department Selected');
            }
            if (choices === 'Add a Role'){
                console.log('Add a Role Selected');
            }
            if (choices === 'Add an Employee'){
                console.log('Add an Employee Selected');
            }
            if (choices === 'Update Employee'){
                console.log('Update Employee Selected');
            }
            if (choices === 'Update Manager'){
                console.log('View All Roles Selected');
            }
            if (choices === 'View Employees by Manager'){
                console.log('View Employees by Manager Selected');
            }
            if (choices === 'View Employees by Department'){
                console.log('View Employees by Department Selected');
            }
            if (choices === 'Delete Department'){
                console.log('Delete Department Selected');
            }
            if (choices === 'Delete Role'){
                console.log('Delete Role Selected');
            }
            if (choices === 'Delete Employee'){
                console.log('Delete Employee Selected');
            }
            if (choices === 'View Department Budget Utilization'){
                console.log('View Department Budget Utilization Selected');
            }
        })
}

// exit or continue function 
wantToExit = () => {
    inquirer
        .prompt([
            {
                type: 'confirm',
                name:'confirmContinue',
                message: 'Want to view anything else?'
            },
        ])
        .then((answer) => {
            if(answer.confirmContinue) return promptUser();
        });
}

// view all departments 
viewDepartments = () => {
    console.log(`
    ==========================
           Departments 
    ==========================
    `);
    const sql = `SELECT departments.id AS id,
                departments.name as department 
                FROM departments`;
    db.query(sql, (err, rows) => {
        if(err) throw err;
        console.table(rows);
    });
};
// view all roles 
viewRoles = () => {
    console.log(`
    ==========================
              Roles 
    ==========================
    `);
    const sql = `SELECT roles.title AS job_title, roles.id AS id, departments.name AS department, roles.salary AS salary
                FROM roles
                INNER JOIN departments ON roles.department_id=departments.id`;
    db.query(sql, (err, rows) => {
        if(err) throw err;
        console.table(rows);
    });
};
// view all employees 
viewEmployees = () => {
    console.log(`
    ==========================
              Roles 
    ==========================
    `);
    const sql = `SELECT
                    employees.id AS employee_id,
                    employees.first_name,
                    employees.last_name,
                    roles.title AS job_title,
                    departments.name AS department,
                    roles.salary AS salary,
                    CONCAT(manager.first_name, " ", manager.last_name) AS manager
                FROM employees
                INNER JOIN roles ON employees.role_id=roles.id
                INNER JOIN departments ON roles.department_id=departments.id
                LEFT JOIN employees manager ON employees.manager_id=manager.id`;
    db.query(sql, (err, rows) => {
        if(err) throw err;
        console.table(rows);
    });
};
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
