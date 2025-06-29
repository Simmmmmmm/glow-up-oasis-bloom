
import React, { useState } from 'react';
import { CheckCircle, Plus, Clock } from 'lucide-react';

const HabitPlanner = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newHabit, setNewHabit] = useState('');

  const habits = [
    {
      id: 1,
      name: 'Drink 8 glasses of water',
      category: 'Health',
      streak: 7,
      completed: true,
      completedToday: true,
      color: 'bg-blue-100 text-blue-700'
    },
    {
      id: 2,
      name: 'Morning skincare routine',
      category: 'Beauty',
      streak: 12,
      completed: true,
      completedToday: true,
      color: 'bg-pink-100 text-pink-700'
    },
    {
      id: 3,
      name: 'Take a 10-minute walk',
      category: 'Fitness',
      streak: 5,
      completed: false,
      completedToday: false,
      color: 'bg-green-100 text-green-700'
    },
    {
      id: 4,
      name: 'Practice gratitude',
      category: 'Mindfulness',
      streak: 3,
      completed: false,
      completedToday: false,
      color: 'bg-purple-100 text-purple-700'
    },
    {
      id: 5,
      name: 'Read for 20 minutes',
      category: 'Learning',
      streak: 0,
      completed: false,
      completedToday: false,
      color: 'bg-yellow-100 text-yellow-700'
    },
    {
      id: 6,
      name: 'Get 8 hours of sleep',
      category: 'Health',
      streak: 4,
      completed: false,
      completedToday: false,
      color: 'bg-indigo-100 text-indigo-700'
    }
  ];

  const categories = ['All', 'Health', 'Beauty', 'Fitness', 'Mindfulness', 'Learning'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredHabits = selectedCategory === 'All' 
    ? habits 
    : habits.filter(habit => habit.category === selectedCategory);

  const completedCount = habits.filter(habit => habit.completedToday).length;
  const totalCount = habits.length;
  const completionPercentage = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Habit Planner</h2>
        <p className="text-gray-600">Build positive habits and track your daily progress</p>
      </div>

      {/* Progress Overview */}
      <div className="bg-gradient-to-r from-mint-100 to-green-100 rounded-2xl p-6 mb-8 shadow-sm border border-mint-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-green-800">Today's Progress</h3>
            <p className="text-green-600">Keep up the great work! 🌟</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-green-700">{completedCount}/{totalCount}</div>
            <div className="text-sm text-green-600">habits completed</div>
          </div>
        </div>
        
        <div className="w-full bg-green-200 rounded-full h-3 mb-2">
          <div
            className="bg-gradient-to-r from-green-400 to-mint-400 h-3 rounded-full transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
        <div className="text-sm text-green-700 font-medium">{completionPercentage}% complete</div>
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
                <div className="flex space-x-2">
                  <button className="flex-1 bg-pink-100 text-pink-700 py-2 rounded-lg hover:bg-pink-200 transition-colors">
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
              </h3>
            </div>

            <div className="divide-y divide-gray-100">
              {filteredHabits.map((habit) => (
                <div key={habit.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
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
                            <Clock className="w-4 h-4" />
                            <span>{habit.streak} day streak</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-800">{habit.streak}</div>
                      <div className="text-sm text-gray-500">days</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitPlanner;
