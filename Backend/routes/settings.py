from flask import Blueprint, request, jsonify
from models import users_collection

settings_bp = Blueprint('settings', __name__)

@settings_bp.route('/settings', methods=['POST'])
def update_settings():
    data = request.json
    users_collection.update_one({"email": "testuser@example.com"}, {"$set": data})  # Replace with session-based email
    return jsonify({"message": "Settings updated successfully"}), 200
