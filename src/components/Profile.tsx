
import React, { useState, useEffect } from 'react';
import { User, Settings, Bell, Moon, Sun, Heart, Target } from 'lucide-react';
import { userDataService } from '../services/userDataService';

interface UserProfile {
  name: string;
  email: string;
  dateOfBirth: string;
  preferences: {
    receiveTips: boolean;
    darkMode: boolean;
    notifications: boolean;
  };
  goals: string[];
}

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    email: '',
    dateOfBirth: '',
    preferences: {
      receiveTips: true,
      darkMode: false,
      notifications: true,
    },
    goals: []
  });

  const [newGoal, setNewGoal] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userStats, setUserStats] = useState({
    journalEntries: 0,
    moodLogs: 0,
    habitsCompleted: 0,
    activeGoals: 0
  });

  const goalOptions = [
    'Drink 8 glasses of water daily',
    'Get 8+ hours of sleep',
    'Exercise 3 times a week',
    'Practice daily skincare routine',
    'Meditate for 10 minutes',
    'Journal every day',
    'Eat 5 servings of fruits/vegetables',
    'Take vitamins regularly',
    'Practice gratitude',
    'Limit screen time before bed'
  ];

  useEffect(() => {
    const email = localStorage.getItem('glowup_userEmail');
    const name = localStorage.getItem('glowup_userName');
    
    if (email) {
      setUserEmail(email);
      const userData = userDataService.getUserData(email);
      
      if (userData) {
        setProfile({
          name: userData.name || name || '',
          email: userData.email,
          dateOfBirth: userData.profile?.dateOfBirth || '',
          preferences: {
            receiveTips: userData.preferences?.notifications || true,
            darkMode: userData.preferences?.theme === 'dark',
            notifications: userData.preferences?.notifications || true,
          },
          goals: userData.profile?.goals || []
        });

        // Calculate user stats
        setUserStats({
          journalEntries: userData.journalEntries?.length || 0,
          moodLogs: userData.moodData?.length || 0,
          habitsCompleted: userData.habits?.reduce((total: number, habit: any) => 
            total + habit.completedDates.length, 0) || 0,
          activeGoals: userData.profile?.goals?.length || 0
        });
      }
    }
  }, []);

  const saveProfile = (updatedProfile: UserProfile) => {
    setProfile(updatedProfile);
    
    if (!userEmail) return;
    
    const userData = userDataService.getUserData(userEmail);
    if (!userData) return;

    // Update user data with profile changes
    userData.name = updatedProfile.name;
    userData.email = updatedProfile.email;
    userData.profile.dateOfBirth = updatedProfile.dateOfBirth;
    userData.profile.goals = updatedProfile.goals;
    userData.preferences.notifications = updatedProfile.preferences.notifications;
    userData.preferences.theme = updatedProfile.preferences.darkMode ? 'dark' : 'light';

    userDataService.saveUserData(userEmail, userData);
    
    // Update localStorage for name
    localStorage.setItem('glowup_userName', updatedProfile.name);
  };

  const addGoal = (goal: string) => {
    if (goal && !profile.goals.includes(goal)) {
      const updatedProfile = {
        ...profile,
        goals: [...profile.goals, goal]
      };
      saveProfile(updatedProfile);
      setNewGoal('');
      setUserStats(prev => ({ ...prev, activeGoals: prev.activeGoals + 1 }));
    }
  };

  const removeGoal = (goalToRemove: string) => {
    const updatedProfile = {
      ...profile,
      goals: profile.goals.filter(goal => goal !== goalToRemove)
    };
    saveProfile(updatedProfile);
    setUserStats(prev => ({ ...prev, activeGoals: Math.max(0, prev.activeGoals - 1) }));
  };

  const updatePreference = (key: keyof UserProfile['preferences'], value: boolean) => {
    const updatedProfile = {
      ...profile,
      preferences: {
        ...profile.preferences,
        [key]: value
      }
    };
    saveProfile(updatedProfile);
  };

  const handleSaveBasicInfo = () => {
    saveProfile(profile);
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Profile & Settings</h2>
        <p className="text-gray-600">Customize your GlowUp experience</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-pink-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Personal Information</h3>
              </div>
              <button
                onClick={() => isEditing ? handleSaveBasicInfo() : setIsEditing(true)}
                className="px-4 py-2 bg-pink-100 text-pink-700 rounded-lg hover:bg-pink-200 transition-colors"
              >
                {isEditing ? 'Save' : 'Edit'}
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  disabled={!isEditing}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-transparent disabled:bg-gray-50"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  disabled={!isEditing}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-transparent disabled:bg-gray-50"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                <input
                  type="date"
                  value={profile.dateOfBirth}
                  onChange={(e) => setProfile({ ...profile, dateOfBirth: e.target.value })}
                  disabled={!isEditing}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-transparent disabled:bg-gray-50"
                />
              </div>
            </div>
          </div>

          {/* Wellness Goals */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Wellness Goals</h3>
            </div>

            <div className="mb-6">
              <div className="flex space-x-2">
                <select
                  value={newGoal}
                  onChange={(e) => setNewGoal(e.target.value)}
                  className="flex-1 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-transparent"
                >
                  <option value="">Select a goal...</option>
                  {goalOptions.filter(goal => !profile.goals.includes(goal)).map((goal, index) => (
                    <option key={index} value={goal}>{goal}</option>
                  ))}
                </select>
                <button
                  onClick={() => addGoal(newGoal)}
                  disabled={!newGoal}
                  className="px-6 py-3 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-lg hover:from-purple-500 hover:to-pink-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Goal
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {profile.goals.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No goals set yet. Add some goals to track your wellness journey!</p>
              ) : (
                profile.goals.map((goal, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-purple-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <Heart className="w-5 h-5 text-purple-600" />
                      <span className="text-purple-800">{goal}</span>
                    </div>
                    <button
                      onClick={() => removeGoal(goal)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Settings Panel */}
        <div className="space-y-6">
          {/* Preferences */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-mint-100">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-mint-400 to-green-400 rounded-full flex items-center justify-center">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Preferences</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-800">Notifications</p>
                    <p className="text-sm text-gray-500">Receive habit reminders</p>
                  </div>
                </div>
                <button
                  onClick={() => updatePreference('notifications', !profile.preferences.notifications)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    profile.preferences.notifications ? 'bg-green-400' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    profile.preferences.notifications ? 'translate-x-6' : 'translate-x-0.5'
                  }`}></div>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Heart className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-800">Daily Tips</p>
                    <p className="text-sm text-gray-500">Receive wellness tips</p>
                  </div>
                </div>
                <button
                  onClick={() => updatePreference('receiveTips', !profile.preferences.receiveTips)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    profile.preferences.receiveTips ? 'bg-pink-400' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    profile.preferences.receiveTips ? 'translate-x-6' : 'translate-x-0.5'
                  }`}></div>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {profile.preferences.darkMode ? <Moon className="w-5 h-5 text-gray-600" /> : <Sun className="w-5 h-5 text-gray-600" />}
                  <div>
                    <p className="font-medium text-gray-800">Dark Mode</p>
                    <p className="text-sm text-gray-500">Toggle app theme</p>
                  </div>
                </div>
                <button
                  onClick={() => updatePreference('darkMode', !profile.preferences.darkMode)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    profile.preferences.darkMode ? 'bg-purple-400' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    profile.preferences.darkMode ? 'translate-x-6' : 'translate-x-0.5'
                  }`}></div>
                </button>
              </div>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-yellow-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Progress</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Journal Entries</span>
                <span className="font-bold text-yellow-600">{userStats.journalEntries}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Mood Logs</span>
                <span className="font-bold text-purple-600">{userStats.moodLogs}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Habits Completed</span>
                <span className="font-bold text-green-600">{userStats.habitsCompleted}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Active Goals</span>
                <span className="font-bold text-pink-600">{userStats.activeGoals}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
