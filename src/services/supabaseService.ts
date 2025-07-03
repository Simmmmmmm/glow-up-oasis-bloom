
import { supabase } from '@/integrations/supabase/client';

export const supabaseService = {
  // Profile operations
  async getProfile() {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateProfile(updates: any) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // User data operations
  async getUserData() {
    const { data, error } = await supabase
      .from('user_data')
      .select('*')
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateUserData(updates: any) {
    const { data, error } = await supabase
      .from('user_data')
      .update(updates)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Journal operations
  async getJournalEntries() {
    const { data, error } = await supabase
      .from('journal_entries')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async createJournalEntry(entry: any) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('journal_entries')
      .insert([{ ...entry, user_id: user.id }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Habits operations
  async getHabits() {
    const { data, error } = await supabase
      .from('habits')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async createHabit(habit: any) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('habits')
      .insert([{ ...habit, user_id: user.id }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateHabit(id: string, updates: any) {
    const { data, error } = await supabase
      .from('habits')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Mood data operations
  async getMoodData() {
    const { data, error } = await supabase
      .from('mood_data')
      .select('*')
      .order('date', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async createMoodEntry(mood: any) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('mood_data')
      .insert([{ ...mood, user_id: user.id }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Period data operations
  async getPeriodData() {
    const { data, error } = await supabase
      .from('period_data')
      .select('*')
      .order('start_date', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async createPeriodEntry(period: any) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('period_data')
      .insert([{ ...period, user_id: user.id }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};
