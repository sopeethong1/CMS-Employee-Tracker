
USE sopee_companyDB;

INSERT INTO department(id, name)
VALUES 
(10, Engineering),
(20, Aquisitions),
(40, Sales),
(50, Engineering),
(70, Finance),
(80, CustomerSuccess);

INSERT INTO role(id, title, salary, department_id)
VALUES 
(100, Sr. SoftwareEngineer, 200000, 10),
(800, Lawyer, 150000, 20),
(650, Consultant, 150000, 20), 
(550, Manager, 100000, 40),
(450, Engineer, 90000, 10),
(450, Engineer, 90000, 10),
(850, Accountant, 80000, 70),
(900, Manager, 105000, 70),
(400, Jr. SoftwareEngineer, 70000, 10),
(300, CustomerSuccessManager, 85000, 80);

INSERT INTO employee(id, first_name, last_name, role_id, manager_id)
VALUES 
(1, Sopee, Thong, 100),
(2, Tommy, Thong, 800),
(3, Labat, Yancey, 650, 800),
(4, Sandy, Ho, 550, 900),
(5, Sebastian, Issa, 450, 100),
(6, Asher, Jones, 450, 100),
(7, Dara, Inthamone, 850, 900),
(8, Jonsie, Jones, 900),
(9, Sayan, Marcella, 400, 100),
(10, Paulina, Cohen, 300, 900);
