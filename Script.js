"use strict";

/* =========================================================
   SMARTCAMPUS AI - FRONTEND PROTOTYPE
   Vanilla JavaScript + Chart.js
   ========================================================= */

const state = {
    energy: 284.6,
    saved: 42.8,
    activeDevices: 1248,
    faults: 7,
    openTickets: 5,
    resolvedTickets: 31,
    occupancy: 78,
    co2: 82.4,
    ticketCounter: 421,

    notifications: [{
            title: "New Critical Fault",
            message: "LAB-02 electrical anomaly detected. Electrical team notified.",
            type: "danger",
            icon: "fa-triangle-exclamation",
            time: "2 min ago",
            read: false
        },
        {
            title: "Maintenance Assigned",
            message: "Ticket MT-2026-00421 assigned to Amit Shah.",
            type: "warning",
            icon: "fa-screwdriver-wrench",
            time: "12 min ago",
            read: false
        },
        {
            title: "Energy Saving Achieved",
            message: "42.8 kWh energy saved through automation today.",
            type: "success",
            icon: "fa-leaf",
            time: "28 min ago",
            read: false
        }
    ],

    activities: [{
            icon: "fa-lightbulb",
            color: "green",
            title: "Lights automatically turned OFF in B-204",
            desc: "Room became empty for over five minutes. Estimated saving: 1.8 kWh.",
            time: "10:42 AM"
        },
        {
            icon: "fa-temperature-arrow-down",
            color: "blue",
            title: "A-103 cooling optimized from 24°C to 26°C",
            desc: "Comfort maintained with AI-based cooling optimization. Estimated saving: 2.1 kWh.",
            time: "10:31 AM"
        },
        {
            icon: "fa-brain",
            color: "purple",
            title: "AI predicted peak energy demand at 2:00 PM",
            desc: "Optimization recommendation sent to campus energy administrator.",
            time: "10:15 AM"
        },
        {
            icon: "fa-ticket",
            color: "orange",
            title: "Maintenance ticket MT-2026-00421 updated",
            desc: "Projector P-A204 is currently being checked by Rahul Patel.",
            time: "09:58 AM"
        }
    ]
};

const rooms = [{
        room: "A-101",
        building: "A Block",
        occupancy: 42,
        capacity: 60,
        temp: 27,
        humidity: 58,
        light: "420 lux",
        power: 5.4,
        ac: "ON",
        fan: "ON",
        lights: "ON",
        status: "OCCUPIED"
    },
    {
        room: "A-102",
        building: "A Block",
        occupancy: 0,
        capacity: 60,
        temp: 25,
        humidity: 56,
        light: "250 lux",
        power: 0.8,
        ac: "ECO",
        fan: "OFF",
        lights: "OFF",
        status: "EMPTY"
    },
    {
        room: "A-103",
        building: "A Block",
        occupancy: 38,
        capacity: 60,
        temp: 26,
        humidity: 59,
        light: "380 lux",
        power: 4.9,
        ac: "ON",
        fan: "ON",
        lights: "ON",
        status: "OCCUPIED"
    },
    {
        room: "A-104",
        building: "A Block",
        occupancy: 27,
        capacity: 60,
        temp: 28,
        humidity: 61,
        light: "360 lux",
        power: 4.3,
        ac: "ON",
        fan: "ON",
        lights: "ON",
        status: "OCCUPIED"
    },
    {
        room: "LAB-01",
        building: "Science Block",
        occupancy: 31,
        capacity: 40,
        temp: 27,
        humidity: 57,
        light: "520 lux",
        power: 8.6,
        ac: "ON",
        fan: "ON",
        lights: "ON",
        status: "WARNING"
    },
    {
        room: "LAB-02",
        building: "Science Block",
        occupancy: 18,
        capacity: 40,
        temp: 29,
        humidity: 65,
        light: "400 lux",
        power: 7.1,
        ac: "OFF",
        fan: "ON",
        lights: "ON",
        status: "FAULT"
    },
    {
        room: "B-201",
        building: "B Block",
        occupancy: 45,
        capacity: 60,
        temp: 26,
        humidity: 55,
        light: "430 lux",
        power: 5.6,
        ac: "ON",
        fan: "ON",
        lights: "ON",
        status: "OCCUPIED"
    },
    {
        room: "B-202",
        building: "B Block",
        occupancy: 0,
        capacity: 60,
        temp: 25,
        humidity: 54,
        light: "210 lux",
        power: 0.5,
        ac: "OFF",
        fan: "OFF",
        lights: "OFF",
        status: "EMPTY"
    }
];

const devices = [{
        id: "P-A204",
        name: "Projector P-A204",
        type: "Projector",
        building: "A Block",
        floor: "2nd Floor",
        room: "A-204",
        department: "IT / AV",
        power: "0.12 kW",
        health: 42,
        risk: 87,
        status: "Warning",
        lastChecked: "1 min ago",
        icon: "fa-video"
    },
    {
        id: "AC-A102",
        name: "AC A-102",
        type: "AC Unit",
        building: "A Block",
        floor: "1st Floor",
        room: "A-102",
        department: "HVAC",
        power: "1.8 kW",
        health: 92,
        risk: 8,
        status: "Operational",
        lastChecked: "Just now",
        icon: "fa-snowflake"
    },
    {
        id: "SW-LAB02",
        name: "Network Switch LAB-02",
        type: "Network Device",
        building: "Science Block",
        floor: "Ground Floor",
        room: "LAB-02",
        department: "Network",
        power: "0.18 kW",
        health: 68,
        risk: 51,
        status: "Warning",
        lastChecked: "2 min ago",
        icon: "fa-network-wired"
    },
    {
        id: "PUMP-01",
        name: "Water Pump P-01",
        type: "Water Pump",
        building: "Utility Block",
        floor: "Ground Floor",
        room: "Pump Room",
        department: "Plumbing",
        power: "2.4 kW",
        health: 89,
        risk: 12,
        status: "Operational",
        lastChecked: "3 min ago",
        icon: "fa-faucet-drip"
    },
    {
        id: "LIGHT-B204",
        name: "Smart Light B-204",
        type: "Light",
        building: "B Block",
        floor: "2nd Floor",
        room: "B-204",
        department: "Electrical",
        power: "0.04 kW",
        health: 76,
        risk: 28,
        status: "Operational",
        lastChecked: "1 min ago",
        icon: "fa-lightbulb"
    },
    {
        id: "PC-LAB01-14",
        name: "Computer LAB-01-14",
        type: "Computer",
        building: "Science Block",
        floor: "Ground Floor",
        room: "LAB-01",
        department: "IT",
        power: "0.31 kW",
        health: 57,
        risk: 63,
        status: "Warning",
        lastChecked: "4 min ago",
        icon: "fa-desktop"
    },
    {
        id: "MICRO-LAB01",
        name: "Microscope LAB-01",
        type: "Lab Equipment",
        building: "Science Block",
        floor: "Ground Floor",
        room: "LAB-01",
        department: "Lab Equipment",
        power: "0.16 kW",
        health: 95,
        risk: 5,
        status: "Operational",
        lastChecked: "Just now",
        icon: "fa-flask"
    },
    {
        id: "FAN-A101",
        name: "Ceiling Fan A-101",
        type: "Fan",
        building: "A Block",
        floor: "1st Floor",
        room: "A-101",
        department: "Electrical",
        power: "0.08 kW",
        health: 83,
        risk: 17,
        status: "Operational",
        lastChecked: "2 min ago",
        icon: "fa-fan"
    }
];

