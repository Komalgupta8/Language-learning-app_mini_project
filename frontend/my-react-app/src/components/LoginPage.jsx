import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/login', { email, password })
      .then(response => {
        console.log('Login successful:', response.data);
        // Save user information if needed (e.g., token, user data)
        localStorage.setItem('userName', response.data.user.name); // Save user name
        navigate('/home'); // Redirect to home page
      })
      .catch(error => {
        setErrorMessage('Invalid credentials. Please try again.');
        console.error(error);
      });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center">Login</h2>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                className="form-control" 
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input 
                type="password" 
                className="form-control" 
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
            <div className="d-grid mt-4">
              <button type="submit" className="btn btn-primary">Login</button>
            </div>
            <div className="text-center mt-3">
              <Link to="/forgot-password">Forgot Password?</Link> | 
              <Link to="/register" className="ms-2">Register</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
