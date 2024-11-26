import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch courses from backend
    axios.get('http://localhost:5000/courses')
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Available Courses</h1>
      <div className="row">
        {courses.map(course => (
          <div key={course.id} className="col-md-4 mb-3">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{course.name}</h5>
                <p className="card-text">{course.description}</p>

                {/* Video Player with Thumbnail */}
                <div className="video-container">
                  <video width="100%" height="315" controls poster={course.thumbnail_url}>
                    <source src={course.video_url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>

                <a href={`/courses/${course.id}`} className="btn btn-primary">Start Course</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
