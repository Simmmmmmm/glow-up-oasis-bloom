
import React, { useState } from 'react';
import { Info } from 'lucide-react';
import { CyclePhase } from './types';
import { cyclePhases } from './cyclePhases';

interface PhaseTipsProps {
  currentPhaseData: CyclePhase;
  currentPhase: string;
}

const PhaseTips = ({ currentPhaseData, currentPhase }: PhaseTipsProps) => {
  const [selectedPhase, setSelectedPhase] = useState(currentPhase);
  const displayPhaseData = cyclePhases[selectedPhase] || currentPhaseData;

  return (
    <div className={`${displayPhaseData.bgColor} rounded-2xl p-6 shadow-sm border ${displayPhaseData.borderColor}`}>
      <div className="flex items-center space-x-2 mb-4">
        <Info className={`w-5 h-5 ${displayPhaseData.color}`} />
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          {displayPhaseData.name} Tips
        </h3>
      </div>
      
      <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
        {displayPhaseData.tips.map((tip, index) => (
          <p key={index} className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-2">
            {tip}
          </p>
        ))}
      </div>

      {/* Phase Selection */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">View tips for other phases:</p>
        <div className="flex flex-wrap gap-2">
          {Object.entries(cyclePhases).map(([key, phase]) => (
            <button
              key={key}
              onClick={() => setSelectedPhase(key)}
              className={`px-2 py-1 rounded text-xs ${
                key === currentPhase
                  ? phase.color + ' font-medium'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              {phase.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhaseTips;
