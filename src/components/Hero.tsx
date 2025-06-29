
import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

const Hero = () => {
  return (
    <div className="text-center py-12 mb-8">
      <div className="flex items-center justify-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-pink-400 via-purple-400 to-mint-400 rounded-full flex items-center justify-center shadow-lg">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
      </div>
      
      <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-mint-500 bg-clip-text text-transparent">
        Welcome to GlowUp
      </h1>
      
      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
        Your personal wellness companion for tracking moods, journaling thoughts, 
        building healthy habits, and nurturing your mental & physical well-being ✨
      </p>
      
      <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-pink-300 rounded-full"></div>
          <span>Mood Tracking</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-purple-300 rounded-full"></div>
          <span>Daily Journal</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-mint-300 rounded-full"></div>
          <span>Self-Care Goals</span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
