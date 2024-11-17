import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ResumeGenerator = () => {
  const [userData, setUserData] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios
      .get('http://localhost:5001/api/user/skills', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data.skills && response.data.skills.length > 0) {
          setUserData(response.data);
        } else {
          setMessage('Please update your skills to generate a resume.');
        }
      })
      .catch((error) => {
        console.error('Error fetching user data', error);
        setMessage('Error fetching data. Please try again.');
      });
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Resume Generation</h1>
      {message ? (
        <p>{message}</p>
      ) : userData ? (
        <div>
          {/* Display resume content here if skills are present */}
          <h2>Summary</h2>
          <p>{userData.professionalSummary || 'No professional summary provided.'}</p>

          <h2>Skills</h2>
          <ul>
            {userData.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>

          {/* Add other resume sections here, such as Education, Projects, etc., based on userData */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ResumeGenerator;
