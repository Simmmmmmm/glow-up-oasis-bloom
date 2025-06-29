
import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '../contexts/ThemeContext';
import { userDataService } from '../services/userDataService';
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
import Onboarding from '@/components/Onboarding';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [currentUser, setCurrentUser] = useState<string>('');

  useEffect(() => {
    // Check if user is already logged in
    const savedAuth = localStorage.getItem('isAuthenticated');
    const userEmail = localStorage.getItem('userEmail');
    
    if (savedAuth === 'true' && userEmail) {
      setIsAuthenticated(true);
      setCurrentUser(userEmail);
      
      // Check if user has completed onboarding
      const userData = userDataService.getUserData(userEmail);
      if (!userData) {
        setShowOnboarding(true);
      }
    }
  }, []);

  const handleLogin = (email: string, password: string) => {
    console.log('Logging in with:', email, password);
    
    // Check if user exists
    let userData = userDataService.getUserData(email);
    if (!userData) {
      // Create new user if doesn't exist
      userData = userDataService.createNewUser(email, localStorage.getItem('userName') || 'User');
      setShowOnboarding(true);
    }
    
    setIsAuthenticated(true);
    setCurrentUser(email);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', email);
  };

  const handleGoogleLogin = () => {
    // Simulate Google OAuth with demo user
    const demoEmail = 'demo@glowup.com';
    const demoName = 'Demo User';
    
    console.log('Google login successful');
    
    let userData = userDataService.getUserData(demoEmail);
    if (!userData) {
      userData = userDataService.createNewUser(demoEmail, demoName);
      setShowOnboarding(true);
    }
    
    setIsAuthenticated(true);
    setCurrentUser(demoEmail);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', demoEmail);
    localStorage.setItem('userName', demoName);
  };

  const handleRegister = (email: string, password: string, name: string) => {
    console.log('Registering with:', email, password, name);
    
    // Create new user
    userDataService.createNewUser(email, name);
    setShowOnboarding(true);
    setIsAuthenticated(true);
    setCurrentUser(email);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userName', name);
  };

  const handleOnboardingComplete = (onboardingData: {
    goals: string[];
    fitnessLevel: string;
    healthConditions: string[];
    dateOfBirth?: string;
  }) => {
    const userData = userDataService.getUserData(currentUser);
    if (userData) {
      userData.profile = {
        ...userData.profile,
        ...onboardingData,
      };
      userDataService.saveUserData(currentUser, userData);
    }
    setShowOnboarding(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser('');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    setActiveTab('home');
  };

  // Show onboarding for new users
  if (isAuthenticated && showOnboarding) {
    return (
      <ThemeProvider>
        <Onboarding onComplete={handleOnboardingComplete} />
      </ThemeProvider>
    );
  }

  // Show authentication screens if not logged in
  if (!isAuthenticated) {
    if (showLogin) {
      return (
        <ThemeProvider>
          <Login 
            onLogin={handleLogin}
            onGoogleLogin={handleGoogleLogin}
            onSwitchToRegister={() => setShowLogin(false)}
          />
        </ThemeProvider>
      );
    } else {
      return (
        <ThemeProvider>
          <Register 
            onRegister={handleRegister}
            onGoogleLogin={handleGoogleLogin}
            onSwitchToLogin={() => setShowLogin(true)}
          />
        </ThemeProvider>
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
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-mint-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-800 transition-colors duration-300">
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="container mx-auto px-4 py-6">
          {renderContent()}
        </main>
        
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="fixed bottom-4 right-4 bg-gray-600 dark:bg-gray-700 text-white px-4 py-2 rounded-full text-sm hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors opacity-50 hover:opacity-100"
        >
          Logout
        </button>
      </div>
    </ThemeProvider>
  );
};

export default Index;
