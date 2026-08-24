import mysql.connector

def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="Sun@2525",
        database="smart_campus"
    )

try:
    conn = get_db_connection()
    print("MySQL Connected Successfully!")
    conn.close()
except Exception as e:
    print("Database Connection Error:", e)