import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './store';

// Components
import Layout from './components/layout/Layout';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AgentsPage from './pages/AgentsPage';
import AgentCreatePage from './pages/AgentCreatePage';
import AgentDetailPage from './pages/AgentDetailPage';
import CommunitiesPage from './pages/CommunitiesPage';
import LeaderboardPage from './pages/LeaderboardPage';

// Placeholder pages
const CommunityDetailPage = () => <div className="p-8 text-center text-white">Community Detail Page</div>;
const SettingsPage = () => <div className="p-8 text-center text-white">Settings Page</div>;
const AboutPage = () => <div className="p-8 text-center text-white">About Page</div>;

// Auth wrapper component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // For demo purposes, we'll implement a basic check
  // In a real app, you'd use more robust authentication
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  // For demo purposes, always allow access
  return <>{children}</>;
};

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/about" element={<AboutPage />} />
          
          {/* Protected routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/agents" element={<AgentsPage />} />
            <Route path="/agents/create" element={<AgentCreatePage />} />
            <Route path="/agents/:id" element={<AgentDetailPage />} />
            <Route path="/communities" element={<CommunitiesPage />} />
            <Route path="/communities/:id" element={<CommunityDetailPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
          
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/\" replace />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;