const db = require('./db');

class EmployeeQueries {
  static async getAllDepartments() {
    try {
      const [departments] = await db.execute('SELECT id, name FROM departments');
      return departments;
    } catch (err) {
      console.error('Error fetching departments:', err);
      return [];
    }
  }

  static async getAllRoles() {
    try {
      const [roles] = await db.execute(`
        SELECT roles.id, roles.title, roles.salary, departments.name AS department
        FROM roles
        INNER JOIN departments ON roles.department_id = departments.id
      `);
      return roles;
    } catch (err) {
      console.error('Error fetching roles:', err);
      return [];
    }
  }

  static async getAllEmployees() {
    try {
      const [employees] = await db.execute(`
        SELECT employees.id, employees.first_name, employees.last_name, roles.title AS job_title, 
          departments.name AS department, roles.salary, CONCAT(managers.first_name, ' ', managers.last_name) AS manager
        FROM employees
        LEFT JOIN roles ON employees.role_id = roles.id
        LEFT JOIN departments ON roles.department_id = departments.id
        LEFT JOIN employees AS managers ON employees.manager_id = managers.id
      `);
      return employees;
    } catch (err) {
      console.error('Error fetching employees:', err);
      return [];
    }
  }

  static async addDepartment(name) {
    try {
      await db.execute('INSERT INTO departments (name) VALUES (?)', [name]);
      console.log('Department added successfully.');
    } catch (err) {
      console.error('Error adding department:', err);
    }
  }

  static async addRole(title, salary, departmentId) {
    try {
      await db.execute('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, departmentId]);
      console.log('Role added successfully.');
    } catch (err) {
      console.error('Error adding role:', err);
    }
  }

  static async addEmployee(firstName, lastName, roleId, managerId) {
    try {
      await db.execute('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [
        firstName,
        lastName,
        roleId,
        managerId,
      ]);
      console.log('Employee added successfully.');
    } catch (err) {
      console.error('Error adding employee:', err);
    }
  }

  static async updateEmployeeRole(employeeId, newRoleId) {
    try {
      await db.execute('UPDATE employees SET role_id = ? WHERE id = ?', [newRoleId, employeeId]);
      console.log('Employee role updated successfully.');
    } catch (err) {
      console.error('Error updating employee role:', err);
    }
  }
}

module.exports = EmployeeQueries;
