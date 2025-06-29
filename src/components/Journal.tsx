
import React, { useState } from 'react';
import { Calendar, Search } from 'lucide-react';

const Journal = () => {
  const [selectedMood, setSelectedMood] = useState('');
  const [entry, setEntry] = useState('');
  
  const moods = [
    { emoji: '😊', label: 'Happy', color: 'bg-yellow-100 text-yellow-700' },
    { emoji: '😌', label: 'Peaceful', color: 'bg-green-100 text-green-700' },
    { emoji: '😐', label: 'Neutral', color: 'bg-gray-100 text-gray-700' },
    { emoji: '😔', label: 'Sad', color: 'bg-blue-100 text-blue-700' },
    { emoji: '😰', label: 'Anxious', color: 'bg-red-100 text-red-700' },
    { emoji: '😴', label: 'Tired', color: 'bg-purple-100 text-purple-700' },
  ];

  const journalEntries = [
    {
      date: '2024-01-15',
      mood: '😊',
      preview: 'Had an amazing day at the park with friends. The weather was perfect and I felt so grateful...',
      tags: ['grateful', 'friends', 'nature']
    },
    {
      date: '2024-01-14', 
      mood: '😌',
      preview: 'Did my morning yoga routine and it helped me feel centered for the day. Self-care Sundays are the best...',
      tags: ['yoga', 'self-care', 'peaceful']
    },
    {
      date: '2024-01-13',
      mood: '😰',
      preview: 'Feeling a bit overwhelmed with work today. Need to remember to take breaks and breathe...',
      tags: ['work', 'stress', 'mindfulness']
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Daily Journal</h2>
        <p className="text-gray-600">Express your thoughts and track your emotions</p>
      </div>

      {/* New Entry Form */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-pink-100 mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">How are you feeling today?</h3>
        
        {/* Mood Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">Select your mood:</label>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {moods.map((mood, index) => (
              <button
                key={index}
                onClick={() => setSelectedMood(mood.label)}
                className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                  selectedMood === mood.label
                    ? `${mood.color} border-current shadow-sm`
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-2xl mb-1">{mood.emoji}</div>
                <div className="text-xs font-medium">{mood.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Journal Entry */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">What's on your mind?</label>
          <textarea
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder="Write about your day, your feelings, your goals, or anything that comes to mind..."
            className="w-full h-32 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-300 focus:border-transparent resize-none"
          ></textarea>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs">#grateful</span>
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">#self-care</span>
          </div>
          <button className="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-6 py-2 rounded-full hover:from-pink-500 hover:to-purple-500 transition-all duration-200 font-medium">
            Save Entry
          </button>
        </div>
      </div>

      {/* Previous Entries */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Previous Entries</h3>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search entries..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-full text-sm focus:ring-2 focus:ring-purple-300 focus:border-transparent"
              />
            </div>
            <button className="flex items-center space-x-2 text-gray-600 hover:text-purple-600">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">Filter</span>
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {journalEntries.map((entry, index) => (
            <div key={index} className="p-4 border border-gray-100 rounded-xl hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{entry.mood}</span>
                  <div>
                    <div className="text-sm font-medium text-gray-800">{entry.date}</div>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 mb-3 leading-relaxed">{entry.preview}</p>
              <div className="flex space-x-2">
                {entry.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Journal;
