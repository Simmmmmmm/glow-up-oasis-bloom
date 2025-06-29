
import React from 'react';
import { Calendar, Book, CheckCircle, Sparkles } from 'lucide-react';

const Dashboard = () => {
  const todaysDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const dailyTip = "Remember to drink plenty of water today! Staying hydrated helps your skin glow and keeps your energy levels up. 💧";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Daily Tip Card */}
      <div className="lg:col-span-3 bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-6 shadow-sm border border-pink-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-purple-800">Daily Wellness Tip</h3>
            <p className="text-sm text-purple-600">{todaysDate}</p>
          </div>
        </div>
        <p className="text-purple-700 leading-relaxed">{dailyTip}</p>
      </div>

      {/* Quick Journal */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-pink-100 hover:shadow-md transition-shadow">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-pink-300 to-pink-400 rounded-full flex items-center justify-center">
            <Book className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Quick Journal</h3>
        </div>
        <p className="text-gray-600 mb-4">How are you feeling today?</p>
        <div className="flex space-x-2 mb-4">
          {['😊', '😌', '😐', '😔', '😴'].map((emoji, index) => (
            <button
              key={index}
              className="text-2xl p-2 rounded-full hover:bg-pink-50 transition-colors"
            >
              {emoji}
            </button>
          ))}
        </div>
        <button className="w-full bg-gradient-to-r from-pink-400 to-pink-500 text-white py-2 rounded-full hover:from-pink-500 hover:to-pink-600 transition-all duration-200 font-medium">
          Start Writing
        </button>
      </div>

      {/* Mood Calendar */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100 hover:shadow-md transition-shadow">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-300 to-purple-400 rounded-full flex items-center justify-center">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Mood Tracker</h3>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-4">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
            <div key={index} className="text-center text-xs font-medium text-gray-500 py-1">
              {day}
            </div>
          ))}
          {Array.from({ length: 21 }, (_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-full text-xs flex items-center justify-center ${
                i === 15 ? 'bg-purple-200 text-purple-700' : 'bg-gray-100 text-gray-400'
              }`}
            >
              {i + 1}
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-600">Today: Feeling grateful 💜</p>
      </div>

      {/* Today's Habits */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-mint-100 hover:shadow-md transition-shadow">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-mint-300 to-mint-400 rounded-full flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Today's Habits</h3>
        </div>
        <div className="space-y-3">
          {[
            { habit: 'Drink 8 glasses of water', completed: true },
            { habit: 'Morning skincare routine', completed: true },
            { habit: 'Take a 10-minute walk', completed: false },
            { habit: 'Practice gratitude', completed: false },
          ].map((item, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                item.completed ? 'bg-mint-400 text-white' : 'bg-gray-200'
              }`}>
                {item.completed && <CheckCircle className="w-3 h-3" />}
              </div>
              <span className={`text-sm ${
                item.completed ? 'text-gray-800 line-through' : 'text-gray-600'
              }`}>
                {item.habit}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
