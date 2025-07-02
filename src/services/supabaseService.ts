
import { supabase } from '@/integrations/supabase/client';

// User Data Service
export const userDataService = {
  async getUserData(userId: string) {
    const { data, error } = await supabase
      .from('user_data')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
    return data;
  },

  async updateUserData(userId: string, updates: any) {
    const { error } = await supabase
      .from('user_data')
      .update(updates)
      .eq('user_id', userId);
    
    if (error) {
      console.error('Error updating user data:', error);
      return false;
    }
    return true;
  },

  async createDefaultHabits(userId: string) {
    const defaultHabits = [
      {
        user_id: userId,
        name: 'Drink 8 glasses of water',
        category: 'Health',
        frequency: 'daily',
        completed_dates: [],
        streak: 0,
      },
      {
        user_id: userId,
        name: 'Morning skincare routine',
        category: 'Self-care',
        frequency: 'daily',
        completed_dates: [],
        streak: 0,
      },
      {
        user_id: userId,
        name: 'Take a 10-minute walk',
        category: 'Fitness',
        frequency: 'daily',
        completed_dates: [],
        streak: 0,
      },
      {
        user_id: userId,
        name: 'Practice gratitude',
        category: 'Mental Health',
        frequency: 'daily',
        completed_dates: [],
        streak: 0,
      },
    ];

    const { error } = await supabase
      .from('habits')
      .insert(defaultHabits);
    
    if (error) {
      console.error('Error creating default habits:', error);
    }
  },

  async getUserStats(userId: string) {
    // Get journal entries count
    const { count: journalCount } = await supabase
      .from('journal_entries')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    // Get habits data
    const { data: habits } = await supabase
      .from('habits')
      .select('*')
      .eq('user_id', userId);

    // Get today's completed habits
    const today = new Date().toISOString().split('T')[0];
    const completedHabitsToday = habits?.filter(habit => 
      habit.completed_dates?.includes(today)
    ).length || 0;

    const totalHabits = habits?.length || 0;
    const maxStreak = Math.max(...(habits?.map(h => h.streak) || [0]), 0);

    // Get recent mood data
    const { data: recentMoods } = await supabase
      .from('mood_data')
      .select('energy')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(7);

    const avgMood = recentMoods && recentMoods.length > 0 
      ? (recentMoods.reduce((sum, mood) => sum + (mood.energy || 0), 0) / recentMoods.length).toFixed(1)
      : 'N/A';

    return {
      journalEntries: journalCount || 0,
      habitsCompleted: `${completedHabitsToday}/${totalHabits}`,
      streakDays: maxStreak,
      moodScore: avgMood
    };
  }
};
