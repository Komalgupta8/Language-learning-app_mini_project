import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const StartCoursePage = () => {
  const { courseId } = useParams();  // Get the courseId from the URL parameter
  const [course, setCourse] = useState(null);

  useEffect(() => {
    // Fetch course details from backend using the courseId
    axios.get(`http://localhost:5000/courses/${courseId}`)
      .then(response => {
        setCourse(response.data);
      })
      .catch(error => console.error('Error fetching course:', error));
  }, [courseId]);

  if (!course) {
    return <div>Loading...</div>;  // Display loading state until course data is fetched
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">{course.name}</h1>
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <p className="card-text">{course.description}</p>

              {/* Video Player like YouTube */}
              <div className="video-container">
                <video
                  width="100%"
                  height="auto"
                  controls
                  poster={course.thumbnail_url}  // Display thumbnail before play
                  autoPlay
                  onClick={(e) => e.target.play()} // Play the video when clicked
                >
                  <source src={course.video_url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartCoursePage;
