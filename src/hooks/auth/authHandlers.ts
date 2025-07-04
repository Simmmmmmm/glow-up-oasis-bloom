
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export const handleSignUp = async (
  email: string, 
  password: string, 
  fullName?: string, 
  dateOfBirth?: string
) => {
  try {
    const redirectUrl = window.location.origin;
    
    console.log('Signing up with redirect URL:', redirectUrl);
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName,
          date_of_birth: dateOfBirth,
        }
      }
    });

    if (error) {
      console.error('Signup error:', error);
      toast({
        variant: "destructive",
        title: "Sign up failed",
        description: error.message,
      });
      return { error };
    }

    if (data.user && !data.session) {
      toast({
        title: "Check your email!",
        description: "We've sent you a confirmation link. Please check your email (including spam folder) and click the link to verify your account.",
      });
    } else if (data.session) {
      toast({
        title: "Account created!",
        description: "Your account has been created successfully.",
      });
    }

    return { error: null };
  } catch (err) {
    console.error('Unexpected signup error:', err);
    const error = err as Error;
    toast({
      variant: "destructive",
      title: "Sign up failed",
      description: error.message || "An unexpected error occurred",
    });
    return { error };
  }
};

export const handleSignIn = async (email: string, password: string) => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    toast({
      variant: "destructive",
      title: "Sign in failed",
      description: error.message,
    });
  }

  return { error };
};

export const handleSignOut = async (setUserProfile: (profile: any) => void) => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    toast({
      variant: "destructive",
      title: "Sign out failed",
      description: error.message,
    });
  } else {
    setUserProfile(null);
    toast({
      title: "Signed out",
      description: "You've been successfully signed out.",
    });
  }
};
