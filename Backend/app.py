from flask import Flask
from flask_cors import CORS
from routes.auth import auth_bp  # Import auth blueprint for login and registration
from routes.courses import course_bp  # Import course blueprint for course-related routes

# Initialize Flask app
app = Flask(__name__)

# Enable Cross-Origin Resource Sharing (CORS)
CORS(app)

# Register the blueprints
app.register_blueprint(auth_bp)  # Auth blueprint for user-related routes
app.register_blueprint(course_bp)  # Course blueprint for course-related routes


if __name__ == '__main__':
    app.run(debug=True )