const employees = [{
        id: "EMP-104",
        name: "Rahul Patel",
        department: "IT / AV",
        skill: "Projector & AV Systems",
        workload: 2,
        availability: "Available",
        completed: 5,
        avg: "34 min",
        initials: "RP"
    },
    {
        id: "EMP-109",
        name: "Amit Shah",
        department: "Electrical",
        skill: "Electrical Systems",
        workload: 1,
        availability: "Available",
        completed: 4,
        avg: "29 min",
        initials: "AS"
    },
    {
        id: "EMP-112",
        name: "Priya Desai",
        department: "HVAC",
        skill: "AC & Cooling Systems",
        workload: 2,
        availability: "Available",
        completed: 3,
        avg: "41 min",
        initials: "PD"
    },
    {
        id: "EMP-118",
        name: "Neha Mehta",
        department: "Network",
        skill: "Network Infrastructure",
        workload: 3,
        availability: "Busy",
        completed: 6,
        avg: "38 min",
        initials: "NM"
    },
    {
        id: "EMP-124",
        name: "Jay Patel",
        department: "Lab Equipment",
        skill: "Laboratory Equipment",
        workload: 1,
        availability: "Available",
        completed: 2,
        avg: "46 min",
        initials: "JP"
    },
    {
        id: "EMP-126",
        name: "Kiran Joshi",
        department: "IT",
        skill: "Computer Hardware",
        workload: 2,
        availability: "Available",
        completed: 5,
        avg: "36 min",
        initials: "KJ"
    }
];

let tickets = [{
        id: "MT-2026-00421",
        device: "Projector P-A204",
        fault: "Projector offline / not responding",
        location: "A Block / 2nd Floor / A-204",
        priority: "High",
        department: "IT / AV",
        employee: "Rahul Patel",
        created: "09:58 AM",
        eta: "35 min",
        status: "In Progress"
    },
    {
        id: "MT-2026-00420",
        device: "Electrical Panel LAB-02",
        fault: "Abnormal voltage fluctuation",
        location: "Science Block / Ground Floor / LAB-02",
        priority: "Critical",
        department: "Electrical",
        employee: "Amit Shah",
        created: "09:42 AM",
        eta: "20 min",
        status: "Assigned"
    },
    {
        id: "MT-2026-00419",
        device: "Network Switch LAB-02",
        fault: "High packet loss detected",
        location: "Science Block / Ground Floor / LAB-02",
        priority: "High",
        department: "Network",
        employee: "Neha Mehta",
        created: "09:26 AM",
        eta: "45 min",
        status: "In Progress"
    },
    {
        id: "MT-2026-00418",
        device: "Computer LAB-01-14",
        fault: "Abnormal CPU temperature",
        location: "Science Block / Ground Floor / LAB-01",
        priority: "Medium",
        department: "IT",
        employee: "Kiran Joshi",
        created: "08:50 AM",
        eta: "60 min",
        status: "Assigned"
    },
    {
        id: "MT-2026-00417",
        device: "Light B-204",
        fault: "Light output below threshold",
        location: "B Block / 2nd Floor / B-204",
        priority: "Low",
        department: "Electrical",
        employee: "Amit Shah",
        created: "08:14 AM",
        eta: "90 min",
        status: "Resolved"
    }
];

const departments = [{
        name: "IT / AV",
        active: 2,
        completed: 18,
        avg: "34 min",
        available: 2,
        critical: 0,
        color: "#3b82f6"
    },
    {
        name: "Electrical",
        active: 3,
        completed: 22,
        avg: "29 min",
        available: 3,
        critical: 1,
        color: "#ef4444"
    },
    {
        name: "HVAC",
        active: 1,
        completed: 14,
        avg: "41 min",
        available: 2,
        critical: 0,
        color: "#06b6d4"
    },
    {
        name: "Network",
        active: 2,
        completed: 19,
        avg: "38 min",
        available: 1,
        critical: 0,
        color: "#8b5cf6"
    },
    {
        name: "Lab Equipment",
        active: 1,
        completed: 11,
        avg: "46 min",
        available: 2,
        critical: 0,
        color: "#f59e0b"
    },
    {
        name: "Plumbing",
        active: 0,
        completed: 8,
        avg: "44 min",
        available: 2,
        critical: 0,
        color: "#22c55e"
    }
];

const predictions = [{
        device: "Projector P-A204",
        probability: 87,
        window: "Likely failure within 7 days",
        reason: "Increased operating temperature, abnormal power consumption and repeated communication errors.",
        action: "Schedule preventive maintenance and inspect power module."
    },
    {
        device: "Network Switch LAB-02",
        probability: 64,
        window: "Potential degradation within 14 days",
        reason: "Increasing packet loss, port retry events and elevated enclosure temperature.",
        action: "Inspect switch ports, cooling and network cable health."
    },
    {
        device: "Computer LAB-01-14",
        probability: 58,
        window: "Likely maintenance needed within 21 days",
        reason: "High CPU temperature and increasing fan speed pattern.",
        action: "Clean cooling system and inspect thermal performance."
    }
];

let energyChart = null;
let healthChart = null;
let energyDetailChart = null;
let savingChart = null;
let maintenanceChart = null;
let departmentChart = null;

/* =========================================================
   UTILITY FUNCTIONS
   ========================================================= */

function getElement(id) {
    return document.getElementById(id);
}

function safeValue(id) {
    const element = getElement(id);
    return element ? element.value : "";
}

function badgeClass(value) {
    const text = String(value).toLowerCase();

    if (
        text.includes("critical") ||
        text.includes("fault") ||
        text.includes("offline")
    ) {
        return "badge-danger";
    }

    if (
        text.includes("high") ||
        text.includes("warning") ||
        text.includes("progress")
    ) {
        return "badge-warning";
    }

    if (
        text.includes("resolved") ||
        text.includes("operational") ||
        text.includes("available") ||
        text.includes("occupied")
    ) {
        return "badge-success";
    }

    if (text.includes("assigned") || text.includes("detected")) {
        return "badge-info";
    }

    return "badge-gray";
}

function formatStatus(status) {
    return `<span class="badge ${badgeClass(status)}">${String(
    status
  ).toUpperCase()}</span>`;
}

