import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './Dashboard.css';
import { useLocation, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [username, setUsername] = useState('');  // State for username
  const [profileComplete, setProfileComplete] = useState(false);
  const [skillsComplete, setSkillsComplete] = useState(false);
  const [profileMenuVisible, setProfileMenuVisible] = useState(false);
  const [error, setError] = useState('');
  const [jobRecommendations, setJobRecommendations] = useState([]);
  const [skills, setSkills] = useState('');
  
  const location = useLocation();
  const message = location.state?.message;  // Extract message from location state
  const navigate = useNavigate();  // For navigation
  
  // Fetch job recommendations when skills change
  const fetchJobRecommendations = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (skills) {
      try {
        const res = await axios.get('http://localhost:5001/api/jobs/recommendations', {
          headers: { 'Authorization': `Bearer ${token}` },
          params: { skills },
        });
        setJobRecommendations(res.data);
      } catch (error) {
        console.error('Error fetching job recommendations:', error.response || error);
        if (error.response && error.response.status === 401) {
          handleTokenExpiration();  // Call token expiration handler
        }
      }
    }
  }, [skills]);

  // Fetch profile data on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');  // Retrieve token from localStorage
    if (token) {
      axios.get('http://localhost:5001/api/user/profile', {
        headers: { 'Authorization': `Bearer ${token}` },
      })
      .then((response) => {
        const { firstName, lastName, skills, profileComplete, skillsComplete } = response.data;
        setUsername(`${firstName} ${lastName}`);  // Set full name
        setSkills(skills);
        setProfileComplete(profileComplete);
        setSkillsComplete(skillsComplete);
      })
      .catch((error) => {
        console.error('Error fetching profile data:', error.response || error);
        if (error.response && error.response.status === 401) {
          handleTokenExpiration();  // Call token expiration handler
        } else {
          setError('Failed to fetch profile data');
        }
      });
    } else {
      setError('No token found');
    }
  }, []);

  // Handle token expiration by logging out and redirecting to login page
  const handleTokenExpiration = () => {
    alert('Your session has expired. Please log in again.');
    localStorage.removeItem('token');  // Remove the expired token
    window.location.href = '/login';  // Redirect to the login page
  };

  const toggleProfileMenu = () => {
    setProfileMenuVisible(!profileMenuVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const handleCreateResume = () => {
    // Navigate to the resume generator when the button is clicked
    navigate('/resume-generator');
  };

  return (
    <div className="dashboard-container">
      {message && <p style={{ color: 'green' }}>{message}</p>}  {/* Show success message */}
      
      <header className="dashboard-header">
        <div className="project-name">AI-Powered Job Matching Platform</div>
        <div className="user-info">
          <span>Hello, {username}</span>
        </div>
        <div className="nav-options">
          <button onClick={handleCreateResume}>Create Resume/CV</button>
          <button>Job Cart</button>
        </div>
        <div className="profile-settings" onClick={toggleProfileMenu}>
          {username ? username.charAt(0).toUpperCase() : 'U'}
        </div>
        {profileMenuVisible && (
          <div className="profile-menu">
            <ul>
              <li><a href="/profile-settings">Profile Settings</a></li>
              <li><a href="/skills-settings">Skill Settings</a></li>
              <li onClick={handleLogout}>Logout</li>
            </ul>
          </div>
        )}
      </header>

      <div className="dashboard-content">
        {error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <div>
            {!profileComplete || !skillsComplete ? (
              <p>Please complete your profile and skills to see job recommendations.</p>
            ) : (
              <div>
                <h2>Job Recommendations</h2>
                {jobRecommendations.length > 0 ? (
                  <ul>
                    {jobRecommendations.map((job, index) => (
                      <li key={index}>
                        <h3>{job.title}</h3>
                        <p>{job.company}</p>
                        <p>{job.location}</p>
                        <p>Skills required: {job.skills}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No job recommendations available at this time.</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
