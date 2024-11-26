from flask import Blueprint, jsonify
from config import get_db
from bson import ObjectId

# Initialize Blueprint for course routes
course_bp = Blueprint('course_bp', __name__)

# Get the MongoDB database connection
db = get_db()
courses_collection = db.courses

# Route to retrieve all courses
@course_bp.route('/courses', methods=['GET'])
def get_courses():
    try:
        # Retrieve all courses from MongoDB collection
        courses = courses_collection.find()
        
        # Prepare the list of courses to send in the response
        courses_list = [
            {
                "id": str(course['_id']),
                "name": course['name'],
                "description": course['description'],
                "video_url": course['video_url'],
                "thumbnail_url": course.get('thumbnail_url', '')  # Include the thumbnail URL (optional)
            }
            for course in courses
        ]
        
        # Return the courses as a JSON response
        return jsonify(courses_list)
    
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

# Route to retrieve a single course by ID
@course_bp.route('/courses/<course_id>', methods=['GET'])
def get_course_by_id(course_id):
    try:
        # Retrieve the course with the given ID
        course = courses_collection.find_one({"_id": course_id})
        
        if not course:
            return jsonify({"success": False, "error": "Course not found"}), 404
        
        # Return the course details
        return jsonify({
            "id": str(course['_id']),
            "name": course['name'],
            "description": course['description'],
            "video_url": course['video_url'],
            "thumbnail_url": course.get('thumbnail_url', '')  # Ensure thumbnail URL is included
        })
    
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500