function colorForActivity(color) {
    const colors = {
        green: {
            background: "var(--green-light)",
            foreground: "var(--green-dark)"
        },
        blue: {
            background: "var(--blue-light)",
            foreground: "var(--blue)"
        },
        purple: {
            background: "#f0ebff",
            foreground: "var(--purple)"
        },
        orange: {
            background: "var(--orange-light)",
            foreground: "var(--orange)"
        }
    };

    return colors[color] || colors.green;
}

function showToast(title, message, type = "success") {
    const config = {
        success: {
            icon: "fa-circle-check",
            className: ""
        },
        warning: {
            icon: "fa-triangle-exclamation",
            className: "warning"
        },
        danger: {
            icon: "fa-circle-exclamation",
            className: "danger"
        }
    };

    const selected = config[type] || config.success;
    const container = getElement("toastContainer");

    if (!container) {
        return;
    }

    const toast = document.createElement("div");
    toast.className = `toast ${selected.className}`;

    const icon = document.createElement("i");
    icon.className = `fa-solid ${selected.icon}`;

    const content = document.createElement("div");
    content.innerHTML = `
    <strong>${title}</strong>
    <p>${message}</p>
  `;

    toast.append(icon, content);
    container.appendChild(toast);

    window.setTimeout(() => {
        toast.remove();
    }, 4600);
}

/* =========================================================
   DASHBOARD RENDERING
   ========================================================= */

function renderDashboardStats() {
    const stats = [{
            label: "Today's Energy",
            value: `${state.energy.toFixed(1)} kWh`,
            icon: "fa-bolt",
            color: "var(--orange-light)",
            iconColor: "var(--orange)",
            sub: "Live campus consumption",
            trend: ""
        },
        {
            label: "Energy Saved",
            value: `${state.saved.toFixed(1)} kWh`,
            icon: "fa-leaf",
            color: "var(--green-light)",
            iconColor: "var(--green-dark)",
            sub: "↑ 14.8% optimization",
            trend: "trend-up"
        },
        {
            label: "Active Devices",
            value: state.activeDevices.toLocaleString(),
            icon: "fa-microchip",
            color: "var(--blue-light)",
            iconColor: "var(--blue)",
            sub: "Across 24 IoT gateways",
            trend: ""
        },
        {
            label: "Faults Detected",
            value: state.faults,
            icon: "fa-triangle-exclamation",
            color: "var(--red-light)",
            iconColor: "var(--red)",
            sub: "Automatic fault detection",
            trend: "trend-down"
        },
        {
            label: "Open Tickets",
            value: state.openTickets,
            icon: "fa-ticket",
            color: "var(--orange-light)",
            iconColor: "var(--orange)",
            sub: "Auto-generated workflow",
            trend: ""
        },
        {
            label: "Resolved Tickets",
            value: state.resolvedTickets,
            icon: "fa-circle-check",
            color: "var(--green-light)",
            iconColor: "var(--green-dark)",
            sub: "Today across campus",
            trend: "trend-up"
        },
        {
            label: "Campus Occupancy",
            value: `${state.occupancy}%`,
            icon: "fa-users",
            color: "var(--blue-light)",
            iconColor: "var(--blue)",
            sub: "Current estimated occupancy",
            trend: ""
        },
        {
            label: "CO₂ Reduction",
            value: `${state.co2.toFixed(1)} kg`,
            icon: "fa-earth-asia",
            color: "#f0ebff",
            iconColor: "var(--purple)",
            sub: "Due to energy optimization",
            trend: "trend-up"
        }
    ];

    const dashboardStats = getElement("dashboardStats");

    if (dashboardStats) {
        dashboardStats.innerHTML = stats
            .map(
                (item) => `
        <div class="card stat-card">
          <div class="stat-top">
            <span class="stat-label">${item.label}</span>
            <span class="stat-icon" style="background:${item.color};color:${item.iconColor}">
              <i class="fa-solid ${item.icon}"></i>
            </span>
          </div>
          <h3>${item.value}</h3>
          <small class="${item.trend}">${item.sub}</small>
        </div>
      `
            )
            .join("");
    }

    const energyStats = getElement("energyStats");

    if (energyStats) {
        energyStats.innerHTML = stats
            .slice(0, 4)
            .map(
                (item) => `
        <div class="card stat-card">
          <div class="stat-top">
            <span class="stat-label">${item.label}</span>
            <span class="stat-icon" style="background:${item.color};color:${item.iconColor}">
              <i class="fa-solid ${item.icon}"></i>
            </span>
          </div>
          <h3>${item.value}</h3>
          <small class="${item.trend}">${item.sub}</small>
        </div>
      `
            )
            .join("");
    }

    const analyticsStats = getElement("analyticsStats");

    if (analyticsStats) {
        const analytics = [{
                label: "Automation Success Rate",
                value: "96.4%",
                icon: "fa-wand-magic-sparkles",
                color: "var(--green-light)",
                iconColor: "var(--green-dark)",
                sub: "Successful automated actions"
            },
            {
                label: "Average Resolution",
                value: "37 min",
                icon: "fa-stopwatch",
                color: "var(--blue-light)",
                iconColor: "var(--blue)",
                sub: "Across all departments"
            },
            {
                label: "Predicted Failures",
                value: "3",
                icon: "fa-brain",
                color: "#f0ebff",
                iconColor: "var(--purple)",
                sub: "Require preventive action"
            },
            {
                label: "Energy Optimization",
                value: "14.8%",
                icon: "fa-chart-line",
                color: "var(--orange-light)",
                iconColor: "var(--orange)",
                sub: "Compared with baseline"
            }
        ];

        analyticsStats.innerHTML = analytics
            .map(
                (item) => `
        <div class="card stat-card">
          <div class="stat-top">
            <span class="stat-label">${item.label}</span>
            <span class="stat-icon" style="background:${item.color};color:${item.iconColor}">
              <i class="fa-solid ${item.icon}"></i>
            </span>
          </div>
          <h3>${item.value}</h3>
          <small>${item.sub}</small>
        </div>
      `
            )
            .join("");
    }
}

function renderActivities() {
    const dashboardActivity = getElement("dashboardActivity");

    if (dashboardActivity) {
        dashboardActivity.innerHTML = state.activities
            .slice(0, 4)
            .map((item) => {
                const colors = colorForActivity(item.color);

                return `
          <div class="activity-item">
            <div class="activity-icon"
              style="background:${colors.background};color:${colors.foreground}">
              <i class="fa-solid ${item.icon}"></i>
            </div>
            <div class="activity-text">
              <strong>${item.title}</strong>
              <p>${item.desc}</p>
              <span>${item.time}</span>
            </div>
          </div>
        `;
            })
            .join("");
    }

    const automationTimeline = getElement("automationTimeline");

    if (automationTimeline) {
        automationTimeline.innerHTML = state.activities
            .map((item) => {
                const colors = colorForActivity(item.color);

                return `
          <div class="timeline-event">
            <div class="timeline-time">${item.time}</div>

            <div class="timeline-dot"
              style="background:${colors.background};color:${colors.foreground}">
              <i class="fa-solid ${item.icon}"></i>
            </div>

            <div class="timeline-content">
              <strong>${item.title}</strong>
              <p>${item.desc}</p>
            </div>
          </div>
        `;
            })
            .join("");
    }
}

