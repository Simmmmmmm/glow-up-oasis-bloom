
import React, { useState, useEffect } from 'react';
import { Calendar, Search, Save, Tag } from 'lucide-react';
import { userDataService } from '../services/userDataService';

interface JournalEntry {
  id: string;
  date: string;
  mood: string;
  title: string;
  content: string;
  tags: string[];
}

const Journal = () => {
  const [selectedMood, setSelectedMood] = useState('');
  const [entry, setEntry] = useState('');
  const [entryTitle, setEntryTitle] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPrompts, setShowPrompts] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  
  const moods = [
    { emoji: '😊', label: 'Happy', color: 'bg-yellow-100 text-yellow-700' },
    { emoji: '😌', label: 'Peaceful', color: 'bg-green-100 text-green-700' },
    { emoji: '😐', label: 'Neutral', color: 'bg-gray-100 text-gray-700' },
    { emoji: '😔', label: 'Sad', color: 'bg-blue-100 text-blue-700' },
    { emoji: '😰', label: 'Anxious', color: 'bg-red-100 text-red-700' },
    { emoji: '😴', label: 'Tired', color: 'bg-purple-100 text-purple-700' },
    { emoji: '😍', label: 'Excited', color: 'bg-pink-100 text-pink-700' },
    { emoji: '🤔', label: 'Thoughtful', color: 'bg-indigo-100 text-indigo-700' },
  ];

  const availableTags = [
    'grateful', 'stressed', 'motivated', 'family', 'friends', 'work', 
    'self-care', 'health', 'goals', 'reflection', 'achievement', 'challenge'
  ];

  const journalPrompts = [
    "What made me smile today?",
    "What am I most grateful for right now?",
    "How did I practice self-care today?",
    "What challenged me today and how did I handle it?",
    "What are three things I accomplished today?",
    "How am I feeling about my goals right now?",
    "What would I tell my younger self today?",
    "What positive affirmation do I need to hear?",
  ];

  useEffect(() => {
    const email = localStorage.getItem('glowup_userEmail');
    if (email) {
      setUserEmail(email);
      const userData = userDataService.getUserData(email);
      if (userData && userData.journalEntries) {
        setEntries(userData.journalEntries);
      }
    }
  }, []);

  const saveEntry = () => {
    if (!entry.trim() || !selectedMood || !userEmail) return;

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      mood: selectedMood,
      title: entryTitle || `Journal Entry - ${new Date().toLocaleDateString()}`,
      content: entry,
      tags: selectedTags
    };

    const userData = userDataService.getUserData(userEmail);
    if (!userData) return;

    userData.journalEntries = [newEntry, ...userData.journalEntries];
    userDataService.saveUserData(userEmail, userData);
    
    setEntries([newEntry, ...entries]);

    // Reset form
    setEntry('');
    setEntryTitle('');
    setSelectedMood('');
    setSelectedTags([]);
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const filteredEntries = entries.filter(entry => 
    entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const usePrompt = (prompt: string) => {
    setEntry(prompt + '\n\n');
    setShowPrompts(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Daily Journal</h2>
        <p className="text-gray-600">Express your thoughts and track your emotions</p>
      </div>

      {/* New Entry Form */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-pink-100 mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">How are you feeling today?</h3>
        
        {/* Entry Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Entry Title (optional)</label>
          <input
            type="text"
            value={entryTitle}
            onChange={(e) => setEntryTitle(e.target.value)}
            placeholder="Give your entry a title..."
            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-300 focus:border-transparent"
          />
        </div>

        {/* Mood Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">Select your mood:</label>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
            {moods.map((mood) => (
              <button
                key={mood.label}
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

        {/* Writing Prompts */}
        <div className="mb-4">
          <button
            onClick={() => setShowPrompts(!showPrompts)}
            className="text-purple-600 hover:text-purple-700 text-sm font-medium"
          >
            {showPrompts ? 'Hide' : 'Show'} Writing Prompts
          </button>
          
          {showPrompts && (
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
              {journalPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => usePrompt(prompt)}
                  className="text-left p-3 bg-purple-50 hover:bg-purple-100 rounded-lg text-sm text-purple-700 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Journal Entry */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">What's on your mind?</label>
          <textarea
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder="Write about your day, your feelings, your goals, or anything that comes to mind..."
            className="w-full h-40 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-300 focus:border-transparent resize-none"
          ></textarea>
        </div>

        {/* Tags */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">Add tags:</label>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  selectedTags.includes(tag)
                    ? 'bg-pink-400 text-white'
                    : 'bg-pink-100 text-pink-700 hover:bg-pink-200'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            {selectedTags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs">
                #{tag}
              </span>
            ))}
          </div>
          <button
            onClick={saveEntry}
            disabled={!entry.trim() || !selectedMood}
            className="flex items-center space-x-2 bg-gradient-to-r from-pink-400 to-purple-400 text-white px-6 py-2 rounded-full hover:from-pink-500 hover:to-purple-500 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            <span>Save Entry</span>
          </button>
        </div>
      </div>

      {/* Previous Entries */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Your Journal Entries ({entries.length})</h3>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search entries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-full text-sm focus:ring-2 focus:ring-purple-300 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {filteredEntries.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              {entries.length === 0 ? 'No journal entries yet. Start writing your first entry!' : 'No entries match your search.'}
            </p>
          ) : (
            filteredEntries.map((journalEntry) => {
              const mood = moods.find(m => m.label === journalEntry.mood);
              return (
                <div key={journalEntry.id} className="p-4 border border-gray-100 rounded-xl hover:shadow-sm transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{mood?.emoji}</span>
                      <div>
                        <div className="text-lg font-medium text-gray-800">{journalEntry.title}</div>
                        <div className="text-sm text-gray-500">{new Date(journalEntry.date).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${mood?.color}`}>
                      {journalEntry.mood}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-3 leading-relaxed">
                    {journalEntry.content.length > 200 
                      ? journalEntry.content.substring(0, 200) + '...' 
                      : journalEntry.content}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {journalEntry.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Journal;
