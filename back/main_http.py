import os

from flask import Flask
from dotenv import load_dotenv

#Set the current environment
env = 'development'

#Load the appropriate .env file
if env == 'testing':
    load_dotenv('.env.testing')
elif env == 'development':
    load_dotenv('.env.development')
elif env == 'production':
    load_dotenv('.env.production')

HOST = os.environ("HOST")
PORT = os.environ("PORT_HTTP")

app = Flask(__name__)

@app.route("/", methods=['GET'])
def index(username):
    return "Hello, %s!" % username

if __name__ == "__main__":
    app.run(host=HOST, port=PORT)