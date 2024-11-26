import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ProgressBar, Navbar, Nav, Container, Row, Col, Button, Form } from 'react-bootstrap';
import { FaFire, FaMedal, FaBook } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'; // Import custom CSS for styling

const HomePage = () => {
  const [progress, setProgress] = useState({
    streak: 0,
    xp: 0,
    nextLesson: '',
    lessonCompletion: 0
  });
  
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [userName, setUserName] = useState(''); // State for user's name
  const navigate = useNavigate();

  useEffect(() => {
    // Get user name from local storage
    const storedUserName = localStorage.getItem('userName');
    setUserName(storedUserName || ''); // Set user name or empty string

    // Fetch user progress
    
  }, []);

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/feedback', { feedback })
      .then(response => {
        console.log('Feedback submitted:', response.data);
        setSubmitted(true);
        setFeedback(''); // Clear feedback input
        setError(''); // Reset error state
      })
      .catch(error => {
        console.error('Error submitting feedback:', error);
        setError('Failed to submit feedback. Please try again.');
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('userName'); // Clear user information
    navigate('/'); // Redirect to login page
  };

  return (
    <>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">Language Learning App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/courses">Courses</Nav.Link>
              <Nav.Link href="/profile">Profile</Nav.Link>
              <Nav.Link href="/leaderboard">Leaderboard</Nav.Link>
              <Nav.Link href="/discussions">Discussions</Nav.Link>
              <Nav.Link href="/settings">Settings</Nav.Link>
              <Nav.Link onClick={() => navigate('/logout')} style={{ cursor: 'pointer' }}>Logout</Nav.Link>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Section */}
      <main className="container mt-4">
        <h1 className="text-center mb-4">Welcome Back, {userName || 'Learner'}!</h1>
        {error && <div className="alert alert-danger text-center">{error}</div>}

        {/* Progress Cards */}
        {!error ? (
          <Row className="mb-4">
            <Col md={4}>
              <div className="card text-white bg-success mb-3 home-card">
                <div className="card-body text-center">
                  <FaFire size={70} />
                  <h5 className="card-title mt-2">Daily Streak</h5>
                  <p className="card-text">{progress.streak} days</p>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className="card text-white bg-info mb-3 home-card">
                <div className="card-body text-center">
                  <FaMedal size={70} />
                  <h5 className="card-title mt-2">XP Earned</h5>
                  <p className="card-text">{progress.xp} XP points</p>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className="card text-white bg-warning mb-3 home-card">
                <div className="card-body text-center">
                  <FaBook size={70} />
                  <h5 className="card-title mt-2">Next Lesson</h5>
                  <p className="card-text">{progress.nextLesson}</p>
                </div>
              </div>
            </Col>
          </Row>
        ) : null}

        <Row className="mt-4">
          <Col md={4}>
            <div className="card text-white bg-primary mb-3 home-card">
              <div className="card-body text-center">
                <h5 className="card-title">Lessons Completed</h5>
                <p className="card-text">0 lessons completed</p>
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className="card text-white bg-danger mb-3 home-card">
              <div className="card-body text-center">
                <h5 className="card-title">Languages Learned</h5>
                <p className="card-text">0 languages</p>
              </div>
            </div>
          </Col>
          <Col md={4}>
            <Button 
              variant="outline-success" 
              className="w-100 py-4 start-lesson-btn" 
              onClick={() => navigate('/courses')} // Redirect to the lessons page
            >
              Start New Course
            </Button>
          </Col>
        </Row>

        <div className="progress mt-4">
          <ProgressBar animated now={progress.lessonCompletion} label={`${progress.lessonCompletion}%`} />
        </div>
        <p className="text-center mt-2">Keep up the good work! You're {progress.lessonCompletion}% done with your next lesson.</p>

        {/* Additional Content Section */}
        <section className="mt-5">
          <h2 className="text-center mb-4">Learn with Us</h2>
          <Row>
            <Col md={4}>
              <div className="card text-center mb-4">
                <div className="card-body">
                  <h5 className="card-title">Interactive Lessons</h5>
                  <p className="card-text">Engage with interactive lessons that make learning a new language fun and effective.</p>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className="card text-center mb-4">
                <div className="card-body">
                  <h5 className="card-title">Community Support</h5>
                  <p className="card-text">Join a community of learners. Share tips, ask questions, and improve together.</p>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className="card text-center mb-4">
                <div className="card-body">
                  <h5 className="card-title">Progress Tracking</h5>
                  <p className="card-text">Track your learning progress and stay motivated with daily goals.</p>
                </div>
              </div>
            </Col>
          </Row>
        </section>

        {/* About Section */}
        <section className="mt-5">
          <h2 className="text-center mb-4">About Our App</h2>
          <p className="text-center">Our Language Learning App is designed to make language acquisition enjoyable and effective. With interactive lessons, a supportive community, and tools to track your progress, we empower learners of all levels to achieve their language goals.</p>
        </section>

        {/* Feedback Section */}
        <section className="mt-5">
          <h2 className="text-center mb-4">We Value Your Feedback</h2>
          <Form onSubmit={handleFeedbackSubmit}>
            <Form.Group controlId="feedbackForm">
              <Form.Control 
                as="textarea" 
                rows={3} 
                placeholder="Share your feedback or suggestions here..." 
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                required
              />
            </Form.Group>
            <div className="d-flex justify-content-center mt-3">
              <Button variant="primary" type="submit">Submit Feedback</Button>
            </div>
          </Form>
          {submitted && !error && (
            <p className="text-success text-center mt-2">Thank you for your feedback!</p>
          )}
          {error && (
            <p className="text-danger text-center mt-2">{error}</p>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-4 mt-5">
        <p>© 2024 Language Learning App. All rights reserved.</p>
        <p>Contact: support@languageapp.com | Privacy Policy</p>
      </footer>
    </>
  );
};

export default HomePage;
