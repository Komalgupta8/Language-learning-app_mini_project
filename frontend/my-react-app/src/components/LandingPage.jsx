import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const LandingPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <div className="landing-page">
      <Container className="text-center mt-5">
        {/* Main Heading */}
        <h1 className="display-4">Learn a Language for Free, Fun, and Effectively!</h1>
        <p className="lead">Join millions of learners and start your language journey today.</p>

        {/* Get Started and Login Buttons */}
        <div className="mt-4">
          <Button
            variant="success"
            size="lg"
            className="mx-2"
            onClick={() => navigate('/register')} // Redirect to Register Page
          >
            Get Started
          </Button>
          <Button
            variant="outline-secondary"
            size="lg"
            className="mx-2"
            onClick={() => navigate('/login')} // Redirect to Login Page
          >
            I Already Have an Account
          </Button>
        </div>

        {/* Illustration Section */}
        <div className="mt-5">
        <img src="/images/landingimg.png" alt="Learning Characters" className="img-fluid" style={{ maxWidth: '80%' }} />
        </div>

        {/* Language Options */}
        <div className="mt-5 languages">
          <h3 className="mb-4">Languages You Can Learn</h3>
          <Row>
            <Col xs={6} sm={4} md={3} className="language-option">
              <span>English</span>
            </Col>
            <Col xs={6} sm={4} md={3} className="language-option">
              <span>Spanish</span>
            </Col>
            <Col xs={6} sm={4} md={3} className="language-option">
              <span>French</span>
            </Col>
            <Col xs={6} sm={4} md={3} className="language-option">
              <span>German</span>
            </Col>
            <Col xs={6} sm={4} md={3} className="language-option">
              <span>Italian</span>
            </Col>
            <Col xs={6} sm={4} md={3} className="language-option">
              <span>Portuguese</span>
            </Col>
            <Col xs={6} sm={4} md={3} className="language-option">
              <span>Chinese</span>
            </Col>
            <Col xs={6} sm={4} md={3} className="language-option">
              <span>Japanese</span>
            </Col>
          </Row>
        </div>
      </Container>

      {/* Footer */}
      <footer className="text-center py-4">
        <p>© 2024 Language Learning App. All rights reserved.</p>
        <p>Contact us: support@languageapp.com</p>
      </footer>
    </div>
  );
};

export default LandingPage;
