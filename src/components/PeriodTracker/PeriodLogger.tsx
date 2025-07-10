
import React, { useState } from 'react';
import { Plus, Settings, Edit3, Save } from 'lucide-react';
import { PeriodData, TrackingFields } from './types';

interface PeriodLoggerProps {
  periodData: PeriodData;
  loading: boolean;
  onInputChange: (field: keyof PeriodData, value: string | number) => void;
  onSave: () => void;
}

const PeriodLogger = ({ periodData, loading, onInputChange, onSave }: PeriodLoggerProps) => {
  const [showCustomization, setShowCustomization] = useState(false);
  const [showCycleCustomization, setShowCycleCustomization] = useState(false);
  const [trackingFields, setTrackingFields] = useState<TrackingFields>({
    symptoms: true,
    flow: true,
    mood: true,
    exercise: false,
    sleep: false,
    temperature: false
  });
  const [customSymptoms, setCustomSymptoms] = useState<string[]>([
    'Cramps', 'Headache', 'Bloating', 'Fatigue', 'Mood swings', 'Back pain'
  ]);

  const addCustomSymptom = () => {
    const newSymptom = prompt('Enter a new symptom to track:');
    if (newSymptom && !customSymptoms.includes(newSymptom)) {
      setCustomSymptoms([...customSymptoms, newSymptom]);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-pink-100 dark:border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Log Your Period</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowCycleCustomization(!showCycleCustomization)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full text-gray-600 dark:text-gray-300"
            title="Customize cycle settings"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setShowCustomization(!showCustomization)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full text-gray-600 dark:text-gray-300"
            title="Customize tracking fields"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Cycle Customization */}
      {showCycleCustomization && (
        <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
          <h4 className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-3">Cycle Settings</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Cycle Length (days)
              </label>
              <input
                type="range"
                min="21"
                max="45"
                value={periodData.cycleLength}
                onChange={(e) => onInputChange('cycleLength', parseInt(e.target.value))}
                className="w-full"
              />
              <span className="text-xs text-gray-500 dark:text-gray-400">{periodData.cycleLength} days</span>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Period Length (days)
              </label>
              <input
                type="range"
                min="2"
                max="10"
                value={periodData.periodLength}
                onChange={(e) => onInputChange('periodLength', parseInt(e.target.value))}
                className="w-full"
              />
              <span className="text-xs text-gray-500 dark:text-gray-400">{periodData.periodLength} days</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Adjust these settings to match your unique cycle pattern
          </p>
        </div>
      )}

      {/* Tracking Fields Customization */}
      {showCustomization && (
        <div className="mb-4 p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Customize Tracking</h4>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(trackingFields).map(([field, enabled]) => (
              <label key={field} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={enabled}
                  onChange={(e) => setTrackingFields({
                    ...trackingFields,
                    [field]: e.target.checked
                  })}
                  className="rounded"
                />
                <span className="text-sm text-gray-600 dark:text-gray-300 capitalize">
                  {field}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Last Period Start Date
          </label>
          <input
            type="date"
            value={periodData.lastPeriodDate}
            onChange={(e) => onInputChange('lastPeriodDate', e.target.value)}
            disabled={loading}
            className="w-full p-3 border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-pink-300 dark:focus:ring-pink-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 disabled:opacity-50"
          />
        </div>

        {trackingFields.symptoms && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Symptoms
              </label>
              <button
                onClick={addCustomSymptom}
                className="text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              {customSymptoms.map((symptom) => (
                <button
                  key={symptom}
                  onClick={() => {
                    const current = periodData.notes.split(', ').filter(s => s.trim());
                    const updated = current.includes(symptom)
                      ? current.filter(s => s !== symptom)
                      : [...current, symptom];
                    onInputChange('notes', updated.join(', '));
                  }}
                  className={`px-3 py-1 rounded-full text-xs border ${
                    periodData.notes.includes(symptom)
                      ? 'bg-pink-100 dark:bg-pink-900/30 border-pink-300 dark:border-pink-700 text-pink-700 dark:text-pink-300'
                      : 'border-gray-200 dark:border-slate-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700'
                  }`}
                >
                  {symptom}
                </button>
              ))}
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Additional Notes
          </label>
          <textarea
            value={periodData.notes}
            onChange={(e) => onInputChange('notes', e.target.value)}
            placeholder="Any additional symptoms, notes, or observations..."
            disabled={loading}
            className="w-full p-3 border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-pink-300 dark:focus:ring-pink-500 focus:border-transparent resize-none h-20 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 disabled:opacity-50"
          ></textarea>
        </div>

        {/* Save Button */}
        <button
          onClick={onSave}
          disabled={loading || !periodData.lastPeriodDate}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>{loading ? 'Saving...' : 'Save Period Data'}</span>
        </button>
      </div>
    </div>
  );
};

export default PeriodLogger;
