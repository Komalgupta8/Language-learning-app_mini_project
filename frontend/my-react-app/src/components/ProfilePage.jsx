import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    xp: 0,
    badges: [],
    achievements: [],
  });

  useEffect(() => {
    axios.get('http://localhost:5000/profile')
      .then(response => setProfile(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Your Profile</h1>
      <div className="row">
        <div className="col-md-4">
          <div className="card text-white bg-primary mb-3">
            <div className="card-body">
              <h5 className="card-title">XP Points</h5>
              <p className="card-text">{profile.xp} XP</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-warning mb-3">
            <div className="card-body">
              <h5 className="card-title">Badges Earned</h5>
              {profile.badges.map(badge => (
                <span key={badge} className="badge badge-light mr-2">{badge}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-success mb-3">
            <div className="card-body">
              <h5 className="card-title">Achievements</h5>
              <ul className="list-unstyled">
                {profile.achievements.map(achievement => (
                  <li key={achievement}><i className="fas fa-check-circle mr-2"></i>{achievement}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
