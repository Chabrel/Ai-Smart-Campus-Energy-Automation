CREATE DATABASE IF NOT EXISTS smart_campus;
USE smart_campus;

<<<<<<< HEAD
=======
-- -----------------------------------------------------
-- Table: departments
-- -----------------------------------------------------
>>>>>>> origin/backend-development
CREATE TABLE departments (
    department_id INT AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL
);

<<<<<<< HEAD
=======
-- -----------------------------------------------------
-- Table: employees
-- -----------------------------------------------------
>>>>>>> origin/backend-development
CREATE TABLE employees (
    employee_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    department_id INT,
    skill VARCHAR(100),
    availability BOOLEAN DEFAULT TRUE,
    workload INT DEFAULT 0,
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);

<<<<<<< HEAD
=======
-- -----------------------------------------------------
-- Table: devices
-- -----------------------------------------------------
>>>>>>> origin/backend-development
CREATE TABLE devices (
    device_id INT AUTO_INCREMENT PRIMARY KEY,
    device_name VARCHAR(100) NOT NULL,
    device_type VARCHAR(100),
    building VARCHAR(100),
    floor VARCHAR(50),
    room VARCHAR(50),
    status VARCHAR(50) DEFAULT 'Normal'
);

<<<<<<< HEAD
=======
-- -----------------------------------------------------
-- Table: rooms
-- -----------------------------------------------------
CREATE TABLE rooms (
    room_id INT AUTO_INCREMENT PRIMARY KEY,
    room_name VARCHAR(100) NOT NULL,
    building VARCHAR(100),
    occupancy INT DEFAULT 0,
    temperature FLOAT DEFAULT 25.0,
    humidity FLOAT DEFAULT 50.0,
    light_level FLOAT DEFAULT 300.0,
    power_usage FLOAT DEFAULT 0.0,
    lights_status VARCHAR(50) DEFAULT 'OFF',
    ac_status VARCHAR(50) DEFAULT 'OFF',
    fan_status VARCHAR(50) DEFAULT 'OFF',
    status VARCHAR(50) DEFAULT 'EMPTY'
);

-- -----------------------------------------------------
-- Table: tickets
-- -----------------------------------------------------
>>>>>>> origin/backend-development
CREATE TABLE tickets (
    ticket_id INT AUTO_INCREMENT PRIMARY KEY,
    device_id INT,
    department_id INT,
    employee_id INT,
    issue VARCHAR(255),
    priority VARCHAR(50),
    status VARCHAR(50) DEFAULT 'Open',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (device_id) REFERENCES devices(device_id),
    FOREIGN KEY (department_id) REFERENCES departments(department_id),
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);

-- -----------------------------------------------------
-- Table: sensor_readings
-- -----------------------------------------------------
CREATE TABLE sensor_readings (
    reading_id INT AUTO_INCREMENT PRIMARY KEY,
    device_id INT,
    temperature FLOAT,
    humidity FLOAT,
    light_level FLOAT,
    energy_usage FLOAT,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (device_id) REFERENCES devices(device_id)
<<<<<<< HEAD
);
=======
);

-- -----------------------------------------------------
-- Table: automation_rules
-- -----------------------------------------------------
CREATE TABLE automation_rules (
    rule_id INT AUTO_INCREMENT PRIMARY KEY,
    rule_name VARCHAR(100) NOT NULL,
    condition_type VARCHAR(100) NOT NULL,
    threshold_value VARCHAR(50),
    enabled BOOLEAN DEFAULT TRUE
);

-- -----------------------------------------------------
-- Seed Data
-- -----------------------------------------------------

-- Departments
INSERT INTO departments (department_id, department_name) VALUES
(1, 'HVAC / Electrical'),
(2, 'IT / AV'),
(3, 'Plumbing / Water');

-- Employees
INSERT INTO employees (employee_id, name, department_id, skill, availability, workload) VALUES
(1, 'Amit Shah', 1, 'HVAC / AC Repair', TRUE, 0),
(2, 'Rahul Patel', 2, 'AV/Projector Repair', TRUE, 0),
(3, 'Priya Sharma', 1, 'Electrical/Wiring', TRUE, 0),
(4, 'Vikram Singh', 3, 'Plumbing', TRUE, 0);

-- Devices
INSERT INTO devices (device_id, device_name, device_type, building, floor, room, status) VALUES
(1, 'Projector P-A204', 'Projector', 'A Block', '2nd Floor', 'A-204', 'Normal'),
(2, 'AC A-102', 'AC', 'A Block', '1st Floor', 'A-102', 'Normal'),
(3, 'Smart Light L-LAB02', 'Lighting', 'Science Block', 'Ground Floor', 'LAB-02', 'Normal'),
(4, 'Water Pump WP-01', 'Pump', 'Main Utility', 'Ground Floor', 'Utility Room', 'Normal');

-- Rooms
INSERT INTO rooms (room_id, room_name, building, occupancy, temperature, humidity, light_level, power_usage, lights_status, ac_status, fan_status, status) VALUES
(1, 'A-101', 'A Block', 42, 27.0, 58.0, 420.0, 5.4, 'ON', 'ON', 'ON', 'OCCUPIED'),
(2, 'A-102', 'A Block', 0, 25.0, 56.0, 250.0, 0.8, 'OFF', 'ECO', 'OFF', 'EMPTY'),
(3, 'A-103', 'A Block', 38, 26.0, 59.0, 380.0, 4.9, 'ON', 'ON', 'ON', 'OCCUPIED'),
(4, 'LAB-02', 'Science Block', 18, 29.0, 65.0, 400.0, 7.1, 'ON', 'OFF', 'ON', 'FAULT');

-- Automation Rules
INSERT INTO automation_rules (rule_id, rule_name, condition_type, threshold_value, enabled) VALUES
(1, 'Empty Room Lights Off', 'OCCUPANCY_ZERO', NULL, TRUE),
(2, 'Empty Room AC Eco', 'HIGH_TEMPERATURE_EMPTY', '28', TRUE),
(3, 'Energy Spike Alert', 'ENERGY_SPIKE', '10', TRUE),
(4, 'Automatic Fault Ticket', 'DEVICE_FAULT', NULL, TRUE);
>>>>>>> origin/backend-development
