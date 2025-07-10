
import React from 'react';
import { Calendar, Heart } from 'lucide-react';
import { PeriodData } from './types';
import { calculateNextPeriod, calculateFertileWindow } from './utils';

interface CycleOverviewProps {
  periodData: PeriodData;
}

const CycleOverview = ({ periodData }: CycleOverviewProps) => {
  const nextPeriod = calculateNextPeriod(periodData);
  const fertile = calculateFertileWindow(periodData);
  const daysUntilNext = nextPeriod ? Math.ceil((nextPeriod.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : null;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-red-100 dark:border-slate-700">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Cycle Overview</h3>
      
      {nextPeriod && (
        <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/30 rounded-xl">
          <div className="flex items-center space-x-2 mb-2">
            <Calendar className="w-5 h-5 text-red-600 dark:text-red-400" />
            <span className="font-medium text-red-800 dark:text-red-300">Next Period</span>
          </div>
          <p className="text-red-700 dark:text-red-300">
            {nextPeriod.toLocaleDateString()} ({daysUntilNext} days)
          </p>
        </div>
      )}

      {fertile.start && fertile.end && (
        <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/30 rounded-xl">
          <div className="flex items-center space-x-2 mb-2">
            <Heart className="w-5 h-5 text-green-600 dark:text-green-400" />
            <span className="font-medium text-green-800 dark:text-green-300">Fertile Window</span>
          </div>
          <p className="text-green-700 dark:text-green-300 text-sm">
            {fertile.start.toLocaleDateString()} - {fertile.end.toLocaleDateString()}
          </p>
        </div>
      )}

      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-300">Cycle Length:</span>
          <span className="font-medium text-gray-800 dark:text-gray-100">{periodData.cycleLength} days</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-300">Period Length:</span>
          <span className="font-medium text-gray-800 dark:text-gray-100">{periodData.periodLength} days</span>
        </div>
      </div>
    </div>
  );
};

export default CycleOverview;
