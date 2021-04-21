DROP DATABASE IF EXISTS sopeecompany_DB;
CREATE database sopeecompany_DB;

USE sopeecompany_DB;

CREATE TABLE department(
  id int NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id int NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE EMPLOYEE (
 id int NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id)
);
SELECT * FROM department;

SELECT * from role;

SELECT * from employee;