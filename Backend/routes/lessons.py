from flask import Blueprint, request, jsonify
from models import lessons_collection

lessons_bp = Blueprint('lessons', __name__)

@lessons_bp.route('/lessons/<language>', methods=['GET'])
def get_lessons(language):
    lessons = lessons_collection.find({"language": language})
    return jsonify([lesson for lesson in lessons])
