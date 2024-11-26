from flask_pymongo import PyMongo
from flask import Flask

def get_db():
    app = Flask(__name__)
    app.config["MONGO_URI"] = "mongodb://localhost:27017/coursesdb"  # Mongo URI
    mongo = PyMongo(app)
    return mongo.db
