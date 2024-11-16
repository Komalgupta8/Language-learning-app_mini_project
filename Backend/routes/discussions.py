from flask import Blueprint, request, jsonify
from models import discussions_collection

discussions_bp = Blueprint('discussions', __name__)

@discussions_bp.route('/discussions', methods=['GET'])
def get_discussions():
    discussions = discussions_collection.find()
    return jsonify([discussion for discussion in discussions])

@discussions_bp.route('/discussions', methods=['POST'])
def post_discussion():
    data = request.json
    discussions_collection.insert_one(data)
    return jsonify({"message": "Discussion posted successfully"}), 201
