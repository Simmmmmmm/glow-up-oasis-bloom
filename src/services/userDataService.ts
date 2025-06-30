
interface UserData {
  email: string;
  name: string;
  preferences: {
    theme: 'light' | 'dark';
    notifications: boolean;
    reminderTime: string;
  };
  profile: {
    dateOfBirth?: string;
    goals: string[];
    fitnessLevel: string;
    healthConditions: string[];
  };
  journalEntries: Array<{
    id: string;
    date: string;
    title: string;
    content: string;
    mood: string;
    tags: string[];
  }>;
  habits: Array<{
    id: string;
    name: string;
    category: string;
    frequency: string;
    completedDates: string[];
    streak: number;
  }>;
  moodData: Array<{
    date: string;
    mood: string;
    note: string;
    energy: number;
    sleep: number;
  }>;
  periodData: {
    cycles: Array<{
      startDate: string;
      endDate?: string;
      symptoms: string[];
      flow: string;
    }>;
    predictions: {
      nextPeriod?: string;
      fertileWindow?: { start: string; end: string };
    };
  };
}

export const userDataService = {
  getUserData: (email: string): UserData | null => {
    try {
      const data = localStorage.getItem(`glowup_user_${email}`);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error retrieving user data:', error);
      return null;
    }
  },

  saveUserData: (email: string, data: UserData) => {
    try {
      localStorage.setItem(`glowup_user_${email}`, JSON.stringify(data));
      console.log('User data saved successfully for:', email);
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  },

  createNewUser: (email: string, name: string): UserData => {
    console.log('Creating new user:', email, name);
    
    const newUserData: UserData = {
      email,
      name,
      preferences: {
        theme: 'light',
        notifications: true,
        reminderTime: '09:00',
      },
      profile: {
        goals: [],
        fitnessLevel: 'beginner',
        healthConditions: [],
      },
      journalEntries: [],
      habits: [
        {
          id: `habit_${Date.now()}_1`,
          name: 'Drink 8 glasses of water',
          category: 'Health',
          frequency: 'daily',
          completedDates: [],
          streak: 0,
        },
        {
          id: `habit_${Date.now()}_2`,
          name: 'Morning skincare routine',
          category: 'Self-care',
          frequency: 'daily',
          completedDates: [],
          streak: 0,
        },
        {
          id: `habit_${Date.now()}_3`,
          name: 'Take a 10-minute walk',
          category: 'Fitness',
          frequency: 'daily',
          completedDates: [],
          streak: 0,
        },
        {
          id: `habit_${Date.now()}_4`,
          name: 'Practice gratitude',
          category: 'Mental Health',
          frequency: 'daily',
          completedDates: [],
          streak: 0,
        },
      ],
      moodData: [],
      periodData: {
        cycles: [],
        predictions: {},
      },
    };
    
    userDataService.saveUserData(email, newUserData);
    console.log('New user created and saved:', newUserData);
    return newUserData;
  },

  resetUserData: (email: string) => {
    if (email) {
      try {
        localStorage.removeItem(`glowup_user_${email}`);
        console.log('User data reset for:', email);
      } catch (error) {
        console.error('Error resetting user data:', error);
      }
    }
  },

  // Get user-specific stats for dashboard
  getUserStats: (email: string) => {
    const userData = userDataService.getUserData(email);
    if (!userData) {
      return {
        journalEntries: 0,
        habitsCompleted: '0/0',
        streakDays: 0,
        moodScore: 'N/A'
      };
    }

    const today = new Date().toISOString().split('T')[0];
    const completedHabitsToday = userData.habits.filter(habit => 
      habit.completedDates.includes(today)
    ).length;
    
    const totalHabits = userData.habits.length;
    const maxStreak = Math.max(...userData.habits.map(h => h.streak), 0);
    
    // Calculate average mood score from recent entries
    const recentMoods = userData.moodData.slice(-7);
    const avgMood = recentMoods.length > 0 
      ? (recentMoods.reduce((sum, mood) => sum + mood.energy, 0) / recentMoods.length).toFixed(1)
      : 'N/A';

    return {
      journalEntries: userData.journalEntries.length,
      habitsCompleted: `${completedHabitsToday}/${totalHabits}`,
      streakDays: maxStreak,
      moodScore: avgMood
    };
  }
};