/* =========================================================
   CLASSROOMS
   ========================================================= */

function renderRooms() {
    const roomsGrid = getElement("roomsGrid");

    if (!roomsGrid) {
        return;
    }

    roomsGrid.innerHTML = rooms
        .map(
            (room) => `
      <div class="card room-card">
        <div class="room-top">
          <div>
            <h3>${room.room}</h3>
            <p>${room.building}</p>
          </div>
          ${formatStatus(room.status)}
        </div>

        <div class="room-data">
          <div>Occupancy<strong>${room.occupancy} / ${room.capacity}</strong></div>
          <div>Temperature<strong>${room.temp}°C</strong></div>
          <div>Humidity<strong>${room.humidity}%</strong></div>
          <div>Light Level<strong>${room.light}</strong></div>
          <div>Current Power<strong>${room.power.toFixed(1)} kW</strong></div>
          <div>AC Status<strong>${room.ac}</strong></div>
        </div>

        <div class="room-controls">
          <span class="badge ${
            room.lights === "ON" ? "badge-success" : "badge-gray"
          }">
            <i class="fa-solid fa-lightbulb"></i>
            Lights ${room.lights}
          </span>

          <span class="badge ${
            room.fan === "ON" ? "badge-info" : "badge-gray"
          }">
            <i class="fa-solid fa-fan"></i>
            Fan ${room.fan}
          </span>
        </div>
      </div>
    `
        )
        .join("");
}

/* =========================================================
   DEVICES
   ========================================================= */

function renderDevices() {
    const search = safeValue("deviceSearch").toLowerCase();
    const type = safeValue("deviceTypeFilter");
    const status = safeValue("deviceStatusFilter");

    const table = getElement("devicesTable");

    if (!table) {
        return;
    }

    const filtered = devices.filter((device) => {
        const searchableText = `
      ${device.name}
      ${device.type}
      ${device.room}
      ${device.building}
      ${device.department}
    `.toLowerCase();

        return (
            searchableText.includes(search) &&
            (!type || device.type === type) &&
            (!status || device.status === status)
        );
    });

    if (!filtered.length) {
        table.innerHTML = `
      <tr>
        <td colspan="7">
          <div class="empty-state">
            No devices match the selected search or filter.
          </div>
        </td>
      </tr>
    `;
        return;
    }

    table.innerHTML = filtered
        .map(
            (device) => `
      <tr>
        <td>
          <div class="device-name">
            <span class="device-mini-icon">
              <i class="fa-solid ${device.icon}"></i>
            </span>

            <div>
              ${device.name}
              <br>
              <span style="font-size:9px;color:var(--muted);font-weight:400">
                ${device.id} · ${device.type}
              </span>
            </div>
          </div>
        </td>

        <td>
          ${device.building}
          <br>
          <span style="color:var(--muted);font-size:10px">
            ${device.floor} / ${device.room}
          </span>
        </td>

        <td>${device.department}</td>
        <td>${device.power}</td>

        <td>
          <strong>${device.health}%</strong>
          <div class="progress-line" style="width:75px">
            <div
              class="progress-fill"
              style="
                width:${device.health}%;
                background:${
                  device.health < 50
                    ? "var(--red)"
                    : device.health < 75
                    ? "var(--orange)"
                    : "var(--green)"
                }
              "
            ></div>
          </div>
        </td>

        <td>${formatStatus(device.status)}</td>
        <td>${device.lastChecked}</td>
      </tr>
    `
        )
        .join("");
}

/* =========================================================
   TICKETS
   ========================================================= */

function renderTickets() {
    const search = safeValue("ticketSearch").toLowerCase();
    const priority = safeValue("priorityFilter");
    const status = safeValue("ticketStatusFilter");
    const table = getElement("ticketsTable");

    if (!table) {
        return;
    }

    const filtered = tickets.filter((ticket) => {
        const searchableText = `
      ${ticket.id}
      ${ticket.device}
      ${ticket.employee}
      ${ticket.department}
      ${ticket.location}
    `.toLowerCase();

        return (
            searchableText.includes(search) &&
            (!priority || ticket.priority === priority) &&
            (!status || ticket.status === status)
        );
    });

    if (!filtered.length) {
        table.innerHTML = `
      <tr>
        <td colspan="8">
          <div class="empty-state">
            No tickets match the selected search or filter.
          </div>
        </td>
      </tr>
    `;
        return;
    }

    table.innerHTML = filtered
        .map(
            (ticket) => `
      <tr>
        <td>
          <strong>${ticket.id}</strong>
          <br>
          <span style="color:var(--muted);font-size:9px">
            Created ${ticket.created}
          </span>
        </td>

        <td>
          <strong>${ticket.device}</strong>
          <br>
          <span style="color:var(--muted);font-size:10px">
            ${ticket.fault}
          </span>
        </td>

        <td>${ticket.location}</td>
        <td>${formatStatus(ticket.priority)}</td>
        <td>${ticket.department}</td>
        <td>${ticket.employee}</td>
        <td>${formatStatus(ticket.status)}</td>

        <td>
          ${
            ticket.status !== "Resolved"
              ? `
                <button
                  class="btn btn-outline btn-small"
                  onclick="advanceTicket('${ticket.id}')"
                >
                  ${
                    ticket.status === "Assigned"
                      ? "Start Work"
                      : "Mark Resolved"
                  }
                </button>
              `
              : `
                <span style="color:var(--green-dark);font-size:10px;font-weight:700">
                  <i class="fa-solid fa-circle-check"></i>
                  Completed
                </span>
              `
          }
        </td>
      </tr>
    `
    )
    .join("");
}

/* =========================================================
   MAINTENANCE
   ========================================================= */

function renderMaintenance() {
  const container = getElement("maintenanceSummary");

  if (!container) {
    return;
  }

  const summary = [
    {
      title: "Automatic Fault Detection",
      value: `${state.faults} Faults`,
      desc: "Monitoring engine detects anomalies without manual complaints.",
      icon: "fa-radar",
      color: "var(--red)"
    },
    {
      title: "Auto-Generated Tickets",
      value: `${state.openTickets} Open`,
      desc: "Priority and assignment are generated by intelligent rules.",
      icon: "fa-ticket",
      color: "var(--orange)"
    },
    {
      title: "Available Technicians",
      value: employees.filter(
        (employee) => employee.availability === "Available"
      ).length,
      desc: "Selected using skills, availability and task workload.",
      icon: "fa-user-check",
      color: "var(--green-dark)"
    }
  ];

  container.innerHTML = summary
    .map(
      (item) => `
      <div class="card hardware-card">
        <div class="hardware-icon" style="color:${item.color}">
          <i class="fa-solid ${item.icon}"></i>
        </div>

        <h3>${item.title}</h3>
        <h2 style="font-size:24px;margin:10px 0;color:${item.color}">
          ${item.value}
        </h2>
        <p>${item.desc}</p>
      </div>
    `
    )
    .join("");
}

