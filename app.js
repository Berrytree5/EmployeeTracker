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
        default:
          console.log('Invalid option. Please select a valid action.');
          mainMenu(); // Show the menu again
          break;
      }
    });
}

async function viewAllDepartments() {
  try {
    const departments = await EmployeeQueries.getAllDepartments();
    console.table(departments);
  } catch (err) {
    console.error('Error fetching departments:', err);
  }
  mainMenu(); // Show the menu again
}

async function viewAllRoles() {
  try {
    const roles = await EmployeeQueries.getAllRoles();
    console.table(roles);
  } catch (err) {
    console.error('Error fetching roles:', err);
  }
  mainMenu(); // Show the menu again
}

async function viewAllEmployees() {
  try {
    const employees = await EmployeeQueries.getAllEmployees();
    console.table(employees);
  } catch (err) {
    console.error('Error fetching employees:', err);
  }
  mainMenu(); // Show the menu again
}

async function addDepartment() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter the name of the department:',
        validate: (input) => {
          if (input.trim() === '') {
            return 'Department name cannot be empty.';
          }
          return true;
        },
      },
    ])
    .then(async (answers) => {
      try {
        const existingDepartments = await EmployeeQueries.getAllDepartments();
        const departmentExists = existingDepartments.some((department) => department.name === answers.name);

        if (departmentExists) {
          console.log('Department already exists.');
        } else {
          await EmployeeQueries.addDepartment(answers.name);
          console.log(`Department "${answers.name}" added successfully.`);
        }
      } catch (err) {
        console.error('Error adding department:', err);
      }
      mainMenu(); // Show the menu again
    });
}

async function addRole() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Enter the title of the role:',
        validate: (input) => {
          if (input.trim() === '') {
            return 'Role title cannot be empty.';
          }
          return true;
        },
      },
      {
        type: 'input',
        name: 'salary',
        message: 'Enter the salary for the role:',
        validate: (input) => {
          if (isNaN(input) || parseFloat(input) <= 0) {
            return 'Invalid salary. Please enter a positive number.';
          }
          return true;
        },
      },
      {
        type: 'input',
        name: 'departmentId',
        message: 'Enter the department ID for the role:',
        validate: async (input) => {
          const departments = await EmployeeQueries.getAllDepartments();
          const departmentIds = departments.map((department) => department.id);

          if (!departmentIds.includes(parseInt(input))) {
            return 'Invalid department ID. Please enter a valid department ID.';
          }
          return true;
        },
      },
    ])
    .then(async (answers) => {
      try {
        await EmployeeQueries.addRole(answers.title, parseFloat(answers.salary), parseInt(answers.departmentId));
        console.log(`Role "${answers.title}" added successfully.`);
      } catch (err) {
        console.error('Error adding role:', err);
      }
      mainMenu(); // Show the menu again
    });
}

async function addEmployee() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'firstName',
        message: "Enter the employee's first name:",
        validate: (input) => {
          if (input.trim() === '') {
            return "First name cannot be empty.";
          }
          return true;
        },
      },
      {
        type: 'input',
        name: 'lastName',
        message: "Enter the employee's last name:",
        validate: (input) => {
          if (input.trim() === '') {
            return "Last name cannot be empty.";
          }
          return true;
        },
      },
      {
        type: 'input',
        name: 'roleId',
        message: 'Enter the role ID for the employee:',
        validate: async (input) => {
          const roles = await EmployeeQueries.getAllRoles();
          const roleIds = roles.map((role) => role.id);

          if (!roleIds.includes(parseInt(input))) {
            return 'Invalid role ID. Please enter a valid role ID.';
          }
          return true;
        },
      },
      {
        type: 'input',
        name: 'managerId',
        message: "Enter the manager's ID (or leave blank if there's no manager):",
        validate: async (input) => {
          if (input.trim() === '') {
            return true; // No manager, so no validation needed
          }

          const employees = await EmployeeQueries.getAllEmployees();
          const employeeIds = employees.map((employee) => employee.id);

          if (!employeeIds.includes(parseInt(input))) {
            return 'Invalid manager ID. Please enter a valid manager ID or leave it blank.';
          }
          return true;
        },
      },
    ])
    .then(async (answers) => {
      try {
        await EmployeeQueries.addEmployee(
          answers.firstName,
          answers.lastName,
          parseInt(answers.roleId),
          answers.managerId ? parseInt(answers.managerId) : null
        );
        console.log(`Employee "${answers.firstName} ${answers.lastName}" added successfully.`);
      } catch (err) {
        console.error('Error adding employee:', err);
      }
      mainMenu(); // Show the menu again
    });
}

async function updateEmployeeRole() {
  // Implementation for updating an employee's role
}

mainMenu();
