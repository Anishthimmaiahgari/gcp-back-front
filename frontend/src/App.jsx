// src/App.jsx
import React from 'react';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
import AWSCredentials from './components/AWSCredentials';
import GCPCredentials from './components/GCPCredentials';
import AzureCredentials from './components/AzureCredentials';
import ActiveAPIs from './components/ActiveAPIs';
import APIDetails from './components/APIDetails';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/aws-credentials"
          element={
            <ProtectedRoute>
              <AWSCredentials />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gcp-credentials"
          element={
            <ProtectedRoute>
              <GCPCredentials />
            </ProtectedRoute>
          }
        />
        <Route
          path="/azure-credentials"
          element={
            <ProtectedRoute>
              <AzureCredentials />
            </ProtectedRoute>
          }
        />
        <Route
          path="/active-apis" // New route for displaying active APIs
          element={
            <ProtectedRoute>
              <ActiveAPIs />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/api-details" 
          element={
            <ProtectedRoute>
              <APIDetails />
            </ProtectedRoute>} />

        {/* Default Redirect */}
        <Route path="*" element={<Navigate to="/signin" />} />
      </Routes>
    </Router>
  );
}

export default App;