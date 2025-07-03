
import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, Calendar, BookOpen, Target, TrendingUp } from 'lucide-react';
import { supabaseService } from '../services/supabaseService';
import { useAuth } from '../hooks/useAuth';

const Hero = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userName, setUserName] = useState('');
  const [userStats, setUserStats] = useState({
    journalEntries: 0,
    habitsCompleted: '0/0',
    streakDays: 0,
    moodScore: 'N/A'
  });
  const { user } = useAuth();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    
    if (user) {
      loadUserData();
    }
    
    return () => clearInterval(timer);
  }, [user]);

  const loadUserData = async () => {
    if (!user) return;
    
    try {
      // Get profile data
      const profile = await supabaseService.getProfile();
      setUserName(profile?.full_name || 'Beautiful');

      // Get user stats
      const [journalEntries, habits, moodData] = await Promise.all([
        supabaseService.getJournalEntries(),
        supabaseService.getHabits(),
        supabaseService.getMoodData()
      ]);

      const totalHabits = habits.length;
      const today = new Date().toISOString().split('T')[0];
      const completedToday = habits.filter(habit => 
        habit.completed_dates?.includes(today)
      ).length;

      const maxStreak = habits.reduce((max, habit) => 
        Math.max(max, habit.streak || 0), 0
      );

      // Calculate average mood score
      const recentMoods = moodData.slice(0, 7); // Last 7 entries
      const avgMoodScore = recentMoods.length > 0 
        ? Math.round(recentMoods.reduce((sum, mood) => sum + (mood.energy || 5), 0) / recentMoods.length)
        : 'N/A';

      setUserStats({
        journalEntries: journalEntries.length,
        habitsCompleted: `${completedToday}/${totalHabits}`,
        streakDays: maxStreak,
        moodScore: avgMoodScore
      });
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

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
    { icon: BookOpen, label: 'Journal Entries', value: userStats.journalEntries.toString(), color: 'from-pink-400 to-pink-500' },
    { icon: Target, label: 'Habits Completed', value: userStats.habitsCompleted, color: 'from-purple-400 to-purple-500' },
    { icon: Calendar, label: 'Streak Days', value: userStats.streakDays.toString(), color: 'from-mint-400 to-mint-500' },
    { icon: TrendingUp, label: 'Mood Score', value: userStats.moodScore.toString(), color: 'from-indigo-400 to-indigo-500' },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-50/50 via-purple-50/50 to-mint-50/50 dark:from-gray-800/50 dark:via-purple-900/20 dark:to-gray-700/50" />
      <div className="absolute inset-0 opacity-10 dark:opacity-5" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
        backgroundSize: '20px 20px'
      }} />
      
      <div className="relative text-center py-6 sm:py-8 md:py-12 mb-4 sm:mb-6 md:mb-8">
        {/* Time and Greeting */}
        <div className="mb-4 sm:mb-6">
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2">
            {getCurrentDate()}
          </p>
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 dark:text-white">
            {getGreeting()}, {userName}! 
          </h2>
        </div>

        {/* Main Logo */}
        <div className="flex items-center justify-center mb-4 sm:mb-6">
          <div className="relative">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-pink-400 via-purple-400 to-mint-400 rounded-full flex items-center justify-center shadow-xl animate-pulse">
              <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce text-xs sm:text-sm">
              ✨
            </div>
          </div>
        </div>
        
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-mint-500 bg-clip-text text-transparent px-4">
          Welcome to GlowUp
        </h1>
        
        {/* Inspirational Quote */}
        <div className="max-w-xs sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-pink-100 dark:border-gray-700">
            <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed italic">
              "{currentQuote}"
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-xs sm:max-w-2xl md:max-w-4xl mx-auto mb-6 sm:mb-8 px-4">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-lg border border-pink-100 dark:border-gray-700 hover:scale-105 transition-transform duration-200">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center mb-2 mx-auto`}>
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</p>
              </div>
            );
          })}
        </div>
        
        {/* Feature Highlights */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm text-gray-500 dark:text-gray-400 px-4">
          <div className="flex items-center space-x-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full border border-pink-100 dark:border-gray-700">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-pink-400 rounded-full animate-pulse"></div>
            <span>Mood Tracking</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full border border-purple-100 dark:border-gray-700">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-400 rounded-full animate-pulse"></div>
            <span>Daily Journal</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full border border-mint-100 dark:border-gray-700">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-mint-400 rounded-full animate-pulse"></div>
            <span>Self-Care Goals</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
