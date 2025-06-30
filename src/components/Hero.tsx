
import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, Calendar, BookOpen, Target, TrendingUp } from 'lucide-react';

const Hero = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    const name = localStorage.getItem('userName') || 'Beautiful';
    setUserName(name);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getCurrentDate = () => {
    return currentTime.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const inspirationalQuotes = [
    "Your wellness journey is a marathon, not a sprint. Every small step counts! 🌟",
    "Self-care isn't selfish. You can't pour from an empty cup. 💖",
    "Progress, not perfection. Celebrate every victory, no matter how small! ✨",
    "You are stronger than you think and more capable than you imagine. 💪",
    "Today is a new opportunity to nurture your mind, body, and soul. 🦋"
  ];

  const [currentQuote] = useState(() => 
    inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)]
  );

  const quickStats = [
    { icon: BookOpen, label: 'Journal Entries', value: '12', color: 'from-pink-400 to-pink-500' },
    { icon: Target, label: 'Habits Completed', value: '8/10', color: 'from-purple-400 to-purple-500' },
    { icon: Calendar, label: 'Streak Days', value: '5', color: 'from-mint-400 to-mint-500' },
    { icon: TrendingUp, label: 'Mood Score', value: '8.2', color: 'from-indigo-400 to-indigo-500' },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-50/50 via-purple-50/50 to-mint-50/50 dark:from-gray-800/50 dark:via-purple-900/20 dark:to-gray-700/50" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23f3e8ff\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"7\" cy=\"7\" r=\"2\"/%3E%3Ccircle cx=\"27\" cy=\"7\" r=\"2\"/%3E%3Ccircle cx=\"47\" cy=\"7\" r=\"2\"/%3E%3Ccircle cx=\"7\" cy=\"27\" r=\"2\"/%3E%3Ccircle cx=\"27\" cy=\"27\" r=\"2\"/%3E%3Ccircle cx=\"47\" cy=\"27\" r=\"2\"/%3E%3Ccircle cx=\"7\" cy=\"47\" r=\"2\"/%3E%3Ccircle cx=\"27\" cy=\"47\" r=\"2\"/%3E%3Ccircle cx=\"47\" cy=\"47\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] dark:opacity-20" />
      
      <div className="relative text-center py-12 mb-8">
        {/* Time and Greeting */}
        <div className="mb-6">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            {getCurrentDate()}
          </p>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
            {getGreeting()}, {userName}! 
          </h2>
        </div>

        {/* Main Logo */}
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-r from-pink-400 via-purple-400 to-mint-400 rounded-full flex items-center justify-center shadow-xl animate-pulse">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
              ✨
            </div>
          </div>
        </div>
        
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-mint-500 bg-clip-text text-transparent">
          Welcome to GlowUp
        </h1>
        
        {/* Inspirational Quote */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-100 dark:border-gray-700">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed italic">
              "{currentQuote}"
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-pink-100 dark:border-gray-700 hover:scale-105 transition-transform duration-200">
                <div className={`w-10 h-10 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center mb-2 mx-auto`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</p>
              </div>
            );
          })}
        </div>
        
        {/* Feature Highlights */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm px-4 py-2 rounded-full border border-pink-100 dark:border-gray-700">
            <div className="w-3 h-3 bg-pink-400 rounded-full animate-pulse"></div>
            <span>Mood Tracking</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-100 dark:border-gray-700">
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
            <span>Daily Journal</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm px-4 py-2 rounded-full border border-mint-100 dark:border-gray-700">
            <div className="w-3 h-3 bg-mint-400 rounded-full animate-pulse"></div>
            <span>Self-Care Goals</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
