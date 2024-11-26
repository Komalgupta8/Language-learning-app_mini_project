import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LeaderboardPage = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  // Manually define some leaderboard data for testing
  const manualLeaderboardData = [
    { _id: '1', name: 'Alice', xp: 500 },
    { _id: '2', name: 'Bob', xp: 450 },
    { _id: '3', name: 'Charlie', xp: 400 },
    { _id: '4', name: 'David', xp: 350 },
    { _id: '5', name: 'Eve', xp: 300 },
  ];

  useEffect(() => {
    // Fetch leaderboard data from backend (uncomment this if you want to fetch from the backend)
    // axios.get('http://localhost:5000/leaderboard')
    //   .then(response => setLeaderboard(response.data))
    //   .catch(error => console.error(error));

    // Use manually defined data for now
    setLeaderboard(manualLeaderboardData);
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Leaderboard</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>XP</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.xp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardPage;
