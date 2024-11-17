import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import './ProfileSettings.css';

const ProfileSettings = () => {
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    gender: '',
    mobileNumber: '',
  });
  const [editableField, setEditableField] = useState(null);
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false); // For the final save button
  const navigate = useNavigate(); // Used to navigate to dashboard after saving

  // Fetch profile data when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:5001/api/user/profile', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        const { firstName, lastName, email, address, gender, mobileNumber } = response.data;
        setProfileData({
          firstName: firstName || '',
          lastName: lastName || '',
          email: email || '',
          address: address || '',
          gender: gender || '',
          mobileNumber: mobileNumber || ''
        });
      })
      .catch(error => {
        setError('Failed to fetch profile data');
        console.error('Error fetching profile data:', error);
      });
    } else {
      setError('No token found. Please log in again.');
    }
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  // Toggle between editing and saving for individual fields
  const handleEditToggle = (field) => {
    if (editableField === field) {
      // Save the field when toggling back from "Edit" to "Save"
      handleFieldSaveClick(field);
    }
    setEditableField(editableField === field ? null : field); // Toggle between edit mode and view mode
  };

  // Save the updated field for individual edits
  const handleFieldSaveClick = (field) => {
    const token = localStorage.getItem('token');
    if (token) {
      const updatedField = { [field]: profileData[field] }; // Only send the updated field

      axios.put('http://localhost:5001/api/user/profile', updatedField, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        setEditableField(null);  // Disable editing after saving
        console.log(`${field} updated successfully`);
      })
      .catch(error => {
        setError(`Failed to update ${field}`);
        console.error(`Error updating ${field}:`, error);
      });
    } else {
      setError('No token found. Please log in again.');
    }
  };

  // Save all changes and redirect to the dashboard
  const handleFinalSaveClick = () => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsSaving(true);  // Set saving state to true

      axios.put('http://localhost:5001/api/user/profile', profileData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        setIsSaving(false);  // Reset saving state
        navigate('/dashboard'); // Redirect to the dashboard after saving
      })
      .catch(error => {
        setError('Failed to save changes');
        setIsSaving(false);  // Reset saving state
        console.error('Error saving changes:', error);
      });
    } else {
      setError('No token found. Please log in again.');
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-settings-container">
        <h1>Profile Settings</h1>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div className="profile-field">
          <label>First Name:</label>
          {editableField === 'firstName' ? (
            <input
              type="text"
              name="firstName"
              value={profileData.firstName}
              onChange={handleChange}
            />
          ) : (
            <span>{profileData.firstName}</span>
          )}
          <button onClick={() => handleEditToggle('firstName')}>
            {editableField === 'firstName' ? 'Save' : 'Edit'}
          </button>
        </div>

        <div className="profile-field">
          <label>Last Name:</label>
          {editableField === 'lastName' ? (
            <input
              type="text"
              name="lastName"
              value={profileData.lastName}
              onChange={handleChange}
            />
          ) : (
            <span>{profileData.lastName}</span>
          )}
          <button onClick={() => handleEditToggle('lastName')}>
            {editableField === 'lastName' ? 'Save' : 'Edit'}
          </button>
        </div>

        <div className="profile-field">
          <label>Email:</label>
          {editableField === 'email' ? (
            <input
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleChange}
            />
          ) : (
            <span>{profileData.email}</span>
          )}
          <button onClick={() => handleEditToggle('email')}>
            {editableField === 'email' ? 'Save' : 'Edit'}
          </button>
        </div>

        <div className="profile-field">
          <label>Address:</label>
          {editableField === 'address' ? (
            <input
              type="text"
              name="address"
              value={profileData.address}
              onChange={handleChange}
            />
          ) : (
            <span>{profileData.address}</span>
          )}
          <button onClick={() => handleEditToggle('address')}>
            {editableField === 'address' ? 'Save' : 'Edit'}
          </button>
        </div>

        <div className="profile-field">
          <label>Gender:</label>
          {editableField === 'gender' ? (
            <select
              name="gender"
              value={profileData.gender}
              onChange={handleChange}
            >
              <option value="">Select...</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            <span>{profileData.gender}</span>
          )}
          <button onClick={() => handleEditToggle('gender')}>
            {editableField === 'gender' ? 'Save' : 'Edit'}
          </button>
        </div>

        <div className="profile-field">
          <label>Mobile Number:</label>
          {editableField === 'mobileNumber' ? (
            <input
              type="text"
              name="mobileNumber"
              value={profileData.mobileNumber}
              onChange={handleChange}
            />
          ) : (
            <span>{profileData.mobileNumber}</span>
          )}
          <button onClick={() => handleEditToggle('mobileNumber')}>
            {editableField === 'mobileNumber' ? 'Save' : 'Edit'}
          </button>
        </div>

        {/* Final save button */}
        <button
          onClick={handleFinalSaveClick}
          className="save-all-btn"
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;
