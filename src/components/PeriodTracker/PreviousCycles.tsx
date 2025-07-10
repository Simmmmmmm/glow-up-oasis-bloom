
import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { formatCycleInfo } from './utils';

interface PreviousCyclesProps {
  existingPeriods: any[];
  loading: boolean;
  onAddCycle: (cycleData: any) => void;
  onDeleteCycle: (cycleId: string) => void;
}

const PreviousCycles = ({ existingPeriods, loading, onAddCycle, onDeleteCycle }: PreviousCyclesProps) => {
  const [showPreviousCycles, setShowPreviousCycles] = useState(false);
  const [newCycleEntry, setNewCycleEntry] = useState({
    start_date: '',
    end_date: '',
    symptoms: [] as string[],
    flow: 'normal'
  });

  const addPreviousCycle = () => {
    if (!newCycleEntry.start_date) return;

    const cycleData = {
      start_date: newCycleEntry.start_date,
      end_date: newCycleEntry.end_date || null,
      symptoms: newCycleEntry.symptoms,
      flow: newCycleEntry.flow
    };
    
    onAddCycle(cycleData);
    
    // Reset form
    setNewCycleEntry({
      start_date: '',
      end_date: '',
      symptoms: [],
      flow: 'normal'
    });
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-purple-100 dark:border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Previous Cycles</h3>
        <button
          onClick={() => setShowPreviousCycles(!showPreviousCycles)}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Previous Cycle</span>
        </button>
      </div>

      {/* Add Previous Cycle Form */}
      {showPreviousCycles && (
        <div className="mb-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
          <h4 className="text-sm font-medium text-purple-700 dark:text-purple-300 mb-3">Add Previous Cycle</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={newCycleEntry.start_date}
                onChange={(e) => setNewCycleEntry({...newCycleEntry, start_date: e.target.value})}
                className="w-full p-2 border border-gray-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                End Date (Optional)
              </label>
              <input
                type="date"
                value={newCycleEntry.end_date}
                onChange={(e) => setNewCycleEntry({...newCycleEntry, end_date: e.target.value})}
                className="w-full p-2 border border-gray-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
              Flow
            </label>
            <select
              value={newCycleEntry.flow}
              onChange={(e) => setNewCycleEntry({...newCycleEntry, flow: e.target.value})}
              className="w-full p-2 border border-gray-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100"
            >
              <option value="light">Light</option>
              <option value="normal">Normal</option>
              <option value="heavy">Heavy</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setShowPreviousCycles(false)}
              className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={addPreviousCycle}
              disabled={!newCycleEntry.start_date || loading}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
            >
              Add Cycle
            </button>
          </div>
        </div>
      )}

      {/* Previous Cycles List */}
      <div className="space-y-4">
        {existingPeriods.slice(-5).reverse().map((cycle, index) => {
          const cycleInfo = formatCycleInfo(cycle);
          return (
            <div key={cycle.id || index} className="p-4 bg-gray-50 dark:bg-slate-700 rounded-lg border border-gray-200 dark:border-slate-600">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-4">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                    {cycleInfo.month}
                  </h4>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    cycleInfo.flow === 'heavy' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' :
                    cycleInfo.flow === 'light' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' :
                    'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                  }`}>
                    {cycleInfo.flow} flow
                  </span>
                </div>
                <button
                  onClick={() => onDeleteCycle(cycle.id)}
                  disabled={loading}
                  className="p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors disabled:opacity-50"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                <div>
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Start Date</span>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{cycleInfo.startDate}</p>
                </div>
                <div>
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">End Date</span>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{cycleInfo.endDate}</p>
                </div>
                <div>
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Duration</span>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                    {typeof cycleInfo.duration === 'number' ? `${cycleInfo.duration} days` : cycleInfo.duration}
                  </p>
                </div>
              </div>
              
              {cycleInfo.symptoms.length > 0 && (
                <div>
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Symptoms</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {cycleInfo.symptoms.map((symptom, idx) => (
                      <span key={idx} className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs">
                        {symptom}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {existingPeriods.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            No previous cycles recorded yet
          </p>
        )}
      </div>
    </div>
  );
};

export default PreviousCycles;
