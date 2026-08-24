# AI-Powered Smart Campus Automation & Energy Management System

> Smart Campus. Smarter Energy. Automatic Maintenance.

An AI-powered Smart India Hackathon (SIH) project that combines IoT-based campus monitoring, smart energy automation, automatic fault detection, maintenance ticket creation, department routing, employee assignment, predictive maintenance, and energy prediction.

![Project Status](https://img.shields.io/badge/Status-Prototype-success)
![SIH](https://img.shields.io/badge/Smart%20India%20Hackathon-SIH-orange)
![Frontend](https://img.shields.io/badge/Frontend-HTML%20%7C%20CSS%20%7C%20JavaScript-blue)
![Chart.js](https://img.shields.io/badge/Charts-Chart.js-ff6384)

---

## Problem Statement

Educational campuses consume significant amounts of electricity through classrooms, laboratories, offices, and other facilities. Energy is frequently wasted when electrical appliances remain active in unoccupied rooms.

At the same time, device faults are often reported manually through complaint systems. This creates delays in fault identification, department assignment, employee selection, repair, and maintenance tracking.

---

## Proposed Solution

The Smart Campus Automation System continuously monitors campus rooms and devices using IoT sensors and software-based monitoring.

When an abnormal device condition is detected, the system automatically:

1. Identifies the affected device.
2. Identifies building, floor, and room location.
3. Maps the issue to the responsible maintenance department.
4. Calculates maintenance priority.
5. Selects an available employee based on skill, department, availability, and workload.
6. Creates a maintenance ticket automatically.
7. Sends a notification to the assigned technician.
8. Tracks repair progress and resolution.
9. Stores data for future AI-based predictive maintenance.

For energy management, the system monitors occupancy, temperature, humidity, light intensity, and power consumption to reduce unnecessary energy use automatically.

---

## Key Features

### Smart Energy Automation

- Classroom occupancy monitoring
- Temperature and humidity monitoring
- Ambient light monitoring
- AC, fan, and lighting status monitoring
- Automatic appliance optimization for empty rooms
- Energy-saving estimation
- CO₂ reduction tracking
- Daily, weekly, and monthly energy analytics

### Automated Maintenance

- Automatic fault detection
- Device and location identification
- Automatic department mapping
- Priority calculation
- Automatic employee assignment
- Maintenance ticket generation
- Employee notification simulation
- Ticket status workflow:
  - Detected
  - Assigned
  - In Progress
  - Resolved

### AI-Based Features

- Predictive maintenance simulation
- Device health scoring
- Failure probability estimation
- Expected failure window
- AI-based energy prediction
- Peak demand prediction
- Energy optimization recommendations

### Dashboard Features

- Real-time simulated IoT data
- Smart classroom monitoring
- Device health dashboard
- Department performance analytics
- Technician dashboard
- Alerts center
- Notification bell
- Search and filter support
- Responsive SaaS-style dashboard interface
- Chart.js graphs

---

## Main Automation Workflow

```text
DEVICE
  ↓
REAL-TIME MONITORING
  ↓
ABNORMAL CONDITION DETECTED
  ↓
FAULT IDENTIFIED
  ↓
DEVICE LOCATION IDENTIFIED
  ↓
DEPARTMENT IDENTIFIED
  ↓
PRIORITY CALCULATED
  ↓
AVAILABLE EMPLOYEE SELECTED
  ↓
MAINTENANCE TICKET CREATED
  ↓
EMPLOYEE NOTIFIED
  ↓
REPAIR
  ↓
RESOLUTION
  ↓
HISTORICAL DATA FOR AI PREDICTION
```

---

## Energy Automation Workflow

```text
Occupancy + Temperature + Light + Energy Consumption
  ↓
Decision Engine
  ↓
Automatic Appliance Control
  ↓
Energy Saving
  ↓
Analytics and Reporting
  ↓
AI Energy Prediction
```

---

## Technology Stack

| Layer | Technologies | Status |
|---|---|---|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript | Implemented (Prototype UI) |
| **Charts** | Chart.js | Implemented |
| **Icons** | Font Awesome | Implemented |
| **Backend** | Python, Flask, REST API | Implemented |
| **Database** | MySQL | Implemented (Schema provided) |
| **AI/ML** | Python (Simulated predictive/rule logic) | Implemented in Backend |
| **IoT Hardware** | ESP32, PIR, DHT22, LDR, Energy Sensor, Relay Module | Suggested for Demo |

---

## Hardware Components

| Component | Purpose |
|---|---|
| ESP32 | Main Wi-Fi-enabled IoT controller |
| PIR Sensor | Occupancy and motion detection |
| DHT22 | Temperature and humidity measurement |
| LDR | Ambient light intensity measurement |
| Energy Sensor | Power and energy-consumption monitoring |
| Relay Module | Demonstration control of safe, suitable loads |

> **Safety Note:** This project is a software and prototype presentation. Do not use unsafe direct mains wiring. Use proper electrical isolation, safe demonstration loads, and qualified guidance for hardware integration.

---

## Project Structure

```text
ai-smart-campus-energy-automation/
│
├── index.html          # Main dashboard frontend interface
├── Style.css           # Custom styling for frontend dashboard
├── Script.js           # Frontend client-side logic and simulated state
├── chart.html          # Demo page showcasing standalone Chart.js analytics
├── package-lock.json
├── README.md
│
└── backend/            # Python Flask Backend
    ├── app.py          # Main Flask API and automation rules engine
    ├── database.py     # MySQL connection configuration
    ├── schema.sql      # Database schema and seed data SQL
    ├── requirements.txt# Python package dependencies list
    └── venv/           # Python virtual environment (if pre-configured)
```

---

## Setting Up and Running the Project

Follow these steps to set up the MySQL database, start the Flask backend, and run the frontend prototype.

### 1. Database Setup (MySQL)

1. Make sure you have **MySQL Server** installed and running on your local machine.
2. Open your preferred MySQL client (MySQL Command Line Client, MySQL Workbench, phpMyAdmin, etc.).
3. Create the database and import the tables and mock seed data using [schema.sql](file:///c:/Users/sujal/OneDrive/Documents/GitHub/Hackathon/backend/schema.sql):
   - You can execute the commands in `schema.sql` directly inside your SQL editor, or run the following command in your terminal/command prompt:
     ```bash
     mysql -u your_username -p < backend/schema.sql
     ```
4. Verify or update the database credentials in [database.py](file:///c:/Users/sujal/OneDrive/Documents/GitHub/Hackathon/backend/database.py). If your MySQL username or password is different from the default (`root` / `Sun@2525`), update the connection parameters:
   ```python
   def get_db_connection():
       return mysql.connector.connect(
           host="localhost",
           user="your_username",
           password="your_password",
           database="smart_campus"
       )
   ```

### 2. Backend Setup (Flask Server)

1. Open your terminal/command prompt and navigate to the `backend/` directory:
   ```bash
   cd backend
   ```
2. Activate the pre-configured virtual environment `venv/`:
   - **Windows (PowerShell)**:
     ```powershell
     .\venv\Scripts\Activate.ps1
     ```
   - **Windows (Command Prompt)**:
     ```cmd
     .\venv\Scripts\activate.bat
     ```
   - **macOS / Linux**:
     ```bash
     source venv/bin/activate
     ```
3. Install the required Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the Flask development server:
   ```bash
   python app.py
   ```
   The backend API will start running at `http://127.0.0.1:5000/`. 
   - You can test that the backend is running by visiting `http://127.0.0.1:5000/`.
   - You can verify the MySQL connection status by visiting `http://127.0.0.1:5000/api/test-db`.

### 3. Frontend Setup

The frontend is a static web application. It runs completely inside the browser.
- **Option 1 (Recommended)**: Open the project folder in VS Code, install the **Live Server** extension, right-click [index.html](file:///c:/Users/sujal/OneDrive/Documents/GitHub/Hackathon/index.html), and select **Open with Live Server**.
- **Option 2**: Simply double-click [index.html](file:///c:/Users/sujal/OneDrive/Documents/GitHub/Hackathon/index.html) to open it directly in your web browser.
- You can also view the standalone charts page by opening [chart.html](file:///c:/Users/sujal/OneDrive/Documents/GitHub/Hackathon/chart.html).

---

## Demo Instructions

### Automated Fault Demo

1. Open the Dashboard.
2. Click **Simulate Projector Fault**.
3. The system automatically:
   - Detects the projector issue.
   - Identifies A Block / Room A-204.
   - Selects the IT / AV department.
   - Finds Rahul Patel based on matching skill and workload.
   - Creates a maintenance ticket.
   - Sends a notification.
   - Updates dashboard statistics.

### Energy Automation Demo

1. Click **Simulate Empty Classroom**.
2. Room occupancy becomes zero.
3. The automation system simulates a five-minute empty-room condition.
4. Lights, fan, and AC are turned OFF or optimized.
5. Estimated energy saving is added to analytics.

---

## Project Status & Implementation Progress

- [x] Responsive frontend dashboard
- [x] Simulated IoT sensor data
- [x] Smart classroom monitoring
- [x] Device health monitoring
- [x] Automated fault workflow
- [x] Automatic maintenance ticket creation
- [x] Automatic department assignment
- [x] Automatic technician assignment
- [x] Interactive ticket status updates
- [x] Energy automation simulation
- [x] Notifications and alerts
- [x] AI prediction interface simulation
- [x] Chart.js analytics
- [x] Flask backend API implementation
- [x] MySQL database schema and seed data
- [ ] ESP32 live sensor integration (In progress)
- [ ] Connect frontend to live backend endpoints
- [ ] Real ML model deployment
- [ ] Real-time WebSocket updates

---

## Future Scope

- Connect ESP32 sensor readings using a Flask REST API.
- Store sensor, device, ticket, and employee data in MySQL.
- Use a trained ML model for energy-demand forecasting.
- Use anomaly detection for real-time fault classification.
- Add WhatsApp, SMS, email, or mobile push notifications.
- Integrate QR-code device identification.
- Add role-based login for Admin, Technician, Faculty, and Student.
- Deploy the platform using a cloud server.

---

## Team

| Role | Name |
|---|---|
| Team Lead | Pruthika Dobariya |
| Frontend Developer | Sujal Makvana |
| Backend Developer | Sunidhi Makwana |
| IoT / Hardware Developer | Dhrumit Prajapati |
| AI / ML Developer | Urvish Dobariya |
| PPT - Presentation | Parth Rajpurohit |

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Smart India Hackathon

This project is developed as a prototype for the **Smart India Hackathon (SIH)**.

**Theme:** Smart Campus Automation, Energy Management, IoT, AI/ML, and Predictive Maintenance.

