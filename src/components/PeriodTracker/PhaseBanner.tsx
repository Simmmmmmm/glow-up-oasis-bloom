
import React from 'react';
import { Heart } from 'lucide-react';
import { CyclePhase } from './types';

interface PhaseBannerProps {
  currentPhaseData: CyclePhase;
}

const PhaseBanner = ({ currentPhaseData }: PhaseBannerProps) => {
  return (
    <div className={`${currentPhaseData.bgColor} rounded-2xl p-6 mb-8 shadow-sm border ${currentPhaseData.borderColor}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className={`text-xl font-semibold ${currentPhaseData.color}`}>
            {currentPhaseData.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">{currentPhaseData.description}</p>
        </div>
        <Heart className={`w-8 h-8 ${currentPhaseData.color}`} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {currentPhaseData.tips.slice(0, 3).map((tip, index) => (
          <p key={index} className="text-sm text-gray-700 dark:text-gray-300 bg-white/50 dark:bg-gray-800/50 rounded-lg p-2">
            {tip}
          </p>
        ))}
      </div>
    </div>
  );
};

export default PhaseBanner;
