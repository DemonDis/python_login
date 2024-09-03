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