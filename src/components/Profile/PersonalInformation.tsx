
import React from 'react';
import { User } from 'lucide-react';
import { UserProfile } from './types';

interface PersonalInformationProps {
  profile: UserProfile;
  setProfile: (profile: UserProfile) => void;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  loading: boolean;
  onSave: () => Promise<void>;
}

const PersonalInformation = ({
  profile,
  setProfile,
  isEditing,
  setIsEditing,
  loading,
  onSave
}: PersonalInformationProps) => {
  const handleSave = async () => {
    await onSave();
    setIsEditing(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-sm border border-pink-100 dark:border-gray-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">Personal Information</h3>
        </div>
        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
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
  );
};

export default PersonalInformation;
