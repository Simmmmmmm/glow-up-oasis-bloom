
import React from 'react';
import { Settings, Bell, Heart } from 'lucide-react';
import { UserProfile } from './types';

interface PreferencesPanelProps {
  profile: UserProfile;
  onUpdatePreference: (key: keyof UserProfile['preferences'], value: boolean) => Promise<void>;
}

const PreferencesPanel = ({ profile, onUpdatePreference }: PreferencesPanelProps) => {
  return (
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
            onClick={() => onUpdatePreference('notifications', !profile.preferences.notifications)}
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
            onClick={() => onUpdatePreference('receiveTips', !profile.preferences.receiveTips)}
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
  );
};

export default PreferencesPanel;
