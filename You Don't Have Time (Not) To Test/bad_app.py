import flask
import os

app = flask.Flask(__name__)

@app.route('/')
def index():
    return Welcome to Hacking for Hustlers!

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
