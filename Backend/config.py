from pymongo import MongoClient

# Replace the URI with your MongoDB URI
MONGO_URI = "mongodb://localhost:27017"
client = MongoClient(MONGO_URI)
db = client.language_learning_app

def get_db():
    return db
