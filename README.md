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

| Layer | Technologies |
|---|---|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Charts | Chart.js |
| Icons | Font Awesome |
| Backend (Future Integration) | Python, Flask, REST API |
| Database (Future Integration) | MySQL |
| AI/ML (Future Integration) | Python, Pandas, NumPy, Scikit-learn |
| IoT Hardware | ESP32, PIR, DHT22, LDR, Energy Sensor, Relay Module |

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
├── index.html
├── style.css
├── script.js
├── README.md
├── LICENSE
├── .gitignore
│
├── assets/
│   ├── images/
│   └── screenshots/
│
└── docs/
```

---

## Run Locally

This frontend prototype does not require Node.js, React, or a backend server.

### Option 1: Open directly

1. Download or clone this repository.
2. Open the project folder.
3. Double-click `index.html`.

### Option 2: Use VS Code Live Server

1. Open the folder in Visual Studio Code.
2. Install the **Live Server** extension.
3. Right-click `index.html`.
4. Click **Open with Live Server**.

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

## Current Prototype Status

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
- [ ] Flask backend connection
- [ ] MySQL database connection
- [ ] ESP32 live sensor integration
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
| Team Lead | Add Name |
| Frontend Developer | Add Name |
| Backend Developer | Add Name |
| IoT / Hardware Developer | Add Name |
| AI / ML Developer | Add Name |

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Smart India Hackathon

This project is developed as a prototype for the **Smart India Hackathon (SIH)**.

**Theme:** Smart Campus Automation, Energy Management, IoT, AI/ML, and Predictive Maintenance.
