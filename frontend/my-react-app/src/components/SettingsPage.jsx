import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SettingsPage = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    notifications: true,
  });
  
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch current user settings when the component mounts
    axios.get('http://localhost:5000/user-settings')
      .then(response => {
        const { email, notifications } = response.data;
        setForm({ ...form, email, notifications });
      })
      .catch(error => console.error(error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/settings', form)
      .then(response => {
        setMessage('Settings updated successfully!');
        setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
      })
      .catch(error => {
        console.error(error);
        setMessage('Error updating settings.');
      });
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Account Settings</h1>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input 
            type="email" 
            className="form-control" 
            value={form.email}
            onChange={e => setForm({...form, email: e.target.value})} 
            required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input 
            type="password" 
            className="form-control" 
            value={form.password}
            onChange={e => setForm({...form, password: e.target.value})} 
            required />
        </div>
        <div className="form-check">
          <input 
            type="checkbox" 
            className="form-check-input" 
            checked={form.notifications}
            onChange={e => setForm({...form, notifications: e.target.checked})} />
          <label className="form-check-label">Enable Notifications</label>
        </div>
        <button type="submit" className="btn btn-primary mt-3">Save Changes</button>
      </form>
    </div>
  );
};

export default SettingsPage;
