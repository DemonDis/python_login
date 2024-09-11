import psycopg2
from psycopg2 import Error
import sys
import os
from dotenv import load_dotenv, find_dotenv

#Set the current environment
env = 'dev'

#Load the appropriate .env file
if env == 'test':
    load_dotenv(find_dotenv('.env.testing'))
elif env == 'dev':
    load_dotenv(find_dotenv('.env.development'))
elif env == 'prod':
    load_dotenv(find_dotenv('.env.production'))

HOST = os.environ.get("HOST")
PORT_HTTP = os.environ.get("PORT_HTTP")
PORT_SOCKET = os.environ.get("PORT_SOCKET")

DB_HOST = os.environ.get("DB_HOST")
DB_DATABASE = os.environ.get("DB_DATABASE")
DB_USER = os.environ.get("DB_USER")
DB_PASSWORD = os.environ.get("DB_PASSWORD")
DB_PORT = os.environ.get("DB_PORT")

# Defining database connection parameters
db_params = {
    "host": DB_HOST,
    "database": DB_DATABASE,
    "user": DB_USER,
    "password": DB_PASSWORD,
    "port": DB_PORT
}
# Defining database connection parameters
db_params = {
    "host": DB_HOST,
    "database": DB_DATABASE,
    "user": DB_USER,
    "password": DB_PASSWORD,
    "port": DB_PORT
}
def checked_db():
    try:
        # Connect to an existing database
        connection = psycopg2.connect(**db_params)

        # Create a cursor to perform database operations
        cursor = connection.cursor()
        # Print PostgreSQL details
        print("PostgreSQL server information")
        print(connection.get_dsn_parameters(), "\n")
        # Executing a SQL query
        cursor.execute("SELECT version();")
        # Fetch result
        record = cursor.fetchone()
        print("You are connected to - ", record, "\n")

    except (Exception, Error) as error:
        print("Error while connecting to PostgreSQL", error)
    finally:
        if (connection):
            cursor.close()
            connection.close()
            print("PostgreSQL connection is closed")