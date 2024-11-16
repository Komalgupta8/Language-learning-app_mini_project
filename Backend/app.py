from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo.errors import DuplicateKeyError
import bcrypt
from config import get_db

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing

db = get_db()
users_collection = db.users

# Ensure unique email indexing
users_collection.create_index("email", unique=True)

# Helper function to hash passwords
def hash_password(password):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

# Helper function to check password
def check_password(password, hashed):
    return bcrypt.checkpw(password.encode('utf-8'), hashed)

# Route to handle registration
@app.route('/register', methods=['POST'])
def register_user():
    try:
        # Get data from request
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')

        if not name or not email or not password:
            return jsonify({"success": False, "error": "All fields are required"}), 400

        # Check if user already exists
        if users_collection.find_one({"email": email}):
            return jsonify({"success": False, "error": "Email already registered"}), 409

        # Hash the password
        hashed_password = hash_password(password)

        # Insert user into database
        user = {
            "name": name,
            "email": email,
            "password": hashed_password
        }
        users_collection.insert_one(user)

        return jsonify({"success": True, "message": "Registration successful!"}), 201

    except DuplicateKeyError:
        return jsonify({"success": False, "error": "Email already exists"}), 409
    except Exception as e:
        print(e)
        return jsonify({"success": False, "error": "An error occurred. Please try again."}), 500
    




# Route to handle login 
@app.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"success": False, "error": "Email and password are required"}), 400

    user = users_collection.find_one({"email": email})
    
    if user and check_password(password, user['password']):
        return jsonify({
            "success": True,
            "message": "Login successful",
            "user": {"name": user['name'], "email": user['email']}
        }), 200
    else:
        return jsonify({"success": False, "error": "Invalid email or password"}), 401

if __name__ == '__main__':
    app.run(debug=True)
