
import React, { useState } from 'react';
import { Target, Heart } from 'lucide-react';
import { UserProfile, goalOptions } from './types';

interface WellnessGoalsProps {
  profile: UserProfile;
  loading: boolean;
  onAddGoal: (goal: string) => Promise<void>;
  onRemoveGoal: (goal: string) => Promise<void>;
}

const WellnessGoals = ({ profile, loading, onAddGoal, onRemoveGoal }: WellnessGoalsProps) => {
  const [newGoal, setNewGoal] = useState('');

  const handleAddGoal = async () => {
    await onAddGoal(newGoal);
    setNewGoal('');
  };

  return (
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
            onClick={handleAddGoal}
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
                onClick={() => onRemoveGoal(goal)}
                className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm self-start sm:self-center"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WellnessGoals;
