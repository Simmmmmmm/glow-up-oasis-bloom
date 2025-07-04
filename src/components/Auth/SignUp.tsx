
import React, { useState } from 'react';
import { Eye, EyeOff, CheckCircle, CalendarIcon, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import AuthLayout from './AuthLayout';

interface SignUpProps {
  onSwitchToSignIn: () => void;
}

const SignUp = ({ onSwitchToSignIn }: SignUpProps) => {
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
  const [errors, setErrors] = useState<string[]>([]);
  const { signUp } = useAuth();

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

    // Validate required fields
    if (!formData.name.trim()) newErrors.push('Full name is required');
    if (!formData.email.trim()) newErrors.push('Email is required');
    if (!dateOfBirth) newErrors.push('Date of birth is required');
    if (!formData.agreeToTerms) newErrors.push('You must agree to the terms');
    
    // Validate passwords
    if (formData.password !== formData.confirmPassword) {
      newErrors.push('Passwords do not match');
    }
    
    // Validate date of birth
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
    
    const { error } = await signUp(
      formData.email, 
      formData.password, 
      formData.name,
      dateOfBirth ? format(dateOfBirth, 'yyyy-MM-dd') : undefined
    );
    
    if (error) {
      setErrors([error.message]);
    }
    
    setIsLoading(false);
  };

  const passwordRequirements = validatePassword(formData.password);

  return (
    <AuthLayout 
      title="Join GlowUp" 
      subtitle="Start your wellness journey today"
    >
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
            Full Name *
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
            Email Address *
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

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
            Date of Birth *
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
                {dateOfBirth ? format(dateOfBirth, "PPP") : <span>Select your date of birth</span>}
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
                className="p-3"
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
            Password *
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
            Confirm Password *
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
          disabled={isLoading}
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
            onClick={onSwitchToSignIn}
            className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-colors"
          >
            Sign in
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default SignUp;
