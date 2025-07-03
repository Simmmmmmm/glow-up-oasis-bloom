
import React from 'react';
import { LogOut } from 'lucide-react';

interface LogoutPanelProps {
  onLogout: () => Promise<void>;
}

const LogoutPanel = ({ onLogout }: LogoutPanelProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-sm border border-red-100 dark:border-gray-700">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-red-400 to-pink-400 rounded-full flex items-center justify-center">
          <LogOut className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </div>
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">Account</h3>
      </div>
      
      <button
        onClick={onLogout}
        className="w-full px-4 py-3 bg-gradient-to-r from-red-400 to-pink-400 text-white rounded-lg hover:from-red-500 hover:to-pink-500 transition-all duration-200 font-medium text-sm sm:text-base"
      >
        Logout
      </button>
    </div>
  );
};

export default LogoutPanel;
