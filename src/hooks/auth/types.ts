
import { User, Session } from '@supabase/supabase-js';

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  userProfile: any;
  refreshProfile: () => Promise<void>;
  signUp: (email: string, password: string, fullName?: string, dateOfBirth?: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}
