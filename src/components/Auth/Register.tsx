
import React, { useState } from 'react';
import { Heart, Eye, EyeOff, CheckCircle, CalendarIcon, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface RegisterProps {
  onRegister: (email: string, password: string, name: string, dateOfBirth?: string) => void;
  onGoogleLogin: () => void;
  onSwitchToLogin: () => void;
}

const Register = ({ onRegister, onGoogleLogin, onSwitchToLogin }: RegisterProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [dateOfBirth, setDateOfBirth] = useState<Date>();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const validatePassword = (password: string) => {
    const requirements = [];
    if (password.length < 8) requirements.push('At least 8 characters');
    if (!/[A-Z]/.test(password)) requirements.push('One uppercase letter');
    if (!/[a-z]/.test(password)) requirements.push('One lowercase letter');
    if (!/\d/.test(password)) requirements.push('One number');
    return requirements;
  };

  const validateDateOfBirth = (date: Date) => {
    const today = new Date();
    const minAge = new Date(today.getFullYear() - 13, today.getMonth(), today.getDate());
    const maxAge = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate());
    
    return date <= minAge && date >= maxAge;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = [];

    if (!formData.name.trim()) newErrors.push('Name is required');
    if (!formData.email.trim()) newErrors.push('Email is required');
    if (!formData.agreeToTerms) newErrors.push('You must agree to the terms');
    if (formData.password !== formData.confirmPassword) {
      newErrors.push('Passwords do not match');
    }
    
    if (dateOfBirth && !validateDateOfBirth(dateOfBirth)) {
      newErrors.push('You must be at least 13 years old and born after 1900');
    }
    
    const passwordErrors = validatePassword(formData.password);
    newErrors.push(...passwordErrors);

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors([]);
    
    setTimeout(() => {
      onRegister(
        formData.email, 
        formData.password, 
        formData.name,
        dateOfBirth ? format(dateOfBirth, 'yyyy-MM-dd') : undefined
      );
      setIsLoading(false);
    }, 1000);
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    setErrors([]);
    
    setTimeout(() => {
      onGoogleLogin();
      setIsGoogleLoading(false);
    }, 1500);
  };

  const passwordRequirements = validatePassword(formData.password);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-mint-50 dark:from-slate-900 dark:via-purple-900/10 dark:to-slate-800 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-pink-100 dark:border-slate-700 p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-pink-400 via-purple-400 to-mint-400 rounded-full flex items-center justify-center shadow-lg mx-auto mb-4">
            <Heart className="w-8 h-8 text-white" fill="currentColor" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-mint-500 bg-clip-text text-transparent">
            Join GlowUp
          </h1>
          <p className="text-gray-600 dark:text-slate-300 mt-2">Start your wellness journey today</p>
        </div>

        {/* Enhanced Google Sign Up Button */}
        <button 
          onClick={handleGoogleLogin}
          disabled={isLoading || isGoogleLoading}
          className="w-full flex items-center justify-center px-4 py-3 border border-gray-200 dark:border-slate-600 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700 transition-all duration-200 mb-6 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          {isGoogleLoading ? (
            <Loader2 className="w-5 h-5 mr-3 animate-spin text-gray-600 dark:text-slate-300" />
          ) : (
            <svg className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          )}
          <span className="text-gray-700 dark:text-slate-300 font-medium">
            {isGoogleLoading ? 'Creating account...' : 'Continue with Google'}
          </span>
        </button>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-slate-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-slate-800 text-gray-500 dark:text-slate-400">Or continue with email</span>
          </div>
        </div>

        {errors.length > 0 && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
            <ul className="text-sm text-red-600 dark:text-red-400 space-y-1">
              {errors.map((error, index) => (
                <li key={index}>• {error}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-4 border border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-500 focus:border-transparent transition-all bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-400"
              placeholder="Your full name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-4 border border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-500 focus:border-transparent transition-all bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-400"
              placeholder="your@email.com"
              required
            />
          </div>

          {/* Enhanced Date of Birth Calendar */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
              Date of Birth (Optional)
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal p-4 h-auto",
                    !dateOfBirth && "text-muted-foreground",
                    "bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateOfBirth ? format(dateOfBirth, "PPP") : <span>Pick your date of birth</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateOfBirth}
                  onSelect={setDateOfBirth}
                  disabled={(date) =>
                    date > new Date() || 
                    date < new Date("1900-01-01") ||
                    date > new Date(new Date().getFullYear() - 13, new Date().getMonth(), new Date().getDate())
                  }
                  initialFocus
                  className="p-3 pointer-events-auto"
                  defaultMonth={new Date(2000, 0)}
                />
              </PopoverContent>
            </Popover>
            <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
              You must be at least 13 years old to use this service
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full p-4 pr-12 border border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-500 focus:border-transparent transition-all bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-400"
                placeholder="Create a password"
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
            
            {formData.password && (
              <div className="mt-2 space-y-1">
                {['At least 8 characters', 'One uppercase letter', 'One lowercase letter', 'One number'].map((req, index) => (
                  <div key={index} className="flex items-center space-x-2 text-xs">
                    <CheckCircle className={`w-3 h-3 ${
                      !passwordRequirements.includes(req) ? 'text-green-500' : 'text-gray-300 dark:text-slate-600'
                    }`} />
                    <span className={!passwordRequirements.includes(req) ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-slate-400'}>
                      {req}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full p-4 pr-12 border border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-500 focus:border-transparent transition-all bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-400"
                placeholder="Confirm your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-slate-400 hover:text-gray-600 dark:hover:text-slate-300 transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              checked={formData.agreeToTerms}
              onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
              className="w-4 h-4 text-purple-500 rounded border-gray-300 dark:border-slate-600 focus:ring-purple-300 dark:focus:ring-purple-500 mt-1 dark:bg-slate-700"
              required
            />
            <label className="text-sm text-gray-600 dark:text-slate-300">
              I agree to the{' '}
              <a href="#" className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors">Privacy Policy</a>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading || isGoogleLoading}
            className="w-full bg-gradient-to-r from-pink-400 via-purple-400 to-mint-400 text-white py-4 rounded-xl font-medium hover:from-pink-500 hover:via-purple-500 hover:to-mint-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </button>

          <div className="text-center">
            <span className="text-gray-600 dark:text-slate-300">Already have an account? </span>
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-colors"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