/* =========================================================
   AI PREDICTIONS
   ========================================================= */

function renderPredictions() {
  const container = getElement("predictionCards");

  if (!container) {
    return;
  }

  container.innerHTML = predictions
    .map(
      (prediction, index) => `
      <div
        class="card prediction-card"
        style="border-left-color:${
          index === 0
            ? "var(--red)"
            : index === 1
            ? "var(--orange)"
            : "var(--purple)"
        }"
      >
        <h3>${prediction.device}</h3>
        <p>AI predictive maintenance simulation</p>

        <div
          class="prediction-score"
          style="color:${
            prediction.probability > 75
              ? "var(--red)"
              : prediction.probability > 60
              ? "var(--orange)"
              : "var(--purple)"
          }"
        >
          ${prediction.probability}%
        </div>

        <span style="font-size:10px;color:var(--muted)">
          Predicted failure probability
        </span>

        <div class="prediction-detail">
          <span>Expected Failure Window</span>
          ${prediction.window}
        </div>

        <div class="prediction-detail">
          <span>Risk Factors</span>
          ${prediction.reason}
        </div>

        <div class="prediction-detail">
          <span>Recommended Action</span>
          <strong>${prediction.action}</strong>
        </div>
      </div>
    `
    )
    .join("");
}

/* =========================================================
   DEPARTMENTS
   ========================================================= */

function renderDepartments() {
  const container = getElement("departmentsGrid");

  if (!container) {
    return;
  }

  container.innerHTML = departments
    .map(
      (department) => `
      <div
        class="card department-card"
        style="border-top-color:${department.color}"
      >
        <h3>${department.name}</h3>
        <p>Automated maintenance department dashboard</p>

        <div class="department-stats">
          <div>
            <strong>${department.active}</strong>
            <span>Active Tickets</span>
          </div>

          <div>
            <strong>${department.completed}</strong>
            <span>Completed</span>
          </div>

          <div>
            <strong>${department.avg}</strong>
            <span>Avg Resolution</span>
          </div>

          <div>
            <strong>${department.available}</strong>
            <span>Available Staff</span>
          </div>
        </div>

        <div style="margin-top:15px">
          ${
            department.critical > 0
              ? `<span class="badge badge-danger">${department.critical} CRITICAL ISSUE</span>`
              : `<span class="badge badge-success">NO CRITICAL ISSUES</span>`
          }
        </div>
      </div>
    `
    )
    .join("");
}

/* =========================================================
   EMPLOYEES
   ========================================================= */

function renderEmployees() {
  const container = getElement("employeesGrid");

  if (!container) {
    return;
  }

  const search = safeValue("employeeSearch").toLowerCase();

  const filteredEmployees = employees.filter((employee) =>
    `${employee.name} ${employee.department} ${employee.skill} ${employee.id}`
      .toLowerCase()
      .includes(search)
  );

  if (!filteredEmployees.length) {
    container.innerHTML = `
      <div class="empty-state">
        No employees match the current search.
      </div>
    `;
    return;
  }

  container.innerHTML = filteredEmployees
    .map(
      (employee) => `
      <div class="card employee-card">
        <div class="employee-top">
          <div class="employee-avatar">${employee.initials}</div>

          <div>
            <h3>${employee.name}</h3>
            <p>${employee.id} · ${employee.department}</p>

            <span
              class="badge ${
                employee.availability === "Available"
                  ? "badge-success"
                  : "badge-warning"
              }"
              style="margin-top:7px"
            >
              ${employee.availability.toUpperCase()}
            </span>
          </div>
        </div>

        <div class="quick-demo" style="margin-bottom:0">
          <p><strong>Skill:</strong> ${employee.skill}</p>
          <p>
            <strong>Active Tasks:</strong> ${employee.workload}
            &nbsp; | &nbsp;
            <strong>Completed Today:</strong> ${employee.completed}
          </p>
          <p><strong>Average Resolution:</strong> ${employee.avg}</p>
        </div>

        <div class="employee-actions">
          <button
            class="btn btn-outline btn-small"
            onclick="employeeAction('${employee.id}', 'Accept Task')"
          >
            Accept Task
          </button>

          <button
            class="btn btn-primary btn-small"
            onclick="employeeAction('${employee.id}', 'Start Work')"
          >
            Start Work
          </button>

          <button
            class="btn btn-outline btn-small"
            onclick="employeeAction('${employee.id}', 'Mark Resolved')"
          >
            Mark Resolved
          </button>
        </div>
      </div>
    `
    )
    .join("");
}

/* =========================================================
   ALERTS AND NOTIFICATIONS
   ========================================================= */

function renderAlerts() {
  const container = getElement("alertsList");

  if (!container) {
    return;
  }

  container.innerHTML = state.notifications
    .map(
      (alert, index) => `
      <div
        class="notification-item ${alert.read ? "" : "unread"}"
        onclick="markAlertRead(${index})"
      >
        <i
          class="fa-solid ${alert.icon}"
          style="color:${
            alert.type === "danger"
              ? "var(--red)"
              : alert.type === "warning"
              ? "var(--orange)"
              : "var(--green-dark)"
          }"
        ></i>

        <div>
          <strong>
            ${alert.title}
            ${
              alert.read
                ? ""
                : '<span class="badge badge-info" style="margin-left:5px">NEW</span>'
            }
          </strong>

          <p>${alert.message}</p>
          <span>${alert.time}</span>
        </div>
      </div>
    `
    )
    .join("");
}

function renderNotifications() {
  const count = getElement("notificationCount");
  const list = getElement("notificationList");

  if (!count || !list) {
    return;
  }

  const unreadCount = state.notifications.filter(
    (notification) => !notification.read
  ).length;

  count.textContent = unreadCount;
  count.style.display = unreadCount ? "grid" : "none";

  list.innerHTML = state.notifications
    .map(
      (notification, index) => `
      <div
        class="notification-item ${
          notification.read ? "" : "unread"
        }"
        onclick="markAlertRead(${index})"
      >
        <i
          class="fa-solid ${notification.icon}"
          style="color:${
            notification.type === "danger"
              ? "var(--red)"
              : notification.type === "warning"
              ? "var(--orange)"
              : "var(--green-dark)"
          }"
        ></i>

        <div>
          <strong>${notification.title}</strong>
          <p>${notification.message}</p>
          <span>${notification.time}</span>
        </div>
      </div>
    `
    )
    .join("");
}

function markAlertRead(index) {
  if (!state.notifications[index]) {
    return;
  }

  state.notifications[index].read = true;
  renderNotifications();
  renderAlerts();
}

