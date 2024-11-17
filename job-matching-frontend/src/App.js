import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import ProfileSettings from './components/ProfileSettings';
import Registration from './components/Registration';
import Dashboard from './components/Dashboard';
import SkillsSettings from './components/SkillsSettings';
import NotFound from './components/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const isAuthenticated = localStorage.getItem('token') ? true : false;

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={<ProtectedRoute element={<Dashboard />} isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/profile-settings"
            element={<ProtectedRoute element={<ProfileSettings />} isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/skills-settings"
            element={<ProtectedRoute element={<SkillsSettings />} isAuthenticated={isAuthenticated} />}
          />

          {/* Catch-all Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
