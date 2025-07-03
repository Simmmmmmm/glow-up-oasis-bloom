import React, { useState, useEffect } from 'react';
import { Calendar, Heart, AlertCircle, Info } from 'lucide-react';
import { supabaseService } from '../services/supabaseService';
import { useAuth } from '../hooks/useAuth';

interface PeriodData {
  lastPeriodDate: string;
  cycleLength: number;
  periodLength: number;
  notes: string;
}

const PeriodTracker = () => {
  const [periodData, setPeriodData] = useState<PeriodData>({
    lastPeriodDate: '',
    cycleLength: 28,
    periodLength: 5,
    notes: ''
  });

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadPeriodData();
    }
  }, [user]);

  const loadPeriodData = async () => {
    if (!user) return;
    
    try {
      const periods = await supabaseService.getPeriodData();
      if (periods && periods.length > 0) {
        const lastPeriod = periods[periods.length - 1];
        setPeriodData({
          lastPeriodDate: lastPeriod.start_date,
          cycleLength: 28,
          periodLength: 5,
          notes: lastPeriod.symptoms?.join(', ') || ''
        });
      }
    } catch (error) {
      console.error('Error loading period data:', error);
    }
  };

  const savePeriodData = async (data: PeriodData) => {
    setPeriodData(data);
    
    if (!user || !data.lastPeriodDate) return;
    
    setLoading(true);
    try {
      const newPeriod = {
        start_date: data.lastPeriodDate,
        end_date: null,
        symptoms: data.notes ? data.notes.split(', ') : [],
        flow: 'normal'
      };
      
      await supabaseService.createPeriodEntry(newPeriod);
    } catch (error) {
      console.error('Error saving period data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateNextPeriod = () => {
    if (!periodData.lastPeriodDate) return null;
    const lastDate = new Date(periodData.lastPeriodDate);
    const nextDate = new Date(lastDate.getTime() + (periodData.cycleLength * 24 * 60 * 60 * 1000));
    return nextDate;
  };

  const calculateFertileWindow = () => {
    if (!periodData.lastPeriodDate) return { start: null, end: null };
    const lastDate = new Date(periodData.lastPeriodDate);
    const ovulationDay = periodData.cycleLength - 14;
    const fertileStart = new Date(lastDate.getTime() + ((ovulationDay - 5) * 24 * 60 * 60 * 1000));
    const fertileEnd = new Date(lastDate.getTime() + ((ovulationDay + 1) * 24 * 60 * 60 * 1000));
    return { start: fertileStart, end: fertileEnd };
  };

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
    const nextPeriod = calculateNextPeriod();
    const fertile = calculateFertileWindow();
    
    // Check if it's period day
    const daysDiff = Math.floor((checkDate.getTime() - lastPeriod.getTime()) / (1000 * 60 * 60 * 24));
    if (daysDiff >= 0 && daysDiff < periodData.periodLength) {
      return 'period';
    }
    
    // Check if it's next period
    if (nextPeriod && Math.abs(checkDate.getTime() - nextPeriod.getTime()) < (24 * 60 * 60 * 1000)) {
      return 'predicted-period';
    }
    
    // Check if it's fertile window
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

  const nextPeriod = calculateNextPeriod();
  const fertile = calculateFertileWindow();
  const daysUntilNext = nextPeriod ? Math.ceil((nextPeriod.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : null;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Period Tracker</h2>
        <p className="text-gray-600 dark:text-gray-300">Track your menstrual cycle and stay informed about your body</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar View */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-pink-100 dark:border-slate-700">
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

        {/* Tracking Info */}
        <div className="space-y-6">
          {/* Quick Stats */}
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

          {/* Log Period */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-pink-100 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Log Your Period</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Last Period Start Date
                </label>
                <input
                  type="date"
                  value={periodData.lastPeriodDate}
                  onChange={(e) => savePeriodData({ ...periodData, lastPeriodDate: e.target.value })}
                  className="w-full p-3 border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-pink-300 dark:focus:ring-pink-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Cycle Length (days)
                </label>
                <input
                  type="number"
                  min="21"
                  max="35"
                  value={periodData.cycleLength}
                  onChange={(e) => savePeriodData({ ...periodData, cycleLength: parseInt(e.target.value) })}
                  className="w-full p-3 border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-pink-300 dark:focus:ring-pink-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Period Length (days)
                </label>
                <input
                  type="number"
                  min="3"
                  max="7"
                  value={periodData.periodLength}
                  onChange={(e) => savePeriodData({ ...periodData, periodLength: parseInt(e.target.value) })}
                  className="w-full p-3 border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-pink-300 dark:focus:ring-pink-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Notes (optional)
                </label>
                <textarea
                  value={periodData.notes}
                  onChange={(e) => savePeriodData({ ...periodData, notes: e.target.value })}
                  placeholder="Any symptoms, mood changes, etc..."
                  className="w-full p-3 border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-pink-300 dark:focus:ring-pink-500 focus:border-transparent resize-none h-20 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Health Tips */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-purple-100 dark:border-slate-700">
            <div className="flex items-center space-x-2 mb-4">
              <Info className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Cycle Tips</h3>
            </div>
            
            <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <p>🌸 Track your symptoms to understand your unique cycle patterns</p>
              <p>💧 Stay hydrated, especially during your period</p>
              <p>🧘‍♀️ Practice gentle yoga or stretching for cramps</p>
              <p>🥗 Eat iron-rich foods during menstruation</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeriodTracker;