function markAllAlertsRead() {
  state.notifications.forEach((notification) => {
    notification.read = true;
  });

  renderNotifications();
  renderAlerts();

  showToast(
    "Alerts Updated",
    "All alerts have been marked as read.",
    "success"
  );
}

/* =========================================================
   CHARTS
   ========================================================= */

function createCharts() {
  if (
    typeof Chart === "undefined" ||
    !getElement("energyChart") ||
    !getElement("healthChart")
  ) {
    console.warn("Chart.js is not loaded or chart elements are missing.");
    return;
  }

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
          boxWidth: 7,
          font: {
            size: 10
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 9
          },
          color: "#718096"
        }
      },
      y: {
        grid: {
          color: "#edf1f5"
        },
        ticks: {
          font: {
            size: 9
          },
          color: "#718096"
        }
      }
    }
  };

  energyChart = new Chart(getElement("energyChart"), {
    type: "line",
    data: {
      labels: [
        "8 AM",
        "9 AM",
        "10 AM",
        "11 AM",
        "12 PM",
        "1 PM",
        "2 PM",
        "3 PM",
        "4 PM",
        "5 PM"
      ],
      datasets: [
        {
          label: "Consumption (kWh)",
          data: [19, 26, 31, 35, 38, 42, 49, 45, 37, 29],
          borderColor: "#27c66d",
          backgroundColor: "rgba(39,198,109,0.12)",
          fill: true,
          tension: 0.4,
          pointRadius: 3
        },
        {
          label: "Optimized Target",
          data: [17, 22, 27, 30, 32, 36, 40, 38, 32, 25],
          borderColor: "#3b82f6",
          borderDash: [5, 5],
          tension: 0.4,
          pointRadius: 0
        }
      ]
    },
    options: commonOptions
  });

  healthChart = new Chart(getElement("healthChart"), {
    type: "doughnut",
    data: {
      labels: ["Healthy", "Warning", "Fault", "Offline"],
      datasets: [
        {
          data: [1124, 84, 26, 14],
          backgroundColor: ["#27c66d", "#f59e0b", "#ef4444", "#94a3b8"],
          borderWidth: 0,
          hoverOffset: 5
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "68%",
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            usePointStyle: true,
            boxWidth: 8,
            padding: 17,
            font: {
              size: 10
            }
          }
        }
      }
    }
  });

  if (getElement("energyDetailChart")) {
    energyDetailChart = new Chart(getElement("energyDetailChart"), {
      type: "bar",
      data: {
        labels: [
          "8 AM",
          "9 AM",
          "10 AM",
          "11 AM",
          "12 PM",
          "1 PM",
          "2 PM",
          "3 PM"
        ],
        datasets: [
          {
            label: "Actual kWh",
            data: [19, 26, 31, 35, 38, 42, 49, 45],
            backgroundColor: "#27c66d",
            borderRadius: 6
          },
          {
            label: "Energy Saved",
            data: [2, 4, 5, 6, 7, 6, 8, 5],
            backgroundColor: "#b9efd0",
            borderRadius: 6
          }
        ]
      },
      options: commonOptions
    });
  }

  if (getElement("savingChart")) {
    savingChart = new Chart(getElement("savingChart"), {
      type: "line",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Energy Saved (kWh)",
            data: [28, 34, 31, 39, 42.8, 35, 29],
            borderColor: "#8b5cf6",
            backgroundColor: "rgba(139,92,246,0.12)",
            fill: true,
            tension: 0.4,
            pointRadius: 4
          }
        ]
      },
      options: commonOptions
    });
  }

  if (getElement("maintenanceChart")) {
    maintenanceChart = new Chart(getElement("maintenanceChart"), {
      type: "bar",
      data: {
        labels: ["IT / AV", "Electrical", "HVAC", "Network", "Lab Eq."],
        datasets: [
          {
            label: "Avg Resolution (minutes)",
            data: [34, 29, 41, 38, 46],
            backgroundColor: [
              "#3b82f6",
              "#ef4444",
              "#06b6d4",
              "#8b5cf6",
              "#f59e0b"
            ],
            borderRadius: 7
          }
        ]
      },
      options: commonOptions
    });
  }

  if (getElement("departmentChart")) {
    departmentChart = new Chart(getElement("departmentChart"), {
      type: "doughnut",
      data: {
        labels: [
          "IT / AV",
          "Electrical",
          "HVAC",
          "Network",
          "Lab Equipment",
          "Plumbing"
        ],
        datasets: [
          {
            data: [20, 25, 15, 21, 12, 7],
            backgroundColor: [
              "#3b82f6",
              "#ef4444",
              "#06b6d4",
              "#8b5cf6",
              "#f59e0b",
              "#22c55e"
            ],
            borderWidth: 0
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              usePointStyle: true,
              boxWidth: 8,
              font: {
                size: 9
              }
            }
          }
        }
      }
    });
  }
}

function changeChartRange(range, button) {
  if (!energyChart) {
    return;
  }

  document.querySelectorAll(".range-tab").forEach((tab) => {
    tab.classList.remove("active");
  });

  if (button) {
    button.classList.add("active");
  }

  const chartData = {
    today: {
      labels: [
        "8 AM",
        "9 AM",
        "10 AM",
        "11 AM",
        "12 PM",
        "1 PM",
        "2 PM",
        "3 PM",
        "4 PM",
        "5 PM"
      ],
      actual: [19, 26, 31, 35, 38, 42, 49, 45, 37, 29],
      target: [17, 22, 27, 30, 32, 36, 40, 38, 32, 25]
    },
    week: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      actual: [1120, 1184, 1140, 1215, 1240, 920, 760],
      target: [1020, 1070, 1040, 1100, 1080, 810, 690]
    },
    month: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      actual: [7640, 7920, 7490, 8140],
      target: [6950, 7120, 6800, 7310]
    }
  };

  const selectedData = chartData[range];

  if (!selectedData) {
    return;
  }

  energyChart.data.labels = selectedData.labels;
  energyChart.data.datasets[0].data = selectedData.actual;
  energyChart.data.datasets[1].data = selectedData.target;
  energyChart.update();
}

/* =========================================================
   AUTOMATION AND MAINTENANCE LOGIC
   ========================================================= */

function getDepartmentForDevice(device) {
  switch (device.type) {
    case "Projector":
      return "IT / AV";
    case "Computer":
      return "IT";
    case "AC Unit":
      return "HVAC";
    case "Light":
    case "Fan":
      return "Electrical";
    case "Network Device":
      return "Network";
    case "Lab Equipment":
      return "Lab Equipment";
    case "Water Pump":
      return "Plumbing";
    default:
      return "Electrical";
  }
}

