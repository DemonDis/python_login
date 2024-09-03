
from flask import Flask

from src.static.env import *

app = Flask(__name__)

@app.route("/", methods=['GET'])
def index(username):
    return "Hello, %s!" % username

if __name__ == "__main__":
    app.run(debug=True, host=HOST, port=PORT_HTTP)