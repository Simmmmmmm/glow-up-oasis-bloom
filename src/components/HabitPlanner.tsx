
import React, { useState, useEffect } from 'react';
import { CheckCircle, Plus, Clock, Flame, Target } from 'lucide-react';

interface Habit {
  id: string;
  name: string;
  category: string;
  streak: number;
  completedToday: boolean;
  completedDates: string[];
  color: string;
  createdAt: string;
}

const HabitPlanner = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newHabit, setNewHabit] = useState('');
  const [newHabitCategory, setNewHabitCategory] = useState('Health');
  const [habits, setHabits] = useState<Habit[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Health', 'Beauty', 'Fitness', 'Mindfulness', 'Learning', 'Nutrition'];
  
  const categoryColors = {
    'Health': 'bg-blue-100 text-blue-700',
    'Beauty': 'bg-pink-100 text-pink-700',
    'Fitness': 'bg-green-100 text-green-700',
    'Mindfulness': 'bg-purple-100 text-purple-700',
    'Learning': 'bg-yellow-100 text-yellow-700',
    'Nutrition': 'bg-orange-100 text-orange-700'
  };

  useEffect(() => {
    // Load habits from localStorage
    const savedHabits = localStorage.getItem('habits');
    if (savedHabits) {
      setHabits(JSON.parse(savedHabits));
    } else {
      // Initialize with default habits
      const defaultHabits: Habit[] = [
        {
          id: '1',
          name: 'Drink 8 glasses of water',
          category: 'Health',
          streak: 7,
          completedToday: true,
          completedDates: [getTodayString()],
          color: 'bg-blue-100 text-blue-700',
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          name: 'Morning skincare routine',
          category: 'Beauty',
          streak: 12,
          completedToday: true,
          completedDates: [getTodayString()],
          color: 'bg-pink-100 text-pink-700',
          createdAt: new Date().toISOString()
        },
        {
          id: '3',
          name: 'Take a 10-minute walk',
          category: 'Fitness',
          streak: 5,
          completedToday: false,
          completedDates: [],
          color: 'bg-green-100 text-green-700',
          createdAt: new Date().toISOString()
        }
      ];
      setHabits(defaultHabits);
      localStorage.setItem('habits', JSON.stringify(defaultHabits));
    }
  }, []);

  function getTodayString() {
    return new Date().toISOString().split('T')[0];
  }

  const saveHabits = (updatedHabits: Habit[]) => {
    setHabits(updatedHabits);
    localStorage.setItem('habits', JSON.stringify(updatedHabits));
  };

  const addHabit = () => {
    if (!newHabit.trim()) return;

    const habit: Habit = {
      id: Date.now().toString(),
      name: newHabit,
      category: newHabitCategory,
      streak: 0,
      completedToday: false,
      completedDates: [],
      color: categoryColors[newHabitCategory as keyof typeof categoryColors] || 'bg-gray-100 text-gray-700',
      createdAt: new Date().toISOString()
    };

    const updatedHabits = [...habits, habit];
    saveHabits(updatedHabits);
    setNewHabit('');
    setShowAddForm(false);
  };

  const toggleHabit = (habitId: string) => {
    const today = getTodayString();
    const updatedHabits = habits.map(habit => {
      if (habit.id === habitId) {
        const isCompletingToday = !habit.completedToday;
        let newCompletedDates = [...habit.completedDates];
        let newStreak = habit.streak;

        if (isCompletingToday) {
          // Add today's date if not already present
          if (!newCompletedDates.includes(today)) {
            newCompletedDates.push(today);
            newStreak = habit.streak + 1;
          }
        } else {
          // Remove today's date
          newCompletedDates = newCompletedDates.filter(date => date !== today);
          newStreak = Math.max(0, habit.streak - 1);
        }

        return {
          ...habit,
          completedToday: isCompletingToday,
          completedDates: newCompletedDates,
          streak: newStreak
        };
      }
      return habit;
    });

    saveHabits(updatedHabits);
  };

  const deleteHabit = (habitId: string) => {
    const updatedHabits = habits.filter(habit => habit.id !== habitId);
    saveHabits(updatedHabits);
  };

  const filteredHabits = selectedCategory === 'All' 
    ? habits 
    : habits.filter(habit => habit.category === selectedCategory);

  const completedCount = habits.filter(habit => habit.completedToday).length;
  const totalCount = habits.length;
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const totalStreak = habits.reduce((sum, habit) => sum + habit.streak, 0);
  const longestStreak = Math.max(...habits.map(habit => habit.streak), 0);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Habit Planner</h2>
        <p className="text-gray-600">Build positive habits and track your daily progress</p>
      </div>

      {/* Progress Overview */}
      <div className="bg-gradient-to-r from-mint-100 to-green-100 rounded-2xl p-6 mb-8 shadow-sm border border-mint-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-700">{completedCount}/{totalCount}</div>
            <div className="text-sm text-green-600">Today's Habits</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-700">{completionPercentage}%</div>
            <div className="text-sm text-green-600">Completion Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-700">{totalStreak}</div>
            <div className="text-sm text-green-600">Total Streaks</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-700">{longestStreak}</div>
            <div className="text-sm text-green-600">Longest Streak</div>
          </div>
        </div>
        
        <div className="w-full bg-green-200 rounded-full h-3 mt-4">
          <div
            className="bg-gradient-to-r from-green-400 to-mint-400 h-3 rounded-full transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Categories Filter */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    selectedCategory === category
                      ? 'bg-purple-100 text-purple-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Add New Habit */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-pink-100">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-pink-400 to-purple-400 text-white py-3 rounded-xl hover:from-pink-500 hover:to-purple-500 transition-all duration-200 font-medium"
            >
              <Plus className="w-5 h-5" />
              <span>Add New Habit</span>
            </button>

            {showAddForm && (
              <div className="mt-4 space-y-3">
                <input
                  type="text"
                  value={newHabit}
                  onChange={(e) => setNewHabit(e.target.value)}
                  placeholder="Enter new habit..."
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                />
                <select
                  value={newHabitCategory}
                  onChange={(e) => setNewHabitCategory(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                >
                  {categories.filter(cat => cat !== 'All').map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <div className="flex space-x-2">
                  <button
                    onClick={addHabit}
                    className="flex-1 bg-pink-100 text-pink-700 py-2 rounded-lg hover:bg-pink-200 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Habits List */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800">
                {selectedCategory === 'All' ? 'All Habits' : `${selectedCategory} Habits`}
                <span className="text-sm font-normal text-gray-500 ml-2">
                  ({filteredHabits.length} habits)
                </span>
              </h3>
            </div>

            <div className="divide-y divide-gray-100">
              {filteredHabits.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  No habits in this category yet. Add your first habit!
                </div>
              ) : (
                filteredHabits.map((habit) => (
                  <div key={habit.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => toggleHabit(habit.id)}
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                            habit.completedToday
                              ? 'bg-green-400 text-white shadow-sm'
                              : 'border-2 border-gray-300 hover:border-green-400'
                          }`}
                        >
                          {habit.completedToday && <CheckCircle className="w-5 h-5" />}
                        </button>
                        
                        <div>
                          <h4 className={`font-medium ${
                            habit.completedToday ? 'text-gray-500 line-through' : 'text-gray-800'
                          }`}>
                            {habit.name}
                          </h4>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${habit.color}`}>
                              {habit.category}
                            </span>
                            <div className="flex items-center space-x-1 text-sm text-gray-500">
                              <Flame className="w-4 h-4 text-orange-500" />
                              <span>{habit.streak} day streak</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-800">{habit.streak}</div>
                          <div className="text-sm text-gray-500">days</div>
                        </div>
                        <button
                          onClick={() => deleteHabit(habit.id)}
                          className="text-red-400 hover:text-red-600 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitPlanner;
