
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Dashboard from '@/components/Dashboard';
import Journal from '@/components/Journal';
import MoodTracker from '@/components/MoodTracker';
import HabitPlanner from '@/components/HabitPlanner';
import WellnessTips from '@/components/WellnessTips';
import Hero from '@/components/Hero';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');

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
      case 'wellness':
        return <WellnessTips />;
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
    </div>
  );
};

export default Index;
