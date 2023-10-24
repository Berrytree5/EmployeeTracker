-- Insert departments
INSERT INTO departments (name) VALUES
  ('Department 1'),
  ('Department 2');

-- Insert roles
INSERT INTO roles (title, salary, department_id) VALUES
  ('Role 1', 50000, 1),
  ('Role 2', 60000, 2);

-- Insert employees
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
  ('John', 'Doe', 1, NULL),
  ('Jane', 'Smith', 2, 1);
