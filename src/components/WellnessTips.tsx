
import React, { useState } from 'react';
import { Sparkles, Heart, Moon, Sun } from 'lucide-react';

const WellnessTips = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Skincare', 'Mental Health', 'Sleep', 'Nutrition', 'Fitness'];

  const tips = [
    {
      id: 1,
      category: 'Skincare',
      title: 'The Power of Double Cleansing',
      content: 'Start with an oil-based cleanser to remove makeup and sunscreen, followed by a water-based cleanser to clean your skin. This method ensures all impurities are removed without stripping your skin.',
      icon: Sparkles,
      color: 'from-pink-400 to-rose-400',
      bgColor: 'bg-pink-50 dark:bg-pink-900/20',
      borderColor: 'border-pink-200 dark:border-pink-800'
    },
    {
      id: 2,
      category: 'Mental Health',
      title: '5-4-3-2-1 Grounding Technique',
      content: 'When feeling anxious, name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste. This helps bring you back to the present moment.',
      icon: Heart,
      color: 'from-purple-400 to-pink-400',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      borderColor: 'border-purple-200 dark:border-purple-800'
    },
    {
      id: 3,
      category: 'Sleep',
      title: 'Create a Sleep Sanctuary',
      content: 'Keep your bedroom cool (65-68°F), dark, and quiet. Use blackout curtains, and avoid screens 1 hour before bed. Your sleep environment significantly impacts sleep quality.',
      icon: Moon,
      color: 'from-indigo-400 to-purple-400',
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
      borderColor: 'border-indigo-200 dark:border-indigo-800'
    },
    {
      id: 4,
      category: 'Nutrition',
      title: 'Hydration for Glowing Skin',
      content: 'Drink at least 8 glasses of water daily. Add lemon, cucumber, or mint for variety. Proper hydration helps maintain skin elasticity and can reduce signs of aging.',
      icon: Sun,
      color: 'from-yellow-400 to-orange-400',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      borderColor: 'border-yellow-200 dark:border-yellow-800'
    },
    {
      id: 5,
      category: 'Fitness',
      title: 'Movement Breaks',
      content: 'Take a 5-minute movement break every hour. Simple stretches, walking, or dancing can boost energy, improve circulation, and enhance mood throughout the day.',
      icon: Heart,
      color: 'from-green-400 to-mint-400',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      borderColor: 'border-green-200 dark:border-green-800'
    },
    {
      id: 6,
      category: 'Mental Health',
      title: 'Gratitude Practice',
      content: 'Write down 3 things you\'re grateful for each morning. This simple practice can shift your mindset, reduce stress, and increase overall life satisfaction.',
      icon: Heart,
      color: 'from-pink-400 to-purple-400',
      bgColor: 'bg-pink-50 dark:bg-pink-900/20',
      borderColor: 'border-pink-200 dark:border-pink-800'
    },
    {
      id: 7,
      category: 'Skincare',
      title: 'Sunscreen Every Day',
      content: 'Apply SPF 30+ sunscreen daily, even indoors. UV rays can penetrate windows and cause premature aging. Reapply every 2 hours when outside.',
      icon: Sun,
      color: 'from-orange-400 to-yellow-400',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      borderColor: 'border-orange-200 dark:border-orange-800'
    },
    {
      id: 8,
      category: 'Sleep',
      title: 'Wind Down Routine',
      content: 'Create a consistent bedtime routine: dim lights, read a book, practice gentle stretches, or meditate. Start this routine 30-60 minutes before sleep.',
      icon: Moon,
      color: 'from-purple-400 to-indigo-400',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      borderColor: 'border-purple-200 dark:border-purple-800'
    }
  ];

  const filteredTips = selectedCategory === 'All' 
    ? tips 
    : tips.filter(tip => tip.category === selectedCategory);

  const wellnessVideos = [
    {
      title: '10-Minute Morning Yoga',
      channel: 'Yoga with Adriene',
      thumbnail: '🧘‍♀️',
      duration: '10:32'
    },
    {
      title: 'Skincare Routine for Beginners',
      channel: 'James Welsh',
      thumbnail: '✨',
      duration: '15:24'
    },
    {
      title: 'Meditation for Anxiety',
      channel: 'Headspace',
      thumbnail: '🧠',
      duration: '8:15'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-2">Wellness Resources</h2>
        <p className="text-gray-600 dark:text-gray-300">Discover tips, articles, and content to support your wellness journey</p>
      </div>

      {/* Featured Daily Tip */}
      <div className="bg-gradient-to-r from-pink-100 via-purple-100 to-mint-100 dark:from-pink-900/30 dark:via-purple-900/30 dark:to-mint-900/30 rounded-2xl p-6 sm:p-8 mb-6 sm:mb-8 shadow-sm border border-pink-200 dark:border-pink-800">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 mb-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-purple-800 dark:text-purple-300">Today's Wellness Tip</h3>
            <p className="text-purple-600 dark:text-purple-400 text-sm sm:text-base">Start your day with intention</p>
          </div>
        </div>
        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 sm:p-6">
          <h4 className="text-lg sm:text-xl font-semibold text-purple-800 dark:text-purple-300 mb-3">Morning Affirmations</h4>
          <p className="text-purple-700 dark:text-purple-400 leading-relaxed text-sm sm:text-base">
            Begin each day by looking in the mirror and saying three positive affirmations about yourself. 
            This practice can boost self-confidence, reduce negative self-talk, and set a positive tone for your entire day. 
            Try phrases like "I am capable," "I deserve love and respect," or "I choose joy today." 💖
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
        {/* Categories Filter */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-sm border border-purple-100 dark:border-gray-700 mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm sm:text-base ${
                    selectedCategory === category
                      ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-medium'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Recommended Videos */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-sm border border-pink-100 dark:border-gray-700">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white mb-4">Recommended Videos</h3>
            <div className="space-y-4">
              {wellnessVideos.map((video, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 rounded-lg flex items-center justify-center text-xl sm:text-2xl flex-shrink-0">
                    {video.thumbnail}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-800 dark:text-white text-xs sm:text-sm leading-tight">{video.title}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{video.channel}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">{video.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tips Grid */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {filteredTips.map((tip) => {
              const Icon = tip.icon;
              return (
                <div
                  key={tip.id}
                  className={`${tip.bgColor} rounded-2xl p-4 sm:p-6 shadow-sm border ${tip.borderColor} hover:shadow-md transition-shadow`}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r ${tip.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div>
                      <span className="px-2 py-1 bg-white/60 dark:bg-gray-800/60 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300">
                        {tip.category}
                      </span>
                    </div>
                  </div>
                  
                  <h4 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white mb-3">{tip.title}</h4>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">{tip.content}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WellnessTips;
