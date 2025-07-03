
import { supabaseService } from '../../services/supabaseService';
import { UserProfile, UserStats } from './types';

export const loadUserProfile = async (): Promise<UserProfile | null> => {
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

      return {
        name: profileData.full_name || '',
        email: profileData.email,
        dateOfBirth: profileData.date_of_birth || '',
        preferences: {
          receiveTips: preferences?.notifications || true,
          notifications: preferences?.notifications || true,
        },
        goals: userGoals
      };
    }
    return null;
  } catch (error) {
    console.error('Error loading user profile:', error);
    return null;
  }
};

export const loadUserStats = async (): Promise<UserStats> => {
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

    return {
      journalEntries: journalEntries.length,
      moodLogs: moodData.length,
      habitsCompleted: completedToday,
      activeGoals: userGoals.length
    };
  } catch (error) {
    console.error('Error loading user stats:', error);
    return {
      journalEntries: 0,
      moodLogs: 0,
      habitsCompleted: 0,
      activeGoals: 0
    };
  }
};

export const saveProfile = async (updatedProfile: UserProfile): Promise<void> => {
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
    throw error;
  }
};
