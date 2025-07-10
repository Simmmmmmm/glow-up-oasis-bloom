
import { CyclePhase } from './types';

export const cyclePhases: Record<string, CyclePhase> = {
  menstrual: {
    name: 'Menstrual Phase',
    description: 'Days 1-5: Your period is here',
    tips: [
      '🌸 Use a heating pad for cramps relief',
      '💧 Stay extra hydrated to replace lost fluids',
      '🧘‍♀️ Practice gentle yoga or light stretching',
      '🥗 Eat iron-rich foods like spinach and lean meats',
      '😴 Get plenty of rest - your body is working hard',
      '🛁 Take warm baths to soothe muscle tension',
      '🍫 Dark chocolate can help with cramps and mood'
    ],
    color: 'text-red-600 dark:text-red-400',
    bgColor: 'bg-red-50 dark:bg-red-900/30',
    borderColor: 'border-red-200 dark:border-red-800'
  },
  follicular: {
    name: 'Follicular Phase',
    description: 'Days 1-13: Energy is building',
    tips: [
      '💪 Great time to start new workout routines',
      '🧠 Take advantage of increased focus and creativity',
      '🥬 Focus on fresh, nutrient-dense foods',
      '☀️ Get morning sunlight to boost mood',
      '📚 Perfect time for learning new skills',
      '🎯 Set and work toward new goals',
      '🌱 Try meal prepping for the week ahead'
    ],
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-50 dark:bg-green-900/30',
    borderColor: 'border-green-200 dark:border-green-800'
  },
  ovulatory: {
    name: 'Ovulatory Phase',
    description: 'Days 12-16: Peak energy and fertility',
    tips: [
      '🔥 Energy levels are at their highest',
      '💬 Great time for important conversations',
      '🏃‍♀️ Try high-intensity workouts',
      '🥑 Eat healthy fats to support hormone production',
      '🌟 Confidence is naturally higher',
      '💼 Schedule important meetings or presentations',
      '🎉 Social activities feel more enjoyable'
    ],
    color: 'text-orange-600 dark:text-orange-400',
    bgColor: 'bg-orange-50 dark:bg-orange-900/30',
    borderColor: 'border-orange-200 dark:border-orange-800'
  },
  luteal: {
    name: 'Luteal Phase',
    description: 'Days 15-28: Winding down toward next cycle',
    tips: [
      '🧘‍♀️ Focus on gentle, restorative activities',
      '🍠 Eat complex carbs to stabilize mood',
      '📝 Journal to process emotions',
      '💤 Prioritize quality sleep',
      '🫖 Try herbal teas like chamomile',
      '🛀 Take relaxing baths with magnesium',
      '🤗 Practice self-compassion and patience'
    ],
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-50 dark:bg-purple-900/30',
    borderColor: 'border-purple-200 dark:border-purple-800'
  }
};
