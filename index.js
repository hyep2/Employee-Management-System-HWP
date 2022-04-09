const db = require('./db');
const inquirer = require('inquirer');
const { init } = require('express/lib/application');

function initQuestion() {
  inquirer.prompt([
    {
      message: 'What would you like to do?',
      type: 'list',
      choices: ['View departments', 'View roles', 'View employees', 'Add departments', 'Add roles', 'Add employees', 'Update employee role', 'Nothing'],
      name: 'ans'
    }
  ])
    .then(init => {
      switch (init.ans) {
        case 'View departments': {
          viewDepartments();
          break;
        }
        case 'View roles': {
          viewRoles();
          break;
        }
        case 'View employees': {
          viewEmployees();
          break;
        }
        case 'Add departments': {
          addDepartment();
          break;
        }
        case 'Add roles': {
          addRoles();
          break;
        }
        case 'Add employees': {
          addEmployees();
          break;
        }
        case 'Update employee role': {
          updateRole();
          break;
        }
        default: {
          console.log('GoodBye!')
          break;
        }
      }
    })
}
initQuestion();

//VIEWING FUNCTIONS
function viewDepartments() {
  db.query('SELECT department.id, department.name FROM department', (err, departments) => {
    if(err) {console.log(err)}
    console.log('\n');
    console.table(departments)
    initQuestion();
  })
}

function viewRoles() {
  db.query('SELECT role.id, role.title, role.salary, department.name AS department FROM role JOIN department ON role.department_id = department.id', (err, roles) => {
    if(err) {console.log(err)}
    console.log('\n');
    console.table(roles);
    initQuestion();
  })
}

function viewEmployees() {
  db.query('SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, department.name AS department, employee.manager_id FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id ', (err, employees) => {
    if (err) {console.log(err)}
    console.log('\n');
    console.table(employees);
    initQuestion();
  })
}

//ADDING FUNCTIONS
function addDepartment() {
  inquirer.prompt([{
    message: "What is the name of the department you would like to add?",
    type: 'input',
    name: 'name'
  }])
    .then(department => {
      db.query('INSERT INTO department SET ?', department, err => {
        if (err) { console.log(err) }
      })
      console.log(`${department.name} department added!`)
      initQuestion();

    })
}

function addRoles() {
  inquirer.prompt([
    {
      message: "What is the title of the role you would like to add?",
      type: 'input',
      name: 'title'
    },
    {
      message: "What is the salary of the role you would like to add?",
      type: 'input',
      name: 'salary'
    },
    {
      message: "What is the id of department of the role you would like to add?",
      type: 'input',
      name: 'department_id'
    } ])
    .then(role => {
      db.query('INSERT INTO role SET ?', role, err => {
        if (err) { console.log(err) }
      })
      console.log(`${role.title} added!`)
      initQuestion();
    })
}

function addEmployees() {
  inquirer.prompt([
    {
      message: "What is the first name of the employee you would like to add?",
      type: 'input',
      name: 'first_name'
    },
    {
      message: "What is the last name of the employee you would like to add?",
      type: 'input',
      name: 'last_name'
    },
    {
      message: "What is the id of role of the employee you would like to add?",
      type: 'input',
      name: 'role_id'
    },
    {
      message: "Is the employee a manager?",
      type: 'list',
      choices: ['yes', 'no'],
      name: 'isManager' 
    }
  ])
    .then(employee => {
      if (employee.isManager==='yes') {
        delete employee.isManager;
        db.query('INSERT INTO employee SET ?', employee, err => {
          if (err) { console.log(err) }
        })
        console.log('This employee does not have a manager')
        initQuestion();
      }
      if (employee.isManager === 'no') 
        inquirer.prompt([{
          message: 'What is the id of the manager of the employee?',
          type: 'input',
          name: 'manager_id'
        }])
          .then(hasManager => {
            delete employee.isManager;
            //combine the two objects together w SPREAD OPERATOR
            let combinedEmployee = {
              ...employee,
              ...hasManager
            }
            db.query('INSERT INTO employee SET ?', combinedEmployee, err => {
              if (err) { console.log(err) }
            })
            console.log(`Employee added!`)
            initQuestion();
          })
    })
}

//UPDATE EMPLOYEE ROLE
function updateRole() {
  inquirer.prompt([
    {
      message: 'What is the id of the employee you would like to update?',
      type: 'input',
      name: 'id'
    },
    {
      message: 'What is the id of the role you would like to change the employee to?',
      type: 'input',
      name: 'role_id'
    }
])
  .then (employee => {
    let newRole = {
      role_id: employee.role_id
    }
    db.query(`UPDATE employee SET ? WHERE id = ${employee.id}`, newRole, err=> {console.log(err)})
    console.log('Employee role has been updated!');
    initQuestion();
  }
  )
}
