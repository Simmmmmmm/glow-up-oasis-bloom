
export interface UserProfile {
  name: string;
  email: string;
  dateOfBirth: string;
  preferences: {
    receiveTips: boolean;
    notifications: boolean;
  };
  goals: string[];
}

export interface UserStats {
  journalEntries: number;
  moodLogs: number;
  habitsCompleted: number;
  activeGoals: number;
}

export const goalOptions = [
  'Drink 8 glasses of water daily',
  'Get 8+ hours of sleep',
  'Exercise 3 times a week',
  'Practice daily skincare routine',
  'Meditate for 10 minutes',
  'Journal every day',
  'Eat 5 servings of fruits/vegetables',
  'Take vitamins regularly',
  'Practice gratitude',
  'Limit screen time before bed'
];
