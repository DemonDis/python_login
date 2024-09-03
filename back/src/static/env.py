import os
from dotenv import load_dotenv

#Set the current environment
env = 'dev'

#Load the appropriate .env file
if env == 'test':
    load_dotenv('../.env.testing')
elif env == 'dev':
    load_dotenv('../.env.development')
elif env == 'prod':
    load_dotenv('../.env.production')

HOST = os.environ.get("BACK_HOST")
PORT_HTTP = os.environ.get("BACK_PORT_HTTP")
PORT_SOCKET = os.environ.get("BACK_PORT_SOCKET")