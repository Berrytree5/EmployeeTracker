const inquirer = require('inquirer');
const EmployeeQueries = require('./queries'); // Import your query functions

async function startApp() {
  try {
   
    console.log('Employee Tracker Application');

    // Example: View all employees
    const employees = await EmployeeQueries.getAllEmployees();
    console.table(employees);

    // Example: Add a new employee
    const employeeData = await inquirer.prompt([
      // Inquirer prompts for employee data (first name, last name, role, manager)
    ]);
    await EmployeeQueries.addEmployee(employeeData);

    // Example: Update an employee's role
    const employeeToUpdate = await inquirer.prompt([
      // Inquirer prompt to select an employee to update
    ]);
    const newRole = await inquirer.prompt([
      // Inquirer prompt for the new role
    ]);
    await EmployeeQueries.updateEmployeeRole(employeeToUpdate.employeeId, newRole.roleId);
  } catch (error) {
    console.error('Error:', error);
  }
}

startApp();
