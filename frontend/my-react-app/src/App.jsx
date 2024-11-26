import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import CoursesPage from './components/CoursesPage';
import ProfilePage from './components/ProfilePage';
import LeaderboardPage from './components/LeaderboardPage';
import DiscussionPage from './components/DiscussionPage';
import SettingsPage from './components/SettingsPage';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import RegistrationPage from './components/RegistrationPage';
import LogoutPage from './components/LogoutPage';
import NotFound from './components/NotFound'; // Import your NotFound component
import PrivateRoute from './components/PrivateRoute'; // Import your PrivateRoute component

// Import your StartCoursePage component
import StartCoursePage from './components/StartCoursePage'; 

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/logout" element={<LogoutPage />} />

        {/* Private Routes - Only accessible by authenticated users */}
        <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} />
        <Route path="/courses" element={<PrivateRoute><CoursesPage /></PrivateRoute>} />
        
        {/* Add the Start Course Route */}
        <Route path="/courses/:courseId" element={<PrivateRoute><StartCoursePage /></PrivateRoute>} />

        <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
        <Route path="/leaderboard" element={<PrivateRoute><LeaderboardPage /></PrivateRoute>} />
        <Route path="/discussions" element={<PrivateRoute><DiscussionPage /></PrivateRoute>} />
        <Route path="/settings" element={<PrivateRoute><SettingsPage /></PrivateRoute>} />

        {/* Catch all - 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
