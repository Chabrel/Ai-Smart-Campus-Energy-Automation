from flask import Flask, jsonify, request
from flask_cors import CORS
from database import get_db_connection

app = Flask(__name__)
CORS(app)


# -------------------------------------------------
# HOME / BACKEND STATUS
# -------------------------------------------------

@app.route("/")
def home():
    return "Smart Campus Backend is Running!"


# -------------------------------------------------
# TEST MYSQL CONNECTION
# -------------------------------------------------

@app.route("/api/test-db")
def test_db():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute("SELECT DATABASE()")
        result = cursor.fetchone()

        cursor.close()
        conn.close()

        return jsonify({
            "status": "success",
            "database": result[0],
            "message": "Backend connected to MySQL successfully!"
        })

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500


# -------------------------------------------------
# GET ALL DEVICES
# -------------------------------------------------

@app.route("/api/devices", methods=["GET"])
def get_devices():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT * FROM devices")
        devices = cursor.fetchall()

        cursor.close()
        conn.close()

        return jsonify(devices)

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500


# -------------------------------------------------
# GET ALL EMPLOYEES
# -------------------------------------------------

@app.route("/api/employees", methods=["GET"])
def get_employees():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT * FROM employees")
        employees = cursor.fetchall()

        cursor.close()
        conn.close()

        return jsonify(employees)

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500


# -------------------------------------------------
# GET ALL TICKETS
# -------------------------------------------------

@app.route("/api/tickets", methods=["GET"])
def get_tickets():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT * FROM tickets")
        tickets = cursor.fetchall()

        cursor.close()
        conn.close()

        return jsonify(tickets)

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500


# -------------------------------------------------
# GET ALL DEPARTMENTS
# -------------------------------------------------

@app.route("/api/departments", methods=["GET"])
def get_departments():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT * FROM departments")
        departments = cursor.fetchall()

        cursor.close()
        conn.close()

        return jsonify(departments)

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500


# -------------------------------------------------
# GET SENSOR READINGS
# -------------------------------------------------

@app.route("/api/sensor-readings", methods=["GET"])
def get_sensor_readings():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT * FROM sensor_readings")
        readings = cursor.fetchall()

        cursor.close()
        conn.close()

        return jsonify(readings)

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

    # -------------------------------------------------
# GET ALL ROOMS
# -------------------------------------------------

@app.route("/api/rooms", methods=["GET"])
def get_rooms():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT * FROM rooms")
        rooms = cursor.fetchall()

        cursor.close()
        conn.close()

        return jsonify(rooms)

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500
# -------------------------------------------------
# CREATE NEW TICKET
# -------------------------------------------------

@app.route("/api/tickets", methods=["POST"])
def create_ticket():
    try:
        data = request.get_json()

        device_id = data.get("device_id")
        department_id = data.get("department_id")
        employee_id = data.get("employee_id")
        issue = data.get("issue")
        priority = data.get("priority", "Medium")
        status = data.get("status", "Open")

        if not device_id or not issue:
            return jsonify({
                "status": "error",
                "message": "device_id and issue are required"
            }), 400

        conn = get_db_connection()
        cursor = conn.cursor()
        

        query = """
            INSERT INTO tickets
            (device_id, department_id, employee_id, issue, priority, status)
            VALUES (%s, %s, %s, %s, %s, %s)
        """

        values = (
            device_id,
            department_id,
            employee_id,
            issue,
            priority,
            status
        )

        cursor.execute(query, values)
        conn.commit()

        ticket_id = cursor.lastrowid

        cursor.close()
        conn.close()

        return jsonify({
            "status": "success",
            "message": "Ticket created successfully",
            "ticket_id": ticket_id
        }), 201

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

    # -------------------------------------------------
# GET AUTOMATION RULES
# -------------------------------------------------

@app.route("/api/automation/rules", methods=["GET"])
def get_automation_rules():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT * FROM automation_rules")
        rules = cursor.fetchall()

        cursor.close()
        conn.close()

        return jsonify(rules)

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500
# -------------------------------------------------
# RUN AUTOMATION RULES
# -------------------------------------------------

