import React, { useState } from 'react';
import './HomePage.css'; // Import the CSS file for styling
import ChatBot from './ChatBot'; // Import your ChatBot component if available

function HomePage() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="homepage">
      {/* Header with platform name and navigation */}
      <header className="header">
        <div className="logo">Jobify</div>
        <nav className="nav">
          <a href="#about-us">About Us</a>
          <a href="#our-mission">Our Mission</a>
          <a href="/login" className="login-btn">Login</a>
          <a href="/register" className="register-btn">Register</a>
        </nav>
      </header>

      {/* Photo stack with text in the center */}
      <div className="photo-stack">
        <img src="../images/project_image.png" alt="Job Matching" />
        <div className="photo-text">
          <h1>Welcome to JobMatchAI</h1>
          <p>Your AI-powered platform to find jobs that fit your skills and preferences.</p>
        </div>
      </div>

      {/* Sections for About Us and Our Mission */}
      <section id="about-us" className="section">
        <h2>About Us</h2>
        <p>
          We leverage AI to connect job seekers with opportunities that match their skills, experience, and aspirations.
        </p>
      </section>

      <section id="our-mission" className="section">
        <h2>Our Mission</h2>
        <p>
          Our mission is to make job searching seamless, quick, and personalized, using cutting-edge AI technology.
        </p>
      </section>

      {/* Chat Button */}
      <button className="chat-btn" onClick={toggleChat}>
        {isChatOpen ? 'Close Chat' : 'Chat'}
      </button>

      {/* ChatBot Component */}
      {isChatOpen && <ChatBot />}
    </div>
  );
}

export default HomePage;
