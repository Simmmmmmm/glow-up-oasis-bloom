
import { supabase } from '@/integrations/supabase/client';

export const loadUserProfile = async (userId: string) => {
  try {
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    return profile;
  } catch (error) {
    console.error('Error loading user profile:', error);
    return null;
  }
};
