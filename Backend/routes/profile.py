from flask import Blueprint, jsonify
from models import users_collection

profile_bp = Blueprint('profile', __name__)

@profile_bp.route('/profile', methods=['GET'])
def get_profile():
    user = users_collection.find_one({"email": "testuser@example.com"})  # Replace with session-based email
    return jsonify(user)
