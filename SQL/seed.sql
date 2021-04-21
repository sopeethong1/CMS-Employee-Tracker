
USE sopeecompany_DB;

INSERT INTO department(id, name)
VALUES 
(111, "Engineering"),
(222, "Aquisitions"),
(444, "Sales"),
(555, "Finance"),
(667, "CustomerSuccess");

INSERT INTO role(id, title, salary, department_id)
VALUES 
(1, "Sr. Software Engineer", 200000,111),
(2, "Lawyer", 150000, 222),
(3, "Consultant", 150000, 222), 
(4, "Manager", 100000, 444),
(5, "Engineer", 90000, 111),
(6, "Analyst", 90000, 111),
(7, "Accountant", 80000, 555),
(8, "Manager", 105000, 555),
(9, "Jr. Software Engineer", 70000, 111),
(10, "Customer Success Manager", 85000, 667);

INSERT INTO employee(id, first_name, last_name, role_id, manager_id)
VALUES 
(11, "Sopee", "Thong", 1, 0),
(12, "Tommy", "Thong", 2, 0),
(13, "Labat", "Yancey", 3, 2),
(14, "Sandy", "Ho", 4, 8),
(15, "Sebastian", "Issa", 5, 1),
(16, "Asher", "Jones", 6, 8),
(17, "Dara", "Inthamone", 7, 8),
(18, "Jonsie", "Jones", 8, 0),
(19, "Sayan", "Marcella", 9, 1),
(21, "Paulina", "Cohen", 10, 4);