@app.route("/api/automation/run", methods=["POST"])
def run_automation():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        actions = []
        alerts = []
        tickets_created = []

        # -----------------------------------------
        # 1. LOAD ENABLED AUTOMATION RULES
        # -----------------------------------------
        cursor.execute("""
            SELECT *
            FROM automation_rules
            WHERE enabled = TRUE
        """)
        rules = cursor.fetchall()

        # -----------------------------------------
        # 2. LOAD ROOMS
        # -----------------------------------------
        cursor.execute("SELECT * FROM rooms")
        rooms = cursor.fetchall()

        # -----------------------------------------
        # 3. LOAD DEVICES
        # -----------------------------------------
        cursor.execute("SELECT * FROM devices")
        devices = cursor.fetchall()

        # =================================================
        # RULE: EMPTY ROOM -> LIGHTS OFF
        # =================================================

        empty_light_rule = next(
            (
                rule for rule in rules
                if rule["condition_type"] == "OCCUPANCY_ZERO"
            ),
            None
        )

        if empty_light_rule:

            for room in rooms:

                if (
                    room["occupancy"] == 0
                    and str(room["lights_status"]).upper() == "ON"
                ):

                    cursor.execute("""
                        UPDATE rooms
                        SET lights_status = 'OFF'
                        WHERE room_id = %s
                    """, (room["room_id"],))

                    actions.append({
                        "type": "LIGHTS_OFF",
                        "room": room["room_name"],
                        "message": f"Lights turned OFF in {room['room_name']}"
                    })

        # =================================================
        # RULE: HIGH TEMPERATURE + EMPTY -> AC REDUCE
        # =================================================

        ac_rule = next(
            (
                rule for rule in rules
                if rule["condition_type"] == "HIGH_TEMPERATURE_EMPTY"
            ),
            None
        )

        if ac_rule:

            threshold = float(
                ac_rule["threshold_value"] or 28
            )

            for room in rooms:

                if (
                    room["occupancy"] == 0
                    and float(room["temperature"] or 0) > threshold
                    and str(room["ac_status"]).upper() == "ON"
                ):

                    cursor.execute("""
                        UPDATE rooms
                        SET ac_status = 'ECO'
                        WHERE room_id = %s
                    """, (room["room_id"],))

                    actions.append({
                        "type": "AC_REDUCE",
                        "room": room["room_name"],
                        "message": (
                            f"AC changed to ECO in "
                            f"{room['room_name']} "
                            f"because room is empty and "
                            f"temperature is {room['temperature']}°C"
                        )
                    })

        # =================================================
        # RULE: ENERGY SPIKE -> ALERT
        # =================================================

        energy_rule = next(
            (
                rule for rule in rules
                if rule["condition_type"] == "ENERGY_SPIKE"
            ),
            None
        )

        if energy_rule:

            energy_threshold = float(
                energy_rule["threshold_value"] or 10
            )

            for room in rooms:

                power = float(
                    room["power_usage"] or 0
                )

                if power > energy_threshold:

                    alerts.append({
                        "type": "ENERGY_SPIKE",
                        "room": room["room_name"],
                        "power_usage": power,
                        "message": (
                            f"Energy usage in "
                            f"{room['room_name']} is "
                            f"{power} kW"
                        )
                    })

        # =================================================
        # RULE: DEVICE FAULT -> CREATE TICKET
        # =================================================

        fault_rule = next(
            (
                rule for rule in rules
                if rule["condition_type"] == "DEVICE_FAULT"
            ),
            None
        )

        if fault_rule:

            for device in devices:

                if str(device["status"]).upper() == "FAULT":

                    issue = (
                        f"Automatic fault detected in "
                        f"{device['device_name']}"
                    )

                    # -------------------------------------
                    # Avoid duplicate open tickets
                    # -------------------------------------
                    cursor.execute("""
                        SELECT ticket_id
                        FROM tickets
                        WHERE device_id = %s
                        AND status IN ('Open', 'Assigned', 'In Progress')
                    """, (device["device_id"],))

                    existing_ticket = cursor.fetchone()

                    if existing_ticket:
                        continue

                    # -------------------------------------
                    # Decide department
                    # -------------------------------------
                    device_type = str(
                        device["device_type"] or ""
                    ).lower()

                    if (
                        "air" in device_type
                        or "ac" in device_type
                    ):
                        department_id = 1
                    else:
                        department_id = 2

                    # -------------------------------------
                    # Select available employee
                    # -------------------------------------
                    cursor.execute("""
                        SELECT employee_id
                        FROM employees
                        WHERE department_id = %s
                        AND availability = TRUE
                        ORDER BY workload ASC
                        LIMIT 1
                    """, (department_id,))

                    employee = cursor.fetchone()

                    employee_id = (
                        employee["employee_id"]
                        if employee
                        else None
                    )

                    # -------------------------------------
                    # Create ticket
                    # -------------------------------------
                    cursor.execute("""
                        INSERT INTO tickets
                        (
                            device_id,
                            department_id,
                            employee_id,
                            issue,
                            priority,
                            status
                        )
                        VALUES (%s, %s, %s, %s, %s, %s)
                    """, (
                        device["device_id"],
                        department_id,
                        employee_id,
                        issue,
                        "High",
                        "Open"
                    ))

                    ticket_id = cursor.lastrowid

                    tickets_created.append({
                        "ticket_id": ticket_id,
                        "device": device["device_name"],
                        "issue": issue,
                        "priority": "High",
                        "status": "Open"
                    })

        # Save all updates
        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({
            "status": "success",
            "message": "Automation executed successfully",
            "actions": actions,
            "alerts": alerts,
            "tickets_created": tickets_created
        })

    except Exception as e:

        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500
    # -------------------------------------------------
# ENERGY SUMMARY API
# -------------------------------------------------

@app.route("/api/energy/summary", methods=["GET"])
def energy_summary():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("""
            SELECT
                COUNT(*) AS total_readings,
                ROUND(SUM(energy_usage), 2) AS total_energy,
                ROUND(AVG(energy_usage), 2) AS average_energy,
                ROUND(MAX(energy_usage), 2) AS peak_energy,
                ROUND(MIN(energy_usage), 2) AS minimum_energy
            FROM sensor_readings
        """)

        summary = cursor.fetchone()

        cursor.close()
        conn.close()

        return jsonify({
            "status": "success",
            "summary": summary
        })

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500
# -------------------------------------------------
# RUN FLASK SERVER
# -------------------------------------------------

if __name__ == "__main__":
    app.run(debug=True)