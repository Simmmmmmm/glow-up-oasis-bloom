
import React from 'react';
import { Heart, Book, Calendar, CheckCircle, Sparkles } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation = ({ activeTab, setActiveTab }: NavigationProps) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Heart },
    { id: 'journal', label: 'Journal', icon: Book },
    { id: 'mood', label: 'Mood', icon: Calendar },
    { id: 'habits', label: 'Habits', icon: CheckCircle },
    { id: 'wellness', label: 'Wellness', icon: Sparkles },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-pink-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" fill="currentColor" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              GlowUp
            </h1>
          </div>
          
          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-pink-100 to-purple-100 text-purple-700 shadow-sm'
                      : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium text-sm">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
