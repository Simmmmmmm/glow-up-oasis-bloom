
import React, { useState } from 'react';
import { Sparkles, Heart, Moon, Sun, Dumbbell, Brain } from 'lucide-react';

const WellnessTips = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Skincare', 'Mental Health', 'Sleep', 'Nutrition', 'Fitness'];

  const tips = [
    // Skincare Tips (10)
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
      category: 'Skincare',
      title: 'Sunscreen Every Day',
      content: 'Apply SPF 30+ sunscreen daily, even indoors. UV rays can penetrate windows and cause premature aging. Reapply every 2 hours when outside.',
      icon: Sun,
      color: 'from-orange-400 to-yellow-400',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      borderColor: 'border-orange-200 dark:border-orange-800'
    },
    {
      id: 3,
      category: 'Skincare',
      title: 'Hydration Inside & Out',
      content: 'Drink plenty of water and use a quality moisturizer twice daily. Well-hydrated skin appears plumper, smoother, and more radiant.',
      icon: Sparkles,
      color: 'from-blue-400 to-cyan-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800'
    },
    {
      id: 4,
      category: 'Skincare',
      title: 'Gentle Exfoliation',
      content: 'Exfoliate 1-2 times per week with gentle chemical exfoliants (AHA/BHA) rather than harsh scrubs to reveal brighter, smoother skin.',
      icon: Sparkles,
      color: 'from-purple-400 to-pink-400',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      borderColor: 'border-purple-200 dark:border-purple-800'
    },
    {
      id: 5,
      category: 'Skincare',
      title: 'Night Routine Consistency',
      content: 'Establish a consistent nighttime skincare routine. Your skin repairs itself while you sleep, making it the perfect time for active ingredients.',
      icon: Moon,
      color: 'from-indigo-400 to-purple-400',
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
      borderColor: 'border-indigo-200 dark:border-indigo-800'
    },
    {
      id: 6,
      category: 'Skincare',
      title: 'Clean Pillowcases',
      content: 'Change your pillowcase every 2-3 days or use silk/satin pillowcases. Clean pillowcases reduce bacteria transfer and silk prevents hair friction.',
      icon: Sparkles,
      color: 'from-teal-400 to-green-400',
      bgColor: 'bg-teal-50 dark:bg-teal-900/20',
      borderColor: 'border-teal-200 dark:border-teal-800'
    },
    {
      id: 7,
      category: 'Skincare',
      title: 'Patch Test New Products',
      content: 'Always patch test new skincare products on a small area for 24-48 hours before full application to avoid adverse reactions.',
      icon: Sparkles,
      color: 'from-rose-400 to-pink-400',
      bgColor: 'bg-rose-50 dark:bg-rose-900/20',
      borderColor: 'border-rose-200 dark:border-rose-800'
    },
    {
      id: 8,
      category: 'Skincare',
      title: 'Antioxidant Protection',
      content: 'Use vitamin C serum in the morning to protect against free radical damage and brighten your complexion over time.',
      icon: Sun,
      color: 'from-yellow-400 to-orange-400',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      borderColor: 'border-yellow-200 dark:border-yellow-800'
    },
    {
      id: 9,
      category: 'Skincare',
      title: 'Face Massage Benefits',
      content: 'Incorporate gentle facial massage into your routine to boost circulation, reduce puffiness, and help products absorb better.',
      icon: Heart,
      color: 'from-pink-400 to-red-400',
      bgColor: 'bg-pink-50 dark:bg-pink-900/20',
      borderColor: 'border-pink-200 dark:border-pink-800'
    },
    {
      id: 10,
      category: 'Skincare',
      title: 'Diet & Skin Connection',
      content: 'Eat omega-3 rich foods, antioxidant-packed berries, and limit dairy and sugar to support clear, healthy skin from within.',
      icon: Sparkles,
      color: 'from-green-400 to-teal-400',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      borderColor: 'border-green-200 dark:border-green-800'
    },

    // Mental Health Tips (10)
    {
      id: 11,
      category: 'Mental Health',
      title: '5-4-3-2-1 Grounding Technique',
      content: 'When feeling anxious, name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste. This helps bring you back to the present moment.',
      icon: Brain,
      color: 'from-purple-400 to-pink-400',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      borderColor: 'border-purple-200 dark:border-purple-800'
    },
    {
      id: 12,
      category: 'Mental Health',
      title: 'Gratitude Practice',
      content: 'Write down 3 things you\'re grateful for each morning. This simple practice can shift your mindset, reduce stress, and increase overall life satisfaction.',
      icon: Heart,
      color: 'from-pink-400 to-purple-400',
      bgColor: 'bg-pink-50 dark:bg-pink-900/20',
      borderColor: 'border-pink-200 dark:border-pink-800'
    },
    {
      id: 13,
      category: 'Mental Health',
      title: 'Mindful Breathing',
      content: 'Practice 4-7-8 breathing: inhale for 4 counts, hold for 7, exhale for 8. This activates your parasympathetic nervous system and reduces anxiety.',
      icon: Brain,
      color: 'from-blue-400 to-indigo-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800'
    },
    {
      id: 14,
      category: 'Mental Health',
      title: 'Digital Boundaries',
      content: 'Set specific times for checking social media and news. Create phone-free zones during meals and before bed to improve mental clarity.',
      icon: Brain,
      color: 'from-teal-400 to-blue-400',
      bgColor: 'bg-teal-50 dark:bg-teal-900/20',
      borderColor: 'border-teal-200 dark:border-teal-800'
    },
    {
      id: 15,
      category: 'Mental Health',
      title: 'Nature Connection',
      content: 'Spend at least 20 minutes in nature daily. Forest bathing or simply sitting in a park can significantly reduce cortisol levels and improve mood.',
      icon: Heart,
      color: 'from-green-400 to-teal-400',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      borderColor: 'border-green-200 dark:border-green-800'
    },
    {
      id: 16,
      category: 'Mental Health',
      title: 'Journaling for Clarity',
      content: 'Spend 10 minutes writing about your thoughts and feelings. Stream-of-consciousness journaling can help process emotions and gain perspective.',
      icon: Brain,
      color: 'from-violet-400 to-purple-400',
      bgColor: 'bg-violet-50 dark:bg-violet-900/20',
      borderColor: 'border-violet-200 dark:border-violet-800'
    },
    {
      id: 17,
      category: 'Mental Health',
      title: 'Progressive Muscle Relaxation',
      content: 'Tense and release each muscle group from toes to head. This technique helps identify physical tension and promotes deep relaxation.',
      icon: Heart,
      color: 'from-rose-400 to-pink-400',
      bgColor: 'bg-rose-50 dark:bg-rose-900/20',
      borderColor: 'border-rose-200 dark:border-rose-800'
    },
    {
      id: 18,
      category: 'Mental Health',
      title: 'Social Connection',
      content: 'Maintain meaningful relationships. Regular social interaction, even brief conversations, can boost oxytocin and improve mental wellbeing.',
      icon: Heart,
      color: 'from-orange-400 to-red-400',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      borderColor: 'border-orange-200 dark:border-orange-800'
    },
    {
      id: 19,
      category: 'Mental Health',
      title: 'Mindful Meditation',
      content: 'Start with just 5 minutes of daily meditation. Focus on your breath or use guided meditations to build awareness and emotional regulation.',
      icon: Brain,
      color: 'from-indigo-400 to-blue-400',
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
      borderColor: 'border-indigo-200 dark:border-indigo-800'
    },
    {
      id: 20,
      category: 'Mental Health',
      title: 'Positive Self-Talk',
      content: 'Challenge negative thoughts with evidence-based thinking. Ask yourself: "Is this thought helpful? What would I tell a friend in this situation?"',
      icon: Heart,
      color: 'from-yellow-400 to-orange-400',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      borderColor: 'border-yellow-200 dark:border-yellow-800'
    },

    // Sleep Tips (10)
    {
      id: 21,
      category: 'Sleep',
      title: 'Create a Sleep Sanctuary',
      content: 'Keep your bedroom cool (65-68°F), dark, and quiet. Use blackout curtains, and avoid screens 1 hour before bed. Your sleep environment significantly impacts sleep quality.',
      icon: Moon,
      color: 'from-indigo-400 to-purple-400',
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
      borderColor: 'border-indigo-200 dark:border-indigo-800'
    },
    {
      id: 22,
      category: 'Sleep',
      title: 'Wind Down Routine',
      content: 'Create a consistent bedtime routine: dim lights, read a book, practice gentle stretches, or meditate. Start this routine 30-60 minutes before sleep.',
      icon: Moon,
      color: 'from-purple-400 to-indigo-400',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      borderColor: 'border-purple-200 dark:border-purple-800'
    },
    {
      id: 23,
      category: 'Sleep',
      title: 'Consistent Sleep Schedule',
      content: 'Go to bed and wake up at the same time every day, even on weekends. This helps regulate your circadian rhythm for better sleep quality.',
      icon: Moon,
      color: 'from-blue-400 to-indigo-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800'
    },
    {
      id: 24,
      category: 'Sleep',
      title: 'Morning Light Exposure',
      content: 'Get 10-15 minutes of natural sunlight within an hour of waking. This helps set your circadian clock and improves nighttime sleep quality.',
      icon: Sun,
      color: 'from-yellow-400 to-orange-400',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      borderColor: 'border-yellow-200 dark:border-yellow-800'
    },
    {
      id: 25,
      category: 'Sleep',
      title: 'Limit Caffeine Timing',
      content: 'Avoid caffeine 6-8 hours before bedtime. Caffeine has a half-life of 5-6 hours, so that afternoon coffee can still affect your sleep.',
      icon: Moon,
      color: 'from-teal-400 to-blue-400',
      bgColor: 'bg-teal-50 dark:bg-teal-900/20',
      borderColor: 'border-teal-200 dark:border-teal-800'
    },
    {
      id: 26,
      category: 'Sleep',
      title: 'Blue Light Management',
      content: 'Use blue light blocking glasses or apps after sunset. Blue light suppresses melatonin production, making it harder to fall asleep.',
      icon: Moon,
      color: 'from-violet-400 to-purple-400',
      bgColor: 'bg-violet-50 dark:bg-violet-900/20',
      borderColor: 'border-violet-200 dark:border-violet-800'
    },
    {
      id: 27,
      category: 'Sleep',
      title: 'Temperature Regulation',
      content: 'Take a warm bath or shower 1-2 hours before bed. The drop in body temperature afterward signals your brain that it\'s time to sleep.',
      icon: Moon,
      color: 'from-rose-400 to-pink-400',
      bgColor: 'bg-rose-50 dark:bg-rose-900/20',
      borderColor: 'border-rose-200 dark:border-rose-800'
    },
    {
      id: 28,
      category: 'Sleep',
      title: 'Magnesium for Relaxation',
      content: 'Consider magnesium glycinate 1-2 hours before bed. This mineral helps activate the parasympathetic nervous system and promotes muscle relaxation.',
      icon: Moon,
      color: 'from-green-400 to-teal-400',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      borderColor: 'border-green-200 dark:border-green-800'
    },
    {
      id: 29,
      category: 'Sleep',
      title: 'Bedroom Air Quality',
      content: 'Keep your bedroom well-ventilated and consider an air purifier. Good air quality and proper humidity (30-50%) improve sleep comfort.',
      icon: Moon,
      color: 'from-cyan-400 to-blue-400',
      bgColor: 'bg-cyan-50 dark:bg-cyan-900/20',
      borderColor: 'border-cyan-200 dark:border-cyan-800'
    },
    {
      id: 30,
      category: 'Sleep',
      title: 'Stress-Free Bedroom',
      content: 'Keep work materials, bills, and stressful items out of the bedroom. Your bedroom should be associated only with sleep and relaxation.',
      icon: Heart,
      color: 'from-pink-400 to-rose-400',
      bgColor: 'bg-pink-50 dark:bg-pink-900/20',
      borderColor: 'border-pink-200 dark:border-pink-800'
    },

    // Nutrition Tips (10)
    {
      id: 31,
      category: 'Nutrition',
      title: 'Hydration for Glowing Skin',
      content: 'Drink at least 8 glasses of water daily. Add lemon, cucumber, or mint for variety. Proper hydration helps maintain skin elasticity and can reduce signs of aging.',
      icon: Sun,
      color: 'from-yellow-400 to-orange-400',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      borderColor: 'border-yellow-200 dark:border-yellow-800'
    },
    {
      id: 32,
      category: 'Nutrition',
      title: 'Rainbow Plate Principle',
      content: 'Eat a variety of colorful fruits and vegetables daily. Different colors provide different antioxidants and nutrients essential for optimal health.',
      icon: Heart,
      color: 'from-green-400 to-teal-400',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      borderColor: 'border-green-200 dark:border-green-800'
    },
    {
      id: 33,
      category: 'Nutrition',
      title: 'Protein at Every Meal',
      content: 'Include a palm-sized portion of protein at each meal to stabilize blood sugar, maintain muscle mass, and keep you feeling satisfied longer.',
      icon: Dumbbell,
      color: 'from-red-400 to-pink-400',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      borderColor: 'border-red-200 dark:border-red-800'
    },
    {
      id: 34,
      category: 'Nutrition',
      title: 'Mindful Eating Practice',
      content: 'Eat slowly, chew thoroughly, and pay attention to hunger/fullness cues. This improves digestion and helps prevent overeating.',
      icon: Brain,
      color: 'from-purple-400 to-indigo-400',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      borderColor: 'border-purple-200 dark:border-purple-800'
    },
    {
      id: 35,
      category: 'Nutrition',
      title: 'Healthy Fats Daily',
      content: 'Include omega-3 rich foods like salmon, walnuts, chia seeds, and avocados. Healthy fats support brain function and hormone production.',
      icon: Heart,
      color: 'from-teal-400 to-green-400',
      bgColor: 'bg-teal-50 dark:bg-teal-900/20',
      borderColor: 'border-teal-200 dark:border-teal-800'
    },
    {
      id: 36,
      category: 'Nutrition',
      title: 'Fiber for Gut Health',
      content: 'Aim for 25-35g of fiber daily from vegetables, fruits, whole grains, and legumes. Fiber supports digestive health and feeds beneficial gut bacteria.',
      icon: Heart,
      color: 'from-green-400 to-blue-400',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      borderColor: 'border-green-200 dark:border-green-800'
    },
    {
      id: 37,
      category: 'Nutrition',
      title: 'Meal Prep Success',
      content: 'Spend 1-2 hours weekly preparing healthy meals and snacks. Having nutritious options ready prevents impulsive food choices.',
      icon: Heart,
      color: 'from-blue-400 to-purple-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800'
    },
    {
      id: 38,
      category: 'Nutrition',
      title: 'Fermented Foods',
      content: 'Include fermented foods like yogurt, kefir, sauerkraut, or kimchi daily. These support gut health and immune function.',
      icon: Heart,
      color: 'from-orange-400 to-red-400',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      borderColor: 'border-orange-200 dark:border-orange-800'
    },
    {
      id: 39,
      category: 'Nutrition',
      title: 'Anti-Inflammatory Foods',
      content: 'Focus on anti-inflammatory foods like berries, leafy greens, turmeric, and ginger to reduce inflammation and support overall health.',
      icon: Sparkles,
      color: 'from-violet-400 to-pink-400',
      bgColor: 'bg-violet-50 dark:bg-violet-900/20',
      borderColor: 'border-violet-200 dark:border-violet-800'
    },
    {
      id: 40,
      category: 'Nutrition',
      title: 'Portion Control',
      content: 'Use your hand as a guide: palm-sized protein, cupped hand of carbs, thumb-sized fats, and fist-sized vegetables for balanced portions.',
      icon: Heart,
      color: 'from-rose-400 to-red-400',
      bgColor: 'bg-rose-50 dark:bg-rose-900/20',
      borderColor: 'border-rose-200 dark:border-rose-800'
    },

    // Fitness Tips (10)
    {
      id: 41,
      category: 'Fitness',
      title: 'Movement Breaks',
      content: 'Take a 5-minute movement break every hour. Simple stretches, walking, or dancing can boost energy, improve circulation, and enhance mood throughout the day.',
      icon: Dumbbell,
      color: 'from-green-400 to-mint-400',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      borderColor: 'border-green-200 dark:border-green-800'
    },
    {
      id: 42,
      category: 'Fitness',
      title: 'Strength Training Basics',
      content: 'Include 2-3 strength training sessions weekly. Focus on compound movements like squats, deadlifts, and push-ups that work multiple muscle groups.',
      icon: Dumbbell,
      color: 'from-red-400 to-orange-400',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      borderColor: 'border-red-200 dark:border-red-800'
    },
    {
      id: 43,
      category: 'Fitness',
      title: 'Cardio for Heart Health',
      content: 'Aim for 150 minutes of moderate cardio weekly. This can be broken into 30-minute sessions, 5 days a week, or shorter daily sessions.',
      icon: Heart,
      color: 'from-pink-400 to-red-400',
      bgColor: 'bg-pink-50 dark:bg-pink-900/20',
      borderColor: 'border-pink-200 dark:border-pink-800'
    },
    {
      id: 44,
      category: 'Fitness',
      title: 'Flexibility & Mobility',
      content: 'Dedicate 10-15 minutes daily to stretching or yoga. Good flexibility reduces injury risk and improves overall movement quality.',
      icon: Heart,
      color: 'from-purple-400 to-pink-400',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      borderColor: 'border-purple-200 dark:border-purple-800'
    },
    {
      id: 45,
      category: 'Fitness',
      title: 'Progressive Overload',
      content: 'Gradually increase workout intensity, duration, or weight. Small, consistent improvements lead to significant long-term fitness gains.',
      icon: Dumbbell,
      color: 'from-blue-400 to-purple-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800'
    },
    {
      id: 46,
      category: 'Fitness',
      title: 'Recovery is Key',
      content: 'Include 1-2 rest days weekly and 7-9 hours of sleep nightly. Recovery is when your body adapts and grows stronger from your workouts.',
      icon: Moon,
      color: 'from-indigo-400 to-blue-400',
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
      borderColor: 'border-indigo-200 dark:border-indigo-800'
    },
    {
      id: 47,
      category: 'Fitness',
      title: 'Functional Movement',
      content: 'Focus on exercises that mimic daily activities. Functional training improves coordination, balance, and makes everyday tasks easier.',
      icon: Dumbbell,
      color: 'from-teal-400 to-green-400',
      bgColor: 'bg-teal-50 dark:bg-teal-900/20',
      borderColor: 'border-teal-200 dark:border-teal-800'
    },
    {
      id: 48,
      category: 'Fitness',
      title: 'Listen to Your Body',
      content: 'Pay attention to pain vs. discomfort. Sharp pain means stop, while muscle fatigue is normal. Learn the difference to prevent injury.',
      icon: Heart,
      color: 'from-orange-400 to-yellow-400',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      borderColor: 'border-orange-200 dark:border-orange-800'
    },
    {
      id: 49,
      category: 'Fitness',
      title: 'Stay Hydrated',
      content: 'Drink water before, during, and after workouts. Aim for 16-24 oz of water 2-3 hours before exercise and 6-12 oz every 15-20 minutes during activity.',
      icon: Heart,
      color: 'from-cyan-400 to-blue-400',
      bgColor: 'bg-cyan-50 dark:bg-cyan-900/20',
      borderColor: 'border-cyan-200 dark:border-cyan-800'
    },
    {
      id: 50,
      category: 'Fitness',
      title: 'Find Joy in Movement',
      content: 'Choose activities you enjoy - dancing, hiking, swimming, or sports. When you love what you do, consistency becomes natural and sustainable.',
      icon: Heart,
      color: 'from-yellow-400 to-orange-400',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      borderColor: 'border-yellow-200 dark:border-yellow-800'
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
        <p className="text-gray-600 dark:text-gray-300">Discover comprehensive tips, articles, and content to support your wellness journey</p>
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
                  {category} {category !== 'All' && `(${tips.filter(tip => tip.category === category).length})`}
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
