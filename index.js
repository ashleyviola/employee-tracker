// import requirements 
const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection');

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
            if (choices === 'View All Employees'){
                console.log('View all Employees Selected');
                viewEmployees();
            }
            if (choices === 'Add a Department'){
                console.log('Add a Department Selected');
                addDepartment();
            }
            if (choices === 'Add a Role'){
                console.log('Add a Role Selected');
                addRole();
            }
            if (choices === 'Add an Employee'){
                console.log('Add an Employee Selected');
                addEmployee();
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
    promptUser();
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
    promptUser();
};
// view all employees 
viewEmployees = () => {
    console.log(`
    ==========================
            Employees
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
    promptUser();
};
// add a department 
addDepartment = () => {
    console.log(`
    ==========================
          Add Department
    ==========================
    `);
    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'addDepartment',
                message: 'Input the department to be added.',
                validate: departmentInput => {
                    if(departmentInput){
                        return true;
                    } else {
                        console.log('Please input a department to add.')
                        return false;
                    }
                }
            },
        ])
        .then(answer => {
            const sql = `INSERT INTO departments (name)
                        VALUES(?)`;
            const params = [answer.addDepartment];
            db.query(sql, params, (err, result) => {
                if(err) throw err;
                console.log('Successfully added' + answer.addDepartment + ".");
                promptUser();
        });
    });
};
// add a role 
addRole = () => {
    console.log(`
    ==========================
            Add Role
    ==========================
    `);
   const sql = `SELECT * FROM departments`
   db.query(sql, (err, response) => {
       if(err) throw err;
       let deptNamesArray = [];
       response.forEach((departments) => {
           let deptObj = {
               name: departments.name,
               value: departments.id
           }
           deptNamesArray.push(deptObj);
       });

       return inquirer

       .prompt([
           {
               name: 'departmentName',
               type: 'list',
               message: 'Which department is this new role in?',
               choices: deptNamesArray
           },
           {
                name: 'roleTitle',
                type: 'input',
                message: "What is the new role's title?",
                validate: roleInput => {
                    if(roleInput){
                        return true;
                    } else {
                        console.log('Please input a role to add.')
                        return false;
                    }
                }
           },
           {
               name: 'salary',
               type: 'input',
               message: "What is the new role's salary?",
               validate: salaryInput => {
                    if(!isNaN(salaryInput)){
                        return true;
                    } 
                    else {
                        console.log('Please input a valid salary amount.')
                        return false;
                    }
                }
           }
       ])
       .then(answers => {
            const sql = `INSERT INTO roles (department_id, title, salary)
                        VALUES(?,?,?)`
            const params = [answers.departmentName, answers.roleTitle, answers.salary]
            db.query(sql, params, (err, result) => {
                if(err) throw err;
                console.log('Successfully added ' + answers.roleTitle +'.');
                promptUser();
            })
       })
   });  
};
// add an employee 
addEmployee = () => {
    console.log(`
    ==========================
            Add Role
    ==========================
    `);
    const sql = `SELECT * FROM employees`;

    db.query(sql, (err, res) => {
        if(err) throw err;

        // pull in choices for managers
        const managerChoice = [
            {
                name: 'None',
                value: 0
            }
        ];
        res.forEach(({first_name, last_name, id}) =>{
            managerChoice.push({
                name: first_name + " " + last_name,
                value: id
            });
        });
        // pull in choices for roles
        const sql = `SELECT * FROM roles`;
        db.query(sql, (err, res) => {
            if(err) throw err;
            const roleChoice = [];
            res.forEach(({title, id}) => {
                roleChoice.push({
                    name: title,
                    value: id
                });
            });
            
            return inquirer

            .prompt([
                {
                    type: 'input',
                    name: 'first_name',
                    message: 'What is the employees first name?',
                    validate: fNameInput => {
                        if(fNameInput){
                            return true;
                        } else {
                            console.log('Please input a first name.')
                            return false;
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: 'What is the employees last name?',
                    validate: lNameInput => {
                        if(lNameInput){
                            return true;
                        } else {
                            console.log('Please input a last name.')
                            return false;
                        }
                    }
                },
                {
                    type: 'list',
                    name: 'role_id',
                    message: "What is the employee's role?",
                    choices: roleChoice,
                },
                {
                    type: 'list',
                    name: 'manager_id',
                    message: "Who is the employee's manager? If they don't have a manager select None.",
                    choices: managerChoice
                }
            ])
            .then(answers => {
                const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
                            VALUES(?,?,?,?)`;
                let managerId = answers.manager_id !== 0? answers.manager_id: null;
                const params = [answers.first_name, answers.last_name, answers.role_id, managerId];
                db.query(sql, params, (err, res) => {
                    if(err) throw err;
                    console.log('Successfully added ' + answers.first_name +' ' + answers.last_name + '.');
                promptUser();
                })
            }) 
        })
    })
}
// update employee 

// up manager 

// view employees by manager 

// view employees by department 

// delete departments

// delete roles 

// delete employees 

// view budget
