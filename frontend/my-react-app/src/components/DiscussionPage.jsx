import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DiscussionPage = () => {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/discussions')
      .then(response => setThreads(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Community Discussions</h1>
      <div className="list-group">
        {threads.map(thread => (
          <a href={`/discussions/${thread._id}`} className="list-group-item list-group-item-action" key={thread._id}>
            <h5 className="mb-1">{thread.title}</h5>
            <p className="mb-1">{thread.content}</p>
            <small>Posted by {thread.author}</small>
          </a>
        ))}
      </div>
    </div>
  );
};

export default DiscussionPage;
