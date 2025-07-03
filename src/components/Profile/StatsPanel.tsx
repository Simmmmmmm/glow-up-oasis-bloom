
import React from 'react';
import { UserStats } from './types';

interface StatsPanelProps {
  userStats: UserStats;
}

const StatsPanel = ({ userStats }: StatsPanelProps) => {
  return (
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
  );
};

export default StatsPanel;
