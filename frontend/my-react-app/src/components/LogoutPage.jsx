// LogoutPage.jsx
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LogoutPage = () => {
  const [modalShow, setModalShow] = useState(true); // Show modal by default
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data (like tokens or user info) from local storage or context
    localStorage.removeItem('userName'); // Adjust this based on how you manage user state
    setModalShow(false); // Close the modal
    navigate('/'); // Redirect to the landing page
  };

  return (
    <>
      <Modal show={modalShow} onHide={() => navigate('/home')}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to log out?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => navigate('/home')}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LogoutPage;
