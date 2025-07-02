
import React, { useState } from 'react';
import { ThemeProvider } from '../contexts/ThemeContext';
import { AuthProvider } from '../hooks/useAuth';
import ProtectedRoute from '../components/ProtectedRoute';
import Navigation from '@/components/Navigation';
import Dashboard from '@/components/Dashboard';
import Journal from '@/components/Journal';
import MoodTracker from '@/components/MoodTracker';
import HabitPlanner from '@/components/HabitPlanner';
import WellnessTips from '@/components/WellnessTips';
import PeriodTracker from '@/components/PeriodTracker';
import Profile from '@/components/Profile';
import Hero from '@/components/Hero';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div>
            <Hero />
            <Dashboard onNavigate={setActiveTab} />
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
        return <Dashboard onNavigate={setActiveTab} />;
    }
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        <ProtectedRoute>
          <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-slate-900 dark:via-purple-900/20 dark:to-slate-800 transition-colors duration-300">
            <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
            <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-6">
              {renderContent()}
            </main>
          </div>
        </ProtectedRoute>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default Index;
