

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
    const data = localStorage.getItem(`userData_${email}`);
    return data ? JSON.parse(data) : null;
  },

  saveUserData: (email: string, data: UserData) => {
    localStorage.setItem(`userData_${email}`, JSON.stringify(data));
  },

  createNewUser: (email: string, name: string): UserData => {
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
          id: '1',
          name: 'Drink 8 glasses of water',
          category: 'Health',
          frequency: 'daily',
          completedDates: [],
          streak: 0,
        },
        {
          id: '2',
          name: 'Morning skincare routine',
          category: 'Self-care',
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
    
    this.saveUserData(email, newUserData);
    return newUserData;
  },

  resetUserData: (email: string) => {
    if (email) {
      localStorage.removeItem(`userData_${email}`);
    }
  },
};