function getFaultDetails(device) {
  const faults = {
    Projector: {
      issue: "Device offline / not responding",
      priority: "High",
      eta: "35 min"
    },
    "AC Unit": {
      issue: "Cooling performance below configured threshold",
      priority: "High",
      eta: "45 min"
    },
    "Network Device": {
      issue: "Network connectivity and packet-loss anomaly",
      priority: "High",
      eta: "40 min"
    },
    "Lab Equipment": {
      issue: "Calibration and sensor error detected",
      priority: "Critical",
      eta: "30 min"
    },
    Light: {
      issue: "Light output below operational threshold",
      priority: "Medium",
      eta: "60 min"
    },
    "Water Pump": {
      issue: "Abnormal current draw detected",
      priority: "Critical",
      eta: "25 min"
    },
    Computer: {
      issue: "Abnormal temperature and performance event",
      priority: "Medium",
      eta: "50 min"
    }
  };

  return (
    faults[device.type] || {
      issue: "Device anomaly detected",
      priority: "Medium",
      eta: "50 min"
    }
  );
}

function selectEmployee(department) {
  const matchingEmployees = employees
    .filter(
      (employee) =>
        employee.department === department &&
        employee.availability === "Available"
    )
    .sort((first, second) => first.workload - second.workload);

  if (matchingEmployees.length) {
    return matchingEmployees[0];
  }

  const fallbackEmployees = employees
    .filter((employee) => employee.department === department)
    .sort((first, second) => first.workload - second.workload);

  return fallbackEmployees[0] || null;
}

function simulateFault(deviceName = "Projector P-A204") {
  const device = devices.find((item) => item.name === deviceName);

  if (!device) {
    showToast("Device Not Found", `Cannot find ${deviceName}.`, "danger");
    return;
  }

  if (device.status === "Fault") {
    showToast(
      "Fault Already Active",
      `${device.name} already has an active simulated fault.`,
      "warning"
    );

    navigateTo("tickets");
    return;
  }

  const department = getDepartmentForDevice(device);
  const fault = getFaultDetails(device);
  const employee = selectEmployee(department);

  if (!employee) {
    showToast(
      "No Technician Available",
      `No technician is configured for the ${department} department.`,
      "danger"
    );
    return;
  }

  device.status = "Fault";
  device.health = Math.min(device.health, 35);
  device.risk = Math.max(device.risk, 88);
  device.department = department;

  state.ticketCounter += 1;
  state.faults += 1;
  state.openTickets += 1;
  employee.workload += 1;

  const ticketId = `MT-2026-${String(state.ticketCounter).padStart(5, "0")}`;

  const ticket = {
    id: ticketId,
    device: device.name,
    fault: fault.issue,
    location: `${device.building} / ${device.floor} / ${device.room}`,
    priority: fault.priority,
    department,
    employee: employee.name,
    created: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    }),
    eta: fault.eta,
    status: "Assigned"
  };

  tickets.unshift(ticket);

  state.activities.unshift({
    icon: "fa-triangle-exclamation",
    color: "orange",
    title: `Fault detected: ${device.name}`,
    desc: `${fault.issue}. Automatically assigned to ${employee.name} (${department}). Ticket ${ticketId} created.`,
    time: "Just now"
  });

  state.notifications.unshift({
    title: `${fault.priority} Fault Auto-Assigned`,
    message: `${device.name} fault detected in ${device.room}. ${ticketId} assigned to ${employee.name}.`,
    type: fault.priority === "Critical" ? "danger" : "warning",
    icon: "fa-triangle-exclamation",
    time: "Just now",
    read: false
  });

  const explanation = getElement("assignmentExplanation");

  if (explanation) {
    explanation.innerHTML = `
      <div class="quick-demo" style="margin:0;border-left:4px solid var(--green)">
        <h4>
          <i class="fa-solid fa-circle-check" style="color:var(--green-dark)"></i>
          Automatic Assignment Completed: ${ticketId}
        </h4>

        <p>
          <strong>Fault Detected:</strong>
          ${device.name} — ${fault.issue}
        </p>

        <p style="margin-top:8px">
          <strong>Location Identified:</strong>
          ${ticket.location}
        </p>

        <p style="margin-top:8px">
          <strong>Department Selected:</strong>
          ${department}
          &nbsp; | &nbsp;
          <strong>Priority:</strong>
          ${fault.priority.toUpperCase()}
        </p>

        <p style="margin-top:8px">
          <strong>Assigned to ${employee.name}</strong>
          because:
          ✓ Correct department
          ✓ ${employee.skill}
          ✓ ${employee.availability}
          ✓ Lowest current workload
        </p>
      </div>
    `;
  }

  refreshUI();

  showToast(
    "Automated Fault Workflow Completed",
    `${device.name} → ${department} → ${employee.name} → ${ticketId}`,
    fault.priority === "Critical" ? "danger" : "warning"
  );

  navigateTo("tickets");
}

function simulateEmptyClassroom() {
  const room = rooms.find((item) => item.room === "B-202") || rooms[1];

  room.occupancy = 0;
  room.status = "EMPTY";
  room.lights = "OFF";
  room.fan = "OFF";
  room.ac = "OFF";
  room.power = 0.4;

  state.saved += 1.8;
  state.energy = Math.max(0, state.energy - 1.8);
  state.co2 += 1.1;

  state.activities.unshift({
    icon: "fa-power-off",
    color: "green",
    title: `${room.room} became empty — appliances optimized`,
    desc: "Empty-room rule activated after simulated five-minute timer. Lights OFF, fan OFF and AC OFF. Estimated saving: 1.8 kWh.",
    time: "Just now"
  });

  state.notifications.unshift({
    title: "Energy Automation Successful",
    message: `${room.room} loads optimized automatically. Estimated saving: 1.8 kWh.`,
    type: "success",
    icon: "fa-leaf",
    time: "Just now",
    read: false
  });

  refreshUI();

  showToast(
    "Automation Successfully Saved Energy",
    `${room.room}: Lights OFF, Fan OFF, AC OFF. Estimated saving: 1.8 kWh.`,
    "success"
  );

  navigateTo("automation");
}

function optimizeTemperature() {
  const room = rooms.find((item) => item.room === "A-103");

  if (!room) {
    return;
  }

  room.temp = 26;
  room.power = Math.max(0, room.power - 0.4);
  state.saved += 2.1;

  state.activities.unshift({
    icon: "fa-temperature-arrow-down",
    color: "blue",
    title: "A-103 cooling setpoint optimized",
    desc: "Temperature adjusted from 24°C to 26°C while preserving comfort. Estimated saving: 2.1 kWh.",
    time: "Just now"
  });

  refreshUI();

  showToast(
    "Cooling Optimized",
    "A-103 setpoint changed to 26°C. Estimated saving: 2.1 kWh.",
    "success"
  );
}

