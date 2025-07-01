import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { userDataService } from '../services/userDataService';

const MoodTracker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [userEmail, setUserEmail] = useState('');
  const [moodData, setMoodData] = useState<any>({});
  const [weeklyMoodStats, setWeeklyMoodStats] = useState<any[]>([]);
  
  const moods = [
    { emoji: '😊', label: 'Happy', color: 'bg-yellow-200' },
    { emoji: '😌', label: 'Peaceful', color: 'bg-green-200' },
    { emoji: '😐', label: 'Neutral', color: 'bg-gray-200' },
    { emoji: '😔', label: 'Sad', color: 'bg-blue-200' },
    { emoji: '😰', label: 'Anxious', color: 'bg-red-200' },
    { emoji: '😴', label: 'Tired', color: 'bg-purple-200' },
  ];

  useEffect(() => {
    const email = localStorage.getItem('glowup_userEmail');
    if (email) {
      setUserEmail(email);
      const userData = userDataService.getUserData(email);
      if (userData && userData.moodData) {
        // Convert mood data array to calendar format
        const moodCalendar: any = {};
        userData.moodData.forEach((mood: any) => {
          moodCalendar[mood.date] = {
            emoji: mood.mood === 'Happy' ? '😊' : 
                   mood.mood === 'Peaceful' ? '😌' :
                   mood.mood === 'Sad' ? '😔' :
                   mood.mood === 'Anxious' ? '😰' :
                   mood.mood === 'Tired' ? '😴' : '😐',
            color: mood.mood === 'Happy' ? 'bg-yellow-200' : 
                   mood.mood === 'Peaceful' ? 'bg-green-200' :
                   mood.mood === 'Sad' ? 'bg-blue-200' :
                   mood.mood === 'Anxious' ? 'bg-red-200' :
                   mood.mood === 'Tired' ? 'bg-purple-200' : 'bg-gray-200'
          };
        });
        setMoodData(moodCalendar);
        
        // Generate weekly stats from actual user data
        generateWeeklyStats(userData.moodData);
      } else {
        // For new users, show empty weekly stats
        setWeeklyMoodStats([
          { day: 'Mon', mood: '😐', count: 0 },
          { day: 'Tue', mood: '😐', count: 0 },
          { day: 'Wed', mood: '😐', count: 0 },
          { day: 'Thu', mood: '😐', count: 0 },
          { day: 'Fri', mood: '😐', count: 0 },
          { day: 'Sat', mood: '😐', count: 0 },
          { day: 'Sun', mood: '😐', count: 0 },
        ]);
      }
    }
  }, []);

  const generateWeeklyStats = (moodDataArray: any[]) => {
    // Get the last 7 days
    const today = new Date();
    const weekStats = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayName = dayNames[date.getDay()];
      
      // Find mood for this day
      const dayMood = moodDataArray.find((mood: any) => mood.date === dateStr);
      
      weekStats.push({
        day: dayName,
        mood: dayMood ? (dayMood.mood === 'Happy' ? '😊' : 
                        dayMood.mood === 'Peaceful' ? '😌' :
                        dayMood.mood === 'Sad' ? '😔' :
                        dayMood.mood === 'Anxious' ? '😰' :
                        dayMood.mood === 'Tired' ? '😴' : '😐') : '😐',
        count: dayMood ? dayMood.energy || 0 : 0
      });
    }
    
    setWeeklyMoodStats(weekStats);
  };

  const saveMood = (moodLabel: string) => {
    if (!userEmail) return;
    
    const userData = userDataService.getUserData(userEmail);
    if (!userData) return;

    const today = new Date().toISOString().split('T')[0];
    const newMoodEntry = {
      date: today,
      mood: moodLabel,
      note: '',
      energy: Math.floor(Math.random() * 5) + 1,
      sleep: Math.floor(Math.random() * 5) + 1
    };

    // Remove existing mood for today
    userData.moodData = userData.moodData.filter((mood: any) => mood.date !== today);
    // Add new mood
    userData.moodData.push(newMoodEntry);

    userDataService.saveUserData(userEmail, userData);
    
    // Update local state
    const newMoodData = { ...moodData };
    const mood = moods.find(m => m.label === moodLabel);
    if (mood) {
      newMoodData[today] = { emoji: mood.emoji, color: mood.color };
      setMoodData(newMoodData);
    }
    
    // Regenerate weekly stats
    generateWeeklyStats(userData.moodData);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const formatDateKey = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  // Calculate most common mood from actual data
  const getMostCommonMood = () => {
    if (weeklyMoodStats.length === 0 || weeklyMoodStats.every(stat => stat.count === 0)) {
      return { emoji: '😐', label: 'No data yet', percentage: 0 };
    }
    
    const moodCounts: { [key: string]: number } = {};
    let totalEntries = 0;
    
    weeklyMoodStats.forEach(stat => {
      if (stat.count > 0) {
        moodCounts[stat.mood] = (moodCounts[stat.mood] || 0) + 1;
        totalEntries++;
      }
    });
    
    if (totalEntries === 0) {
      return { emoji: '😐', label: 'No data yet', percentage: 0 };
    }
    
    const mostCommon = Object.entries(moodCounts).reduce((a, b) => a[1] > b[1] ? a : b);
    const percentage = Math.round((mostCommon[1] / totalEntries) * 100);
    
    const moodLabels: { [key: string]: string } = {
      '😊': 'Happy',
      '😌': 'Peaceful',
      '😐': 'Neutral',
      '😔': 'Sad',
      '😰': 'Anxious',
      '😴': 'Tired'
    };
    
    return {
      emoji: mostCommon[0],
      label: moodLabels[mostCommon[0]] || 'Unknown',
      percentage
    };
  };

  const mostCommonMood = getMostCommonMood();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Mood Tracker</h2>
        <p className="text-gray-600 dark:text-gray-300">Visualize your emotional patterns and trends</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Mood Calendar */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-purple-100 dark:border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Mood Calendar</h3>
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
              <Calendar className="w-5 h-5" />
              <span className="font-medium">
                {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 py-2">
                {day}
              </div>
            ))}
            
            {getDaysInMonth(selectedDate).map((day, index) => {
              if (day === null) {
                return <div key={index} className="aspect-square"></div>;
              }
              
              const dateKey = formatDateKey(selectedDate.getFullYear(), selectedDate.getMonth(), day);
              const dayMood = moodData[dateKey];
              
              return (
                <div
                  key={index}
                  className={`aspect-square rounded-lg border-2 border-gray-100 dark:border-slate-600 flex items-center justify-center cursor-pointer hover:border-purple-300 dark:hover:border-purple-500 transition-colors ${
                    dayMood ? dayMood.color : 'bg-gray-50 dark:bg-slate-700'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-200">{day}</div>
                    {dayMood && <div className="text-lg">{dayMood.emoji}</div>}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mood Legend */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100 dark:border-slate-600">
            {moods.map((mood, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm">
                <div className={`w-4 h-4 rounded ${mood.color}`}></div>
                <span className="text-gray-600 dark:text-gray-300">{mood.emoji} {mood.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mood Analytics */}
        <div className="space-y-6">
          {/* Quick Mood Entry */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-pink-100 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">How are you feeling now?</h3>
            <div className="grid grid-cols-2 gap-3">
              {moods.map((mood, index) => (
                <button
                  key={index}
                  onClick={() => saveMood(mood.label)}
                  className="p-3 rounded-xl border border-gray-200 dark:border-slate-600 hover:border-purple-300 dark:hover:border-purple-500 hover:shadow-sm transition-all duration-200 text-center bg-white dark:bg-slate-700"
                >
                  <div className="text-2xl mb-1">{mood.emoji}</div>
                  <div className="text-xs font-medium text-gray-600 dark:text-gray-300">{mood.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* This Week's Summary */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-mint-100 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">This Week's Mood</h3>
            <div className="space-y-3">
              {weeklyMoodStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300 w-8">{stat.day}</span>
                    <span className="text-lg">{stat.mood}</span>
                  </div>
                  <div className="flex-1 mx-3">
                    <div className="w-full bg-gray-200 dark:bg-slate-600 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full"
                        style={{ width: `${(stat.count / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{stat.count}/5</span>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/30 rounded-xl">
              <div className="text-sm font-medium text-purple-800 dark:text-purple-300">Most Common Mood</div>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-2xl">{mostCommonMood.emoji}</span>
                <span className="text-purple-700 dark:text-purple-200">
                  {mostCommonMood.label} - {mostCommonMood.percentage}% of the time
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;
