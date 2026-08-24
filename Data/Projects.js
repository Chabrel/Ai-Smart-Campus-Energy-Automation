"use strict";

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