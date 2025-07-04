
import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { UserProfile, UserStats } from './Profile/types';
import { loadUserProfile, loadUserStats, saveProfile } from './Profile/profileUtils';
import ProfileHeader from './Profile/ProfileHeader';
import PersonalInformation from './Profile/PersonalInformation';
import WellnessGoals from './Profile/WellnessGoals';
import PreferencesPanel from './Profile/PreferencesPanel';
import StatsPanel from './Profile/StatsPanel';
import LogoutPanel from './Profile/LogoutPanel';

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

  const [isEditing, setIsEditing] = useState(false);
  const [userStats, setUserStats] = useState<UserStats>({
    journalEntries: 0,
    moodLogs: 0,
    habitsCompleted: 0,
    activeGoals: 0
  });
  const [loading, setLoading] = useState(false);
  const { user, signOut, userProfile, refreshProfile } = useAuth();

  useEffect(() => {
    if (user) {
      loadUserProfileData();
      loadUserStatsData();
    }
  }, [user, userProfile]);

  const loadUserProfileData = async () => {
    const profileData = await loadUserProfile();
    if (profileData) {
      setProfile(profileData);
    }
  };

  const loadUserStatsData = async () => {
    const stats = await loadUserStats();
    setUserStats(stats);
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      await saveProfile(profile);
      // Refresh the auth profile to sync changes across the app
      await refreshProfile();
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddGoal = async (goal: string) => {
    if (goal && !profile.goals.includes(goal)) {
      const updatedProfile = {
        ...profile,
        goals: [...profile.goals, goal]
      };
      setProfile(updatedProfile);
      
      setLoading(true);
      try {
        await saveProfile(updatedProfile);
        setUserStats(prev => ({ ...prev, activeGoals: prev.activeGoals + 1 }));
      } catch (error) {
        console.error('Error adding goal:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleRemoveGoal = async (goalToRemove: string) => {
    const updatedProfile = {
      ...profile,
      goals: profile.goals.filter(goal => goal !== goalToRemove)
    };
    setProfile(updatedProfile);
    
    setLoading(true);
    try {
      await saveProfile(updatedProfile);
      setUserStats(prev => ({ ...prev, activeGoals: Math.max(0, prev.activeGoals - 1) }));
    } catch (error) {
      console.error('Error removing goal:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePreference = async (key: keyof UserProfile['preferences'], value: boolean) => {
    const updatedProfile = {
      ...profile,
      preferences: {
        ...profile.preferences,
        [key]: value
      }
    };
    setProfile(updatedProfile);
    
    setLoading(true);
    try {
      await saveProfile(updatedProfile);
    } catch (error) {
      console.error('Error updating preference:', error);
    } finally {
      setLoading(false);
    }
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
      <ProfileHeader
        title="Profile & Settings"
        description="Customize your GlowUp experience"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          <PersonalInformation
            profile={profile}
            setProfile={setProfile}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            loading={loading}
            onSave={handleSaveProfile}
          />

          <WellnessGoals
            profile={profile}
            loading={loading}
            onAddGoal={handleAddGoal}
            onRemoveGoal={handleRemoveGoal}
          />
        </div>

        {/* Settings Panel */}
        <div className="space-y-6">
          <PreferencesPanel
            profile={profile}
            onUpdatePreference={handleUpdatePreference}
          />

          <StatsPanel userStats={userStats} />

          <LogoutPanel onLogout={handleLogout} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
