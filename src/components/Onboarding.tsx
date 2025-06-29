
import React, { useState } from 'react';
import { Heart, Target, Activity, Calendar, ArrowRight, Sparkles } from 'lucide-react';

interface OnboardingProps {
  onComplete: (data: {
    goals: string[];
    fitnessLevel: string;
    healthConditions: string[];
    dateOfBirth?: string;
  }) => void;
}

const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    goals: [] as string[],
    fitnessLevel: 'beginner',
    healthConditions: [] as string[],
    dateOfBirth: '',
  });

  const goalOptions = [
    'Improve mental health',
    'Build healthy habits',
    'Track menstrual cycle',
    'Better sleep',
    'Reduce stress',
    'Stay hydrated',
    'Exercise regularly',
    'Practice mindfulness',
  ];

  const healthConditions = [
    'PCOS',
    'Endometriosis',
    'Anxiety',
    'Depression',
    'Insomnia',
    'Migraines',
    'Diabetes',
    'None',
  ];

  const handleGoalToggle = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const handleHealthConditionToggle = (condition: string) => {
    if (condition === 'None') {
      setFormData(prev => ({ ...prev, healthConditions: ['None'] }));
    } else {
      setFormData(prev => ({
        ...prev,
        healthConditions: prev.healthConditions.includes('None')
          ? [condition]
          : prev.healthConditions.includes(condition)
          ? prev.healthConditions.filter(c => c !== condition)
          : [...prev.healthConditions.filter(c => c !== 'None'), condition]
      }));
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-mint-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-800 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-pink-100 dark:border-gray-700 p-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-pink-400 via-purple-400 to-mint-400 rounded-full flex items-center justify-center shadow-lg mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-mint-500 bg-clip-text text-transparent">
            Welcome to GlowUp!
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Let's personalize your wellness journey</p>
          
          {/* Progress bar */}
          <div className="flex items-center justify-center space-x-2 mt-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i <= step ? 'bg-purple-500' : 'bg-gray-200 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step 1: Goals */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center">
              <Target className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                What are your wellness goals?
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Select all that apply</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {goalOptions.map((goal) => (
                <button
                  key={goal}
                  onClick={() => handleGoalToggle(goal)}
                  className={`p-3 rounded-xl text-sm font-medium transition-all ${
                    formData.goals.includes(goal)
                      ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 border-2 border-purple-300'
                      : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-transparent hover:bg-purple-50 dark:hover:bg-purple-800'
                  }`}
                >
                  {goal}
                </button>
              ))}
            </div>
            
            <button
              onClick={nextStep}
              disabled={formData.goals.length === 0}
              className="w-full bg-gradient-to-r from-pink-400 via-purple-400 to-mint-400 text-white py-3 rounded-xl font-medium hover:from-pink-500 hover:via-purple-500 hover:to-mint-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2: Fitness Level & DOB */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <Activity className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                Tell us about yourself
              </h2>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Fitness Level
              </label>
              <div className="space-y-2">
                {['beginner', 'intermediate', 'advanced'].map((level) => (
                  <button
                    key={level}
                    onClick={() => setFormData(prev => ({ ...prev, fitnessLevel: level }))}
                    className={`w-full p-3 rounded-xl text-left transition-all ${
                      formData.fitnessLevel === level
                        ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 border-2 border-purple-300'
                        : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-transparent hover:bg-purple-50 dark:hover:bg-purple-800'
                    }`}
                  >
                    <span className="font-medium capitalize">{level}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Date of Birth (Optional)
              </label>
              <input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={prevStep}
                className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                className="flex-1 bg-gradient-to-r from-pink-400 via-purple-400 to-mint-400 text-white py-3 rounded-xl font-medium hover:from-pink-500 hover:via-purple-500 hover:to-mint-500 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Health Conditions */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center">
              <Heart className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                Health Information
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                This helps us provide better recommendations (Optional)
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {healthConditions.map((condition) => (
                <button
                  key={condition}
                  onClick={() => handleHealthConditionToggle(condition)}
                  className={`p-3 rounded-xl text-sm font-medium transition-all ${
                    formData.healthConditions.includes(condition)
                      ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 border-2 border-purple-300'
                      : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-transparent hover:bg-purple-50 dark:hover:bg-purple-800'
                  }`}
                >
                  {condition}
                </button>
              ))}
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={prevStep}
                className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
              >
                Back
              </button>
              <button
                onClick={() => onComplete(formData)}
                className="flex-1 bg-gradient-to-r from-pink-400 via-purple-400 to-mint-400 text-white py-3 rounded-xl font-medium hover:from-pink-500 hover:via-purple-500 hover:to-mint-500 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <span>Get Started</span>
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
