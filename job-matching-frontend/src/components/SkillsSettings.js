import React, { useState, useEffect } from 'react';
import apiClient from '../apiClient'; // Axios client with interceptor
import './SkillsSettings.css';

const SkillsSettings = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("Token from localStorage:", token);

    apiClient
      .get('/user/skills', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        console.log("API response received:", response.data);
        // Set default values if any field is missing
        setUserData({
          ...response.data,
          skills: response.data.skills || [],
          education: response.data.education || [],
          certifications: response.data.certifications || [],
          jobs: response.data.jobs || [],
          volunteerWork: response.data.volunteerWork || [],
          publications: response.data.publications || []
        });
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error loading data:', error);
        setError('Error loading data. Please try again later.');
        setIsLoading(false);
      });
  }, []);

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    console.log("Saving data:", userData); // Log data before sending
  
    try {
      const response = await apiClient.put('/user/update-skills', userData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("Response from backend after save:", response.data); // Log response after saving
      setUserData(response.data); // Update with backend response to reflect saved data
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving user skills:', error);
    }
  };
  

  const handleFieldChange = (field, value) => {
    setUserData({ ...userData, [field]: value });
  };

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setUserData({ ...userData, skills: [...(userData.skills || []), newSkill] });
      setNewSkill('');
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (isEditing) handleSave(); // Save on toggle-off
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="skills-settings-container">
      <h1>Skills & Resume Settings</h1>
      
      <button onClick={toggleEdit} className="edit-btn">
        {isEditing ? 'Save Changes' : 'Edit'}
      </button>

      {/* Skills */}
      <section>
        <h2>Skills</h2>
        {userData.skills.length ? (
          userData.skills.map((skill, index) => (
            <div key={index} className="skill-field">
              <span>{skill}</span>
            </div>
          ))
        ) : (
          <p>No skills available. Please add some skills.</p>
        )}
        {isEditing && (
          <div className="add-skill-field">
            <input
              type="text"
              placeholder="Add new skill"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
            />
            <button onClick={handleAddSkill}>Add Skill</button>
          </div>
        )}
      </section>

      {/* Professional Summary */}
      <section>
        <h2>Professional Summary</h2>
        <textarea
          value={userData.professionalSummary || ''}
          onChange={(e) => handleFieldChange('professionalSummary', e.target.value)}
          placeholder="Brief summary of your professional experience"
          disabled={!isEditing}
        />
      </section>

      {/* Education */}
      <section>
        <h2>Education</h2>
        {(userData.education || []).map((edu, index) => (
          <div key={index}>
            <input
              type="text"
              value={edu.degree || ''}
              onChange={(e) => handleFieldChange('education', index, 'degree', e.target.value)}
              placeholder="Degree"
              disabled={!isEditing}
            />
            <input
              type="text"
              value={edu.institution || ''}
              onChange={(e) => handleFieldChange('education', index, 'institution', e.target.value)}
              placeholder="Institution"
              disabled={!isEditing}
            />
          </div>
        ))}
      </section>

      {/* Certifications */}
      <section>
        <h2>Certifications</h2>
        {(userData.certifications || []).map((cert, index) => (
          <div key={index}>
            <input
              type="text"
              value={cert.certificationName || ''}
              onChange={(e) => handleFieldChange('certifications', index, 'certificationName', e.target.value)}
              placeholder="Certification Name"
              disabled={!isEditing}
            />
            <input
              type="text"
              value={cert.issuingOrganization || ''}
              onChange={(e) => handleFieldChange('certifications', index, 'issuingOrganization', e.target.value)}
              placeholder="Issuing Organization"
              disabled={!isEditing}
            />
          </div>
        ))}
      </section>

      {/* Jobs */}
      <section>
        <h2>Jobs</h2>
        {(userData.jobs || []).map((job, index) => (
          <div key={index}>
            <input
              type="text"
              value={job.jobTitle || ''}
              onChange={(e) => handleFieldChange('jobs', index, 'jobTitle', e.target.value)}
              placeholder="Job Title"
              disabled={!isEditing}
            />
            <textarea
              value={job.responsibilities.join(', ') || ''}
              onChange={(e) => handleFieldChange('jobs', index, 'responsibilities', e.target.value.split(', '))}
              placeholder="Responsibilities (comma-separated)"
              disabled={!isEditing}
            />
          </div>
        ))}
      </section>

      {/* Volunteer Work */}
      <section>
        <h2>Volunteer Work</h2>
        {(userData.volunteerWork || []).map((work, index) => (
          <div key={index}>
            <input
              type="text"
              value={work.role || ''}
              onChange={(e) => handleFieldChange('volunteerWork', index, 'role', e.target.value)}
              placeholder="Role"
              disabled={!isEditing}
            />
            <input
              type="text"
              value={work.organization || ''}
              onChange={(e) => handleFieldChange('volunteerWork', index, 'organization', e.target.value)}
              placeholder="Organization"
              disabled={!isEditing}
            />
          </div>
        ))}
      </section>

    </div>
  );
};

export default SkillsSettings;
