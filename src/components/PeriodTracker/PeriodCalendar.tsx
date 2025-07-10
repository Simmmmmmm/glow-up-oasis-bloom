
import React from 'react';
import { PeriodData } from './types';
import { calculateNextPeriod, calculateFertileWindow } from './utils';

interface PeriodCalendarProps {
  periodData: PeriodData;
  currentMonth: Date;
  setCurrentMonth: (date: Date) => void;
}

const PeriodCalendar = ({ periodData, currentMonth, setCurrentMonth }: PeriodCalendarProps) => {
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const getDayType = (day: number) => {
    if (!periodData.lastPeriodDate || !day) return 'normal';
    
    const checkDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const lastPeriod = new Date(periodData.lastPeriodDate);
    const nextPeriod = calculateNextPeriod(periodData);
    const fertile = calculateFertileWindow(periodData);
    
    // Fix: Use proper 24-hour calculation
    const daysDiff = Math.floor((checkDate.getTime() - lastPeriod.getTime()) / (1000 * 60 * 60 * 24));
    if (daysDiff >= 0 && daysDiff < periodData.periodLength) {
      return 'period';
    }
    
    // Check if this day is predicted period (within 7 days range of next period)
    if (nextPeriod) {
      const nextPeriodStart = new Date(nextPeriod);
      const daysDiffFromNextPeriod = Math.floor((checkDate.getTime() - nextPeriodStart.getTime()) / (1000 * 60 * 60 * 24));
      if (daysDiffFromNextPeriod >= 0 && daysDiffFromNextPeriod < periodData.periodLength) {
        return 'predicted-period';
      }
    }
    
    // Check fertile window
    if (fertile.start && fertile.end && checkDate >= fertile.start && checkDate <= fertile.end) {
      return 'fertile';
    }
    
    return 'normal';
  };

  const getDayStyle = (dayType: string) => {
    switch (dayType) {
      case 'period':
        return 'bg-red-200 dark:bg-red-900/50 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700';
      case 'predicted-period':
        return 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800 border-dashed';
      case 'fertile':
        return 'bg-green-200 dark:bg-green-900/50 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700';
      default:
        return 'bg-gray-50 dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600 text-gray-900 dark:text-gray-100';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-pink-100 dark:border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Cycle Calendar</h3>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
            className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full text-gray-600 dark:text-gray-300"
          >
            ←
          </button>
          <span className="font-medium text-gray-800 dark:text-gray-100">
            {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </span>
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
            className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full text-gray-600 dark:text-gray-300"
          >
            →
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 py-2">
            {day}
          </div>
        ))}
        
        {getDaysInMonth(currentMonth).map((day, index) => {
          if (day === null) {
            return <div key={index} className="aspect-square"></div>;
          }
          
          const dayType = getDayType(day);
          const dayStyle = getDayStyle(dayType);
          
          return (
            <div
              key={index}
              className={`aspect-square rounded-lg border-2 flex items-center justify-center cursor-pointer transition-colors ${dayStyle}`}
            >
              <span className="text-sm font-medium">{day}</span>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-100 dark:border-slate-600">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded bg-red-200 dark:bg-red-900/50 border-2 border-red-300 dark:border-red-700"></div>
          <span className="text-sm text-gray-600 dark:text-gray-300">Period</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded bg-red-100 dark:bg-red-900/30 border-2 border-red-200 dark:border-red-800 border-dashed"></div>
          <span className="text-sm text-gray-600 dark:text-gray-300">Predicted Period</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded bg-green-200 dark:bg-green-900/50 border-2 border-green-300 dark:border-green-700"></div>
          <span className="text-sm text-gray-600 dark:text-gray-300">Fertile Window</span>
        </div>
      </div>
    </div>
  );
};

export default PeriodCalendar;
