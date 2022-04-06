USE employeetracker_db;

INSERT INTO department (name)
VALUES
  ('Emergency'),
  ('MedSurg'), 
  ('Pediatrics'), 
  ('Ortho');

INSERT INTO role (title, salary, department_id)
VALUES 
  ('RN', 100000, 1),
  ('DO', 150000, 1),
  ('Head Nurse', 120000, 2),
  ('Surgeon', 200000, 2),
  ('HR', 80000, 3),
  ('Pediatrician', 150000, 3),
  ('Surgeon', 300000, 4),
  ('Ortho doctor', 180000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('John', 'Doe', 1, NULL),
  ('Bill', 'Lee', 2, 1),
  ('Tom', 'Brown', 3, NULL),
  ('Andy', 'Sanchez', 4, 3),
  ('Kimberly', 'Singh', 5, NULL),
  ('Helen', 'Kelles', 6, 5),
  ('Sarah', 'Allen', 7, NULL),
  ('Ben', 'Kim', 8, 7);
