
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { AuthContextType } from './auth/types';
import { loadUserProfile } from './auth/authUtils';
import { handleSignUp, handleSignIn, handleSignOut } from './auth/authHandlers';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);

  const refreshProfile = async () => {
    if (user) {
      const profile = await loadUserProfile(user.id);
      setUserProfile(profile);
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        if (session?.user) {
          // Load user profile when user signs in
          setTimeout(async () => {
            const profile = await loadUserProfile(session.user.id);
            setUserProfile(profile);
          }, 0);
        } else {
          setUserProfile(null);
        }

        if (event === 'SIGNED_IN' && session?.user) {
          toast({
            title: "Welcome back!",
            description: "You've successfully signed in.",
          });
        }
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      
      if (session?.user) {
        loadUserProfile(session.user.id).then(setUserProfile);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = (email: string, password: string, fullName?: string, dateOfBirth?: string) => {
    return handleSignUp(email, password, fullName, dateOfBirth);
  };

  const signIn = (email: string, password: string) => {
    return handleSignIn(email, password);
  };

  const signOut = () => {
    return handleSignOut(setUserProfile);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      loading, 
      userProfile, 
      refreshProfile, 
      signUp, 
      signIn, 
      signOut 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
