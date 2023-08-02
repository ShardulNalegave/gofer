
import os
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
from ariadne import graphql_sync
from ariadne.explorer import ExplorerGraphiQL

from schema import Schema

load_dotenv()

app = Flask(__name__)
CORS(app)

explorer_html = ExplorerGraphiQL("GraphiQL").html(None)

@app.route("/")
def index():
  return "Hello, World!"

@app.route("/graphql", methods=["GET"])
def graphql():
  return explorer_html, 200

@app.route("/graphql", methods=["POST"])
def graphql_server():
  data = request.get_json()
  success, result = graphql_sync(
    Schema,
    data,
    context_value={"request": request},
    debug=app.debug
  )

  status_code = 200 if success else 400
  return jsonify(result), status_code

if __name__ == "__main__":
  HOST = os.getenv("HOST")
  PORT = int(os.getenv("PORT")) # type: ignore
  DEBUG = os.getenv("DEBUG")

  app.run(host=HOST, port=PORT, debug=(DEBUG == 1))