from flask import Blueprint, jsonify
from models import leaderboard_collection

leaderboard_bp = Blueprint('leaderboard', __name__)

@leaderboard_bp.route('/leaderboard', methods=['GET'])
def get_leaderboard():
    leaderboard = leaderboard_collection.find().sort("xp", -1)
    return jsonify([user for user in leaderboard])
