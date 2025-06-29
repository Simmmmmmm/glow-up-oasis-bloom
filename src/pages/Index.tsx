
import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Dashboard from '@/components/Dashboard';
import Journal from '@/components/Journal';
import MoodTracker from '@/components/MoodTracker';
import HabitPlanner from '@/components/HabitPlanner';
import WellnessTips from '@/components/WellnessTips';
import PeriodTracker from '@/components/PeriodTracker';
import Profile from '@/components/Profile';
import Hero from '@/components/Hero';
import Login from '@/components/Auth/Login';
import Register from '@/components/Auth/Register';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const savedAuth = localStorage.getItem('isAuthenticated');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (email: string, password: string) => {
    // Simulate authentication
    console.log('Logging in with:', email, password);
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', email);
  };

  const handleRegister = (email: string, password: string, name: string) => {
    // Simulate registration
    console.log('Registering with:', email, password, name);
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userName', name);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    setActiveTab('home');
  };

  // Show authentication screens if not logged in
  if (!isAuthenticated) {
    if (showLogin) {
      return (
        <Login 
          onLogin={handleLogin}
          onSwitchToRegister={() => setShowLogin(false)}
        />
      );
    } else {
      return (
        <Register 
          onRegister={handleRegister}
          onSwitchToLogin={() => setShowLogin(true)}
        />
      );
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div>
            <Hero />
            <Dashboard />
          </div>
        );
      case 'journal':
        return <Journal />;
      case 'mood':
        return <MoodTracker />;
      case 'habits':
        return <HabitPlanner />;
      case 'period':
        return <PeriodTracker />;
      case 'wellness':
        return <WellnessTips />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-mint-50">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="container mx-auto px-4 py-6">
        {renderContent()}
      </main>
      
      {/* Logout Button - Hidden in bottom right corner for demo */}
      <button
        onClick={handleLogout}
        className="fixed bottom-4 right-4 bg-gray-600 text-white px-4 py-2 rounded-full text-sm hover:bg-gray-700 transition-colors opacity-50 hover:opacity-100"
      >
        Logout
      </button>
    </div>
  );
};

export default Index;
