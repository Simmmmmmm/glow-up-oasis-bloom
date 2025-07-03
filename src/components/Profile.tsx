
import React, { useState, useEffect } from 'react';
import { User, Settings, Bell, Heart, Target, LogOut } from 'lucide-react';
import { supabaseService } from '../services/supabaseService';
import { useAuth } from '../hooks/useAuth';

interface UserProfile {
  name: string;
  email: string;
  dateOfBirth: string;
  preferences: {
    receiveTips: boolean;
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
      notifications: true,
    },
    goals: []
  });

  const [newGoal, setNewGoal] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [userStats, setUserStats] = useState({
    journalEntries: 0,
    moodLogs: 0,
    habitsCompleted: 0,
    activeGoals: 0
  });
  const [loading, setLoading] = useState(false);
  const { user, signOut } = useAuth();

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
    if (user) {
      loadUserProfile();
      loadUserStats();
    }
  }, [user]);

  const loadUserProfile = async () => {
    if (!user) return;
    
    try {
      const [profileData, userData] = await Promise.all([
        supabaseService.getProfile(),
        supabaseService.getUserData()
      ]);
      
      if (profileData) {
        // Type-safe access to Json fields with proper type guards
        const preferences = userData?.preferences && typeof userData.preferences === 'object' && userData.preferences !== null
          ? userData.preferences as { notifications?: boolean }
          : { notifications: true };
        
        const userGoals = userData?.profile && typeof userData.profile === 'object' && userData.profile !== null
          ? (userData.profile as { goals?: string[] })?.goals || []
          : [];

        setProfile({
          name: profileData.full_name || '',
          email: profileData.email,
          dateOfBirth: profileData.date_of_birth || '',
          preferences: {
            receiveTips: preferences?.notifications || true,
            notifications: preferences?.notifications || true,
          },
          goals: userGoals
        });
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  };

  const loadUserStats = async () => {
    if (!user) return;
    
    try {
      const [journalEntries, habits, moodData, userData] = await Promise.all([
        supabaseService.getJournalEntries(),
        supabaseService.getHabits(),
        supabaseService.getMoodData(),
        supabaseService.getUserData()
      ]);

      const today = new Date().toISOString().split('T')[0];
      const completedToday = habits.filter(habit => 
        habit.completed_dates?.includes(today)
      ).length;

      // Type-safe access to goals
      const userGoals = userData?.profile && typeof userData.profile === 'object' && userData.profile !== null
        ? (userData.profile as { goals?: string[] })?.goals || []
        : [];

      setUserStats({
        journalEntries: journalEntries.length,
        moodLogs: moodData.length,
        habitsCompleted: completedToday,
        activeGoals: userGoals.length
      });
    } catch (error) {
      console.error('Error loading user stats:', error);
    }
  };

  const saveProfile = async (updatedProfile: UserProfile) => {
    setProfile(updatedProfile);
    
    if (!user) return;
    
    setLoading(true);
    try {
      // Update profile data
      await supabaseService.updateProfile({
        full_name: updatedProfile.name,
        date_of_birth: updatedProfile.dateOfBirth || null
      });

      // Update user data with goals and preferences
      const userData = await supabaseService.getUserData();
      
      // Type-safe spreading with proper type guards
      const currentPreferences = userData?.preferences && typeof userData.preferences === 'object' && userData.preferences !== null
        ? userData.preferences as Record<string, any>
        : {};
      
      const currentProfile = userData?.profile && typeof userData.profile === 'object' && userData.profile !== null
        ? userData.profile as Record<string, any>
        : {};

      await supabaseService.updateUserData({
        preferences: {
          ...currentPreferences,
          notifications: updatedProfile.preferences.notifications
        },
        profile: {
          ...currentProfile,
          goals: updatedProfile.goals
        }
      });
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const addGoal = async (goal: string) => {
    if (goal && !profile.goals.includes(goal)) {
      const updatedProfile = {
        ...profile,
        goals: [...profile.goals, goal]
      };
      await saveProfile(updatedProfile);
      setNewGoal('');
      setUserStats(prev => ({ ...prev, activeGoals: prev.activeGoals + 1 }));
    }
  };

  const removeGoal = async (goalToRemove: string) => {
    const updatedProfile = {
      ...profile,
      goals: profile.goals.filter(goal => goal !== goalToRemove)
    };
    await saveProfile(updatedProfile);
    setUserStats(prev => ({ ...prev, activeGoals: Math.max(0, prev.activeGoals - 1) }));
  };

  const updatePreference = async (key: keyof UserProfile['preferences'], value: boolean) => {
    const updatedProfile = {
      ...profile,
      preferences: {
        ...profile.preferences,
        [key]: value
      }
    };
    await saveProfile(updatedProfile);
  };

  const handleSaveBasicInfo = async () => {
    await saveProfile(profile);
    setIsEditing(false);
  };

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-2">Profile & Settings</h2>
        <p className="text-gray-600 dark:text-gray-300">Customize your GlowUp experience</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-sm border border-pink-100 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">Personal Information</h3>
              </div>
              <button
                onClick={() => isEditing ? handleSaveBasicInfo() : setIsEditing(true)}
                disabled={loading}
                className="px-4 py-2 bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 rounded-lg hover:bg-pink-200 dark:hover:bg-pink-900/50 transition-colors text-sm sm:text-base disabled:opacity-50"
              >
                {loading ? 'Saving...' : isEditing ? 'Save' : 'Edit'}
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  disabled={!isEditing}
                  className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-300 dark:focus:ring-pink-400 focus:border-transparent disabled:bg-gray-50 dark:disabled:bg-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                <input
                  type="email"
                  value={profile.email}
                  disabled={true}
                  className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg disabled:bg-gray-50 dark:disabled:bg-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date of Birth</label>
                <input
                  type="date"
                  value={profile.dateOfBirth}
                  onChange={(e) => setProfile({ ...profile, dateOfBirth: e.target.value })}
                  disabled={!isEditing}
                  className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-300 dark:focus:ring-pink-400 focus:border-transparent disabled:bg-gray-50 dark:disabled:bg-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Wellness Goals */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-sm border border-purple-100 dark:border-gray-700">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                <Target className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">Wellness Goals</h3>
            </div>

            <div className="mb-6">
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <select
                  value={newGoal}
                  onChange={(e) => setNewGoal(e.target.value)}
                  className="flex-1 p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Select a goal...</option>
                  {goalOptions.filter(goal => !profile.goals.includes(goal)).map((goal, index) => (
                    <option key={index} value={goal}>{goal}</option>
                  ))}
                </select>
                <button
                  onClick={() => addGoal(newGoal)}
                  disabled={!newGoal || loading}
                  className="px-4 sm:px-6 py-3 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-lg hover:from-purple-500 hover:to-pink-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  Add Goal
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {profile.goals.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8 text-sm sm:text-base">No goals set yet. Add some goals to track your wellness journey!</p>
              ) : (
                profile.goals.map((goal, index) => (
                  <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl gap-3">
                    <div className="flex items-center space-x-3">
                      <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                      <span className="text-purple-800 dark:text-purple-300 text-sm sm:text-base">{goal}</span>
                    </div>
                    <button
                      onClick={() => removeGoal(goal)}
                      className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm self-start sm:self-center"
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
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-sm border border-mint-100 dark:border-gray-700">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-mint-400 to-green-400 rounded-full flex items-center justify-center">
                <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">Preferences</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white text-sm sm:text-base">Notifications</p>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Receive habit reminders</p>
                  </div>
                </div>
                <button
                  onClick={() => updatePreference('notifications', !profile.preferences.notifications)}
                  className={`w-10 h-5 sm:w-12 sm:h-6 rounded-full transition-colors ${
                    profile.preferences.notifications ? 'bg-green-400' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <div className={`w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full shadow transition-transform ${
                    profile.preferences.notifications ? 'translate-x-5 sm:translate-x-6' : 'translate-x-0.5'
                  }`}></div>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white text-sm sm:text-base">Daily Tips</p>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Receive wellness tips</p>
                  </div>
                </div>
                <button
                  onClick={() => updatePreference('receiveTips', !profile.preferences.receiveTips)}
                  className={`w-10 h-5 sm:w-12 sm:h-6 rounded-full transition-colors ${
                    profile.preferences.receiveTips ? 'bg-pink-400' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <div className={`w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full shadow transition-transform ${
                    profile.preferences.receiveTips ? 'translate-x-5 sm:translate-x-6' : 'translate-x-0.5'
                  }`}></div>
                </button>
              </div>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-sm border border-yellow-100 dark:border-gray-700">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white mb-4">Your Progress</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Journal Entries</span>
                <span className="font-bold text-yellow-600 dark:text-yellow-400">{userStats.journalEntries}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Mood Logs</span>
                <span className="font-bold text-purple-600 dark:text-purple-400">{userStats.moodLogs}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Habits Completed</span>
                <span className="font-bold text-green-600 dark:text-green-400">{userStats.habitsCompleted}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Active Goals</span>
                <span className="font-bold text-pink-600 dark:text-pink-400">{userStats.activeGoals}</span>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-sm border border-red-100 dark:border-gray-700">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-red-400 to-pink-400 rounded-full flex items-center justify-center">
                <LogOut className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">Account</h3>
            </div>
            
            <button
              onClick={handleLogout}
              className="w-full px-4 py-3 bg-gradient-to-r from-red-400 to-pink-400 text-white rounded-lg hover:from-red-500 hover:to-pink-500 transition-all duration-200 font-medium text-sm sm:text-base"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
