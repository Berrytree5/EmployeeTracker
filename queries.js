const db = require('./db');

class EmployeeQueries {
  static async getAllEmployees() {
    // Implement and return a query to get all employees
    const [rows] = await db.query('SELECT * FROM employee');
    return rows;
  }

  static async addEmployee(employeeData) {
    // Implement and return a query to add a new employee
    await db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [
      employeeData.firstName,
      employeeData.lastName,
      employeeData.roleId,
      employeeData.managerId,
    ]);
  }

  static async updateEmployeeRole(employeeId, newRoleId) {
    // Implement and return a query to update an employee's role
    await db.query('UPDATE employee SET role_id = ? WHERE id = ?', [newRoleId, employeeId]);
  }
}

module.exports = EmployeeQueries;
