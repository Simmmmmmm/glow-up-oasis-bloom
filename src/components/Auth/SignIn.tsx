
import React, { useState } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import AuthLayout from './AuthLayout';

interface SignInProps {
  onSwitchToSignUp: () => void;
}

const SignIn = ({ onSwitchToSignUp }: SignInProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    await signIn(email, password);
    setIsLoading(false);
  };

  return (
    <AuthLayout 
      title="Welcome Back" 
      subtitle="Sign in to continue your wellness journey"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 border border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-500 focus:border-transparent transition-all bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-400"
            placeholder="your@email.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 pr-12 border border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-500 focus:border-transparent transition-all bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-400"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-slate-400 hover:text-gray-600 dark:hover:text-slate-300 transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-pink-400 via-purple-400 to-mint-400 text-white py-4 rounded-xl font-medium hover:from-pink-500 hover:via-purple-500 hover:to-mint-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Signing In...
            </>
          ) : (
            'Sign In'
          )}
        </button>

        <div className="text-center">
          <span className="text-gray-600 dark:text-slate-300">Don't have an account? </span>
          <button
            type="button"
            onClick={onSwitchToSignUp}
            className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-colors"
          >
            Sign up
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default SignIn;
