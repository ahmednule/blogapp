import React, { useState } from 'react';
import axios from 'axios';
import './Registration.css';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { AiOutlineTwitter } from 'react-icons/ai';

const Registration = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [skills, setSkills] = useState(''); // Added skills state
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5001/api/auth/register', {
        firstName,
        lastName,
        email,
        address,
        password,
        skills, // Sending skills in registration request
      });

      // Save the token in localStorage
      localStorage.setItem('token', res.data.token);

      // Redirect to dashboard
      window.location.href = '/login';
    } catch (error) {
      setError('Registration failed');
    }
  };

  return (
    <div className="container">
      {/* Registration Form */}
      <div className="form-container">
        <h1>Create An Account</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Create Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {/* Skills input field */}
          <div className="input-group">
            <input
              type="text"
              placeholder="Skills (e.g., JavaScript, Python)"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              required
            />
          </div>
          <div className="terms">
            <input type="checkbox" required />
            <label>
              Creating your account means accepting our{' '}
              <a href="/terms">Terms & Conditions</a>
            </label>
          </div>
          <button type="submit" className="submit-btn">
            Create Account
          </button>
        </form>
      </div>
      {/* Right Side: Additional Information */}
      <div className="info-container">
        <h2>Let's Make it Happen Together!</h2>
        <p>Ping us for any inquiries!</p>
      </div>
    </div>
  );
};

export default Registration;
