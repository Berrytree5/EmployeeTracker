const inquirer = require('inquirer');
const EmployeeQueries = require('./queries');

function mainMenu() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'Select an action:',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          'Exit',
        ],
      },
    ])
    .then(async (answers) => {
      switch (answers.action) {
        case 'View all departments':
          await viewAllDepartments();
          break;
        case 'View all roles':
          await viewAllRoles();
          break;
        case 'View all employees':
          await viewAllEmployees();
          break;
        case 'Add a department':
          await addDepartment();
          break;
        case 'Add a role':
          await addRole();
          break;
        case 'Add an employee':
          await addEmployee();
          break;
        case 'Update an employee role':
          await updateEmployeeRole();
          break;
        case 'Exit':
          console.log('Exiting the application.');
          process.exit();
          break;
      }
      mainMenu();
    });
}

async function viewAllDepartments() {

}

async function viewAllRoles() {
  
}

async function viewAllEmployees() {
  
}

async function addDepartment() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter the name of the department:',
      },
    ])
    .then(async (answers) => {
    
    });
}

async function addRole() {
  // User fills out role information
}

async function addEmployee() {
  // User fills out Add Employee prompt
}

async function updateEmployeeRole() {
  // User updates employee role when prompted
}

mainMenu();