function advanceTicket(ticketId) {
  const ticket = tickets.find((item) => item.id === ticketId);

  if (!ticket) {
    return;
  }

  if (ticket.status === "Assigned" || ticket.status === "Detected") {
    ticket.status = "In Progress";

    showToast(
      "Work Started",
      `${ticket.employee} has started work on ${ticket.id}.`,
      "success"
    );
  } else if (ticket.status === "In Progress") {
    ticket.status = "Resolved";

    state.openTickets = Math.max(0, state.openTickets - 1);
    state.resolvedTickets += 1;
    state.faults = Math.max(0, state.faults - 1);

    const device = devices.find((item) => item.name === ticket.device);

    if (device) {
      device.status = "Operational";
      device.health = Math.max(device.health, 78);
      device.risk = Math.min(device.risk, 22);
    }

    const employee = employees.find(
      (item) => item.name === ticket.employee
    );

    if (employee) {
      employee.workload = Math.max(0, employee.workload - 1);
      employee.completed += 1;
      employee.availability = "Available";
    }

    state.activities.unshift({
      icon: "fa-circle-check",
      color: "green",
      title: `${ticket.device} successfully repaired`,
      desc: `${ticket.id} marked resolved by ${ticket.employee}. Device health updated and outcome stored for AI learning.`,
      time: "Just now"
    });

    state.notifications.unshift({
      title: "Issue Resolved",
      message: `${ticket.device} repaired successfully. ${ticket.id} is now resolved.`,
      type: "success",
      icon: "fa-circle-check",
      time: "Just now",
      read: false
    });

    showToast(
      "Ticket Resolved",
      `${ticket.id} has been resolved and maintenance history was updated.`,
      "success"
    );
  }

  refreshUI();
}

function employeeAction(employeeId, action) {
  const employee = employees.find((item) => item.id === employeeId);

  if (!employee) {
    return;
  }

  if (action === "Accept Task") {
    employee.availability = "Busy";
    employee.workload += 1;
  } else if (action === "Start Work") {
    employee.availability = "Busy";
  } else if (action === "Mark Resolved") {
    employee.workload = Math.max(0, employee.workload - 1);
    employee.completed += 1;
    employee.availability = "Available";
  }

  showToast(
    `${action}: ${employee.name}`,
    `${employee.name}'s technician dashboard has been updated.`,
    "success"
  );

  refreshUI();
}

/* =========================================================
   NAVIGATION
   ========================================================= */

function navigateTo(pageId) {
  const page = getElement(pageId);

  if (!page) {
    console.warn(`Page not found: ${pageId}`);
    return;
  }

  document.querySelectorAll(".page").forEach((item) => {
    item.classList.remove("active");
  });

  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.remove("active");
  });

  page.classList.add("active");

  const navItem = document.querySelector(
    `.nav-item[data-page="${pageId}"]`
  );

  if (navItem) {
    navItem.classList.add("active");
  }

  const titles = {
    dashboard: ["Campus Dashboard", "Dashboard"],
    classrooms: ["Smart Classroom Monitoring", "Smart Classrooms"],
    devices: ["Device Monitoring", "Devices"],
    energy: ["Energy Intelligence", "Energy"],
    automation: ["Automation Control", "Automation"],
    maintenance: ["Automated Maintenance", "Maintenance"],
    tickets: ["Maintenance Tickets", "Tickets"],
    predictions: ["AI Predictions", "AI Predictions"],
    analytics: ["Campus Analytics", "Analytics"],
    alerts: ["Alerts Center", "Alerts"],
    departments: ["Department Dashboard", "Departments"],
    employees: ["Technician Dashboard", "Employees"],
    workflow: ["System Workflow", "Workflow"],
    hardware: ["IoT Hardware", "Hardware"],
    settings: ["System Settings", "Settings"]
  };

  const pageTitle = getElement("topPageTitle");
  const breadcrumb = getElement("breadcrumbName");

  if (titles[pageId]) {
    if (pageTitle) {
      pageTitle.textContent = titles[pageId][0];
    }

    if (breadcrumb) {
      breadcrumb.textContent = titles[pageId][1];
    }
  }

  const sidebar = getElement("sidebar");
  const overlay = getElement("overlay");

  if (sidebar) {
    sidebar.classList.remove("open");
  }

  if (overlay) {
    overlay.classList.remove("show");
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

/* =========================================================
   UI EVENT LISTENERS
   ========================================================= */

function setupEventListeners() {
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.addEventListener("click", () => {
      navigateTo(item.dataset.page);
    });
  });

  const menuToggle = getElement("menuToggle");

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      getElement("sidebar")?.classList.add("open");
      getElement("overlay")?.classList.add("show");
    });
  }

  const overlay = getElement("overlay");

  if (overlay) {
    overlay.addEventListener("click", () => {
      getElement("sidebar")?.classList.remove("open");
      overlay.classList.remove("show");
    });
  }

  const notificationButton = getElement("notificationButton");

  if (notificationButton) {
    notificationButton.addEventListener("click", (event) => {
      event.stopPropagation();
      getElement("notificationPanel")?.classList.toggle("show");
    });
  }

  const markAllRead = getElement("markAllRead");

  if (markAllRead) {
    markAllRead.addEventListener("click", markAllAlertsRead);
  }

  document.addEventListener("click", (event) => {
    const panel = getElement("notificationPanel");
    const button = getElement("notificationButton");

    if (
      panel &&
      button &&
      !panel.contains(event.target) &&
      !button.contains(event.target)
    ) {
      panel.classList.remove("show");
    }
  });
}

/* =========================================================
   LIVE SIMULATION
   ========================================================= */

function startLiveSimulation() {
  window.setInterval(() => {
    state.energy += Math.random() * 1.4 - 0.6;

    state.occupancy = Math.max(
      65,
      Math.min(88, state.occupancy + Math.round(Math.random() * 4 - 2))
    );

    const activeRoom = rooms.find(
      (room) => room.status === "OCCUPIED"
    );

    if (activeRoom) {
      activeRoom.temp = Math.max(
        24,
        Math.min(
          30,
          activeRoom.temp + (Math.random() > 0.5 ? 1 : -1)
        )
      );
    }

    renderDashboardStats();
    renderRooms();

    if (
      energyChart &&
      energyChart.data.datasets[0] &&
      energyChart.data.datasets[0].data.length
    ) {
      const lastIndex =
        energyChart.data.datasets[0].data.length - 1;

      energyChart.data.datasets[0].data[lastIndex] = Math.max(
        15,
        energyChart.data.datasets[0].data[lastIndex] +
          (Math.random() * 2 - 1)
      );

      energyChart.update("none");
    }
  }, 7000);
}

/* =========================================================
   REFRESH AND INITIALIZE
   ========================================================= */

function refreshUI() {
  renderDashboardStats();
  renderActivities();
  renderRooms();
  renderDevices();
  renderTickets();
  renderMaintenance();
  renderPredictions();
  renderDepartments();
  renderEmployees();
  renderAlerts();
  renderNotifications();

  const automationSaved = getElement("automationSaved");

  if (automationSaved) {
    automationSaved.textContent = `${state.saved.toFixed(1)} kWh`;
  }
}

function initializeApp() {
  setupEventListeners();
  refreshUI();
  createCharts();
  startLiveSimulation();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeApp);
} else {
  initializeApp();
}