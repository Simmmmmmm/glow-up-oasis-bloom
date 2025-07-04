
import React, { useState, useEffect } from 'react';
import { Calendar, Book, CheckCircle, Sparkles } from 'lucide-react';
import { supabaseService } from '../services/supabaseService';
import { useAuth } from '../hooks/useAuth';

interface DashboardProps {
  onNavigate?: (tab: string) => void;
}

const Dashboard = ({ onNavigate }: DashboardProps) => {
  const [userHabits, setUserHabits] = useState<any[]>([]);
  const { user, userProfile } = useAuth();

  useEffect(() => {
    if (user) {
      loadUserHabits();
    }
  }, [user]);

  const loadUserHabits = async () => {
    if (!user) return;
    
    try {
      const habits = await supabaseService.getHabits();
      setUserHabits(habits);
    } catch (error) {
      console.error('Error loading habits:', error);
    }
  };

  const getUserDisplayName = () => {
    if (userProfile?.full_name) {
      return userProfile.full_name.split(' ')[0]; // Get first name
    }
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name.split(' ')[0];
    }
    return 'there';
  };

  const todaysDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const today = new Date().toISOString().split('T')[0];

  const toggleHabitCompletion = async (habitId: string) => {
    if (!user) return;

    try {
      const habit = userHabits.find(h => h.id === habitId);
      if (!habit) return;

      const isCompleted = habit.completed_dates?.includes(today) || false;
      const updatedCompletedDates = isCompleted
        ? habit.completed_dates.filter((date: string) => date !== today)
        : [...(habit.completed_dates || []), today];

      const updatedStreak = isCompleted 
        ? Math.max(0, (habit.streak || 0) - 1)
        : (habit.streak || 0) + 1;

      await supabaseService.updateHabit(habitId, {
        completed_dates: updatedCompletedDates,
        streak: updatedStreak
      });

      // Update local state
      setUserHabits(prev => prev.map(h => 
        h.id === habitId 
          ? { ...h, completed_dates: updatedCompletedDates, streak: updatedStreak }
          : h
      ));
    } catch (error) {
      console.error('Error updating habit:', error);
    }
  };

  const dailyTips = [
    `Hello ${getUserDisplayName()}! Remember to drink plenty of water today! Staying hydrated helps your skin glow and keeps your energy levels up. 💧`,
    `Hi ${getUserDisplayName()}! Take 5 deep breaths right now. Mindful breathing can instantly reduce stress and improve focus. 🧘‍♀️`,
    `Good day ${getUserDisplayName()}! Stand up and stretch! Your body will thank you for the movement break. 🤸‍♀️`,
    `Hey ${getUserDisplayName()}! Practice gratitude by writing down 3 things you're thankful for today. ✨`,
    `Hello ${getUserDisplayName()}! Get some sunlight! Even 10 minutes outside can boost your mood and vitamin D levels. ☀️`
  ];

  const dailyTip = dailyTips[Math.floor(Math.random() * dailyTips.length)];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-2 sm:px-0">
      {/* Daily Tip Card */}
      <div className="md:col-span-2 lg:col-span-3 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-pink-200 dark:border-pink-800/30">
        <div className="flex items-center space-x-3 mb-3 sm:mb-4">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-purple-800 dark:text-purple-200">Daily Wellness Tip</h3>
            <p className="text-xs sm:text-sm text-purple-600 dark:text-purple-300">{todaysDate}</p>
          </div>
        </div>
        <p className="text-sm sm:text-base text-purple-700 dark:text-purple-200 leading-relaxed">{dailyTip}</p>
      </div>

      {/* Quick Journal */}
      <div 
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-pink-100 dark:border-gray-700 hover:shadow-md transition-all cursor-pointer"
        onClick={() => onNavigate?.('journal')}
      >
        <div className="flex items-center space-x-3 mb-3 sm:mb-4">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-pink-300 to-pink-400 rounded-full flex items-center justify-center">
            <Book className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">Quick Journal</h3>
        </div>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-3 sm:mb-4">
          How are you feeling today, {getUserDisplayName()}?
        </p>
        <div className="flex space-x-1 sm:space-x-2 mb-3 sm:mb-4 overflow-x-auto">
          {['😊', '😌', '😐', '😔', '😴'].map((emoji, index) => (
            <button
              key={index}
              className="text-xl sm:text-2xl p-2 rounded-full hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors flex-shrink-0"
            >
              {emoji}
            </button>
          ))}
        </div>
        <button className="w-full bg-gradient-to-r from-pink-400 to-pink-500 text-white py-2 rounded-full hover:from-pink-500 hover:to-pink-600 transition-all duration-200 font-medium text-sm sm:text-base">
          Start Writing
        </button>
      </div>

      {/* Mood Calendar */}
      <div 
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-purple-100 dark:border-gray-700 hover:shadow-md transition-all cursor-pointer"
        onClick={() => onNavigate?.('mood')}
      >
        <div className="flex items-center space-x-3 mb-3 sm:mb-4">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-300 to-purple-400 rounded-full flex items-center justify-center">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">Mood Tracker</h3>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-3 sm:mb-4">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
            <div key={index} className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 py-1">
              {day}
            </div>
          ))}
          {Array.from({ length: 21 }, (_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-full text-xs flex items-center justify-center ${
                i === new Date().getDate() - 1
                  ? 'bg-purple-200 dark:bg-purple-700 text-purple-700 dark:text-purple-200' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
              }`}
            >
              {i + 1}
            </div>
          ))}
        </div>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Click to start tracking your mood! 💜</p>
      </div>

      {/* Today's Habits */}
      <div 
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-mint-100 dark:border-gray-700 hover:shadow-md transition-all cursor-pointer"
        onClick={() => onNavigate?.('habits')}
      >
        <div className="flex items-center space-x-3 mb-3 sm:mb-4">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-mint-300 to-mint-400 rounded-full flex items-center justify-center">
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">Today's Habits</h3>
        </div>
        <div className="space-y-3">
          {userHabits.slice(0, 3).map((habit) => {
            const isCompleted = habit.completed_dates?.includes(today) || false;
            return (
              <div key={habit.id} className="flex items-center space-x-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleHabitCompletion(habit.id);
                  }}
                  className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center transition-colors flex-shrink-0 ${
                    isCompleted ? 'bg-mint-400 text-white' : 'bg-gray-200 dark:bg-gray-600 hover:bg-mint-200 dark:hover:bg-mint-600'
                  }`}
                >
                  {isCompleted && <CheckCircle className="w-2 h-2 sm:w-3 sm:h-3" />}
                </button>
                <span className={`text-xs sm:text-sm flex-1 ${
                  isCompleted 
                    ? 'text-gray-800 dark:text-gray-200 line-through' 
                    : 'text-gray-600 dark:text-gray-300'
                }`}>
                  {habit.name}
                </span>
                {habit.streak > 0 && (
                  <span className="text-xs bg-mint-100 dark:bg-mint-900 text-mint-700 dark:text-mint-300 px-2 py-1 rounded-full flex-shrink-0">
                    🔥 {habit.streak}
                  </span>
                )}
              </div>
            );
          })}
          {userHabits.length === 0 && (
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-center py-4">
              No habits yet. Click to start building healthy routines!
            </p>
          )}
          {userHabits.length > 3 && (
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              +{userHabits.length - 3} more habits
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
