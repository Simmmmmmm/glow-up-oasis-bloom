import React, { useState, useEffect } from 'react';
import { Calendar, Heart, AlertCircle, Info, Settings, Plus, Edit3, Save, Trash2 } from 'lucide-react';
import { supabaseService } from '../services/supabaseService';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/use-toast';

interface PeriodData {
  lastPeriodDate: string;
  cycleLength: number;
  periodLength: number;
  notes: string;
}

interface CyclePhase {
  name: string;
  description: string;
  tips: string[];
  color: string;
  bgColor: string;
  borderColor: string;
}

interface PreviousCycle {
  id: string;
  start_date: string;
  end_date: string | null;
  symptoms: string[];
  flow: string;
}

const PeriodTracker = () => {
  const [periodData, setPeriodData] = useState<PeriodData>({
    lastPeriodDate: '',
    cycleLength: 28,
    periodLength: 5,
    notes: ''
  });

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [existingPeriods, setExistingPeriods] = useState<any[]>([]);
  const [showCustomization, setShowCustomization] = useState(false);
  const [selectedPhase, setSelectedPhase] = useState<string>('menstrual');
  const [showCycleCustomization, setShowCycleCustomization] = useState(false);
  const [showPreviousCycles, setShowPreviousCycles] = useState(false);
  const [newCycleEntry, setNewCycleEntry] = useState({
    start_date: '',
    end_date: '',
    symptoms: [] as string[],
    flow: 'normal'
  });
  const { user } = useAuth();
  const { toast } = useToast();

  const [trackingFields, setTrackingFields] = useState({
    symptoms: true,
    flow: true,
    mood: true,
    exercise: false,
    sleep: false,
    temperature: false
  });

  const [customSymptoms, setCustomSymptoms] = useState<string[]>([
    'Cramps', 'Headache', 'Bloating', 'Fatigue', 'Mood swings', 'Back pain'
  ]);

  const cyclePhases: Record<string, CyclePhase> = {
    menstrual: {
      name: 'Menstrual Phase',
      description: 'Days 1-5: Your period is here',
      tips: [
        '🌸 Use a heating pad for cramps relief',
        '💧 Stay extra hydrated to replace lost fluids',
        '🧘‍♀️ Practice gentle yoga or light stretching',
        '🥗 Eat iron-rich foods like spinach and lean meats',
        '😴 Get plenty of rest - your body is working hard',
        '🛁 Take warm baths to soothe muscle tension',
        '🍫 Dark chocolate can help with cramps and mood'
      ],
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-50 dark:bg-red-900/30',
      borderColor: 'border-red-200 dark:border-red-800'
    },
    follicular: {
      name: 'Follicular Phase',
      description: 'Days 1-13: Energy is building',
      tips: [
        '💪 Great time to start new workout routines',
        '🧠 Take advantage of increased focus and creativity',
        '🥬 Focus on fresh, nutrient-dense foods',
        '☀️ Get morning sunlight to boost mood',
        '📚 Perfect time for learning new skills',
        '🎯 Set and work toward new goals',
        '🌱 Try meal prepping for the week ahead'
      ],
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-900/30',
      borderColor: 'border-green-200 dark:border-green-800'
    },
    ovulatory: {
      name: 'Ovulatory Phase',
      description: 'Days 12-16: Peak energy and fertility',
      tips: [
        '🔥 Energy levels are at their highest',
        '💬 Great time for important conversations',
        '🏃‍♀️ Try high-intensity workouts',
        '🥑 Eat healthy fats to support hormone production',
        '🌟 Confidence is naturally higher',
        '💼 Schedule important meetings or presentations',
        '🎉 Social activities feel more enjoyable'
      ],
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-50 dark:bg-orange-900/30',
      borderColor: 'border-orange-200 dark:border-orange-800'
    },
    luteal: {
      name: 'Luteal Phase',
      description: 'Days 15-28: Winding down toward next cycle',
      tips: [
        '🧘‍♀️ Focus on gentle, restorative activities',
        '🍠 Eat complex carbs to stabilize mood',
        '📝 Journal to process emotions',
        '💤 Prioritize quality sleep',
        '🫖 Try herbal teas like chamomile',
        '🛀 Take relaxing baths with magnesium',
        '🤗 Practice self-compassion and patience'
      ],
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-900/30',
      borderColor: 'border-purple-200 dark:border-purple-800'
    }
  };

  useEffect(() => {
    if (user) {
      loadPeriodData();
    }
  }, [user]);

  const loadPeriodData = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const periods = await supabaseService.getPeriodData();
      setExistingPeriods(periods);
      
      if (periods && periods.length > 0) {
        const lastPeriod = periods[periods.length - 1];
        setPeriodData({
          lastPeriodDate: lastPeriod.start_date,
          cycleLength: 28,
          periodLength: 5,
          notes: lastPeriod.symptoms?.join(', ') || ''
        });
      }
    } catch (error) {
      console.error('Error loading period data:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load period data. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const savePeriodData = async (data: PeriodData) => {
    if (!user || !data.lastPeriodDate) return;
    
    setLoading(true);
    try {
      const newPeriod = {
        start_date: data.lastPeriodDate,
        end_date: null,
        symptoms: data.notes ? data.notes.split(', ').filter(s => s.trim()) : [],
        flow: 'normal'
      };
      
      await supabaseService.createPeriodEntry(newPeriod);
      await loadPeriodData();
      
      toast({
        title: "Success",
        description: "Period data saved successfully!",
      });
    } catch (error) {
      console.error('Error saving period data:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save period data. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSavePeriodData = async () => {
    await savePeriodData(periodData);
  };

  const addPreviousCycle = async () => {
    if (!user || !newCycleEntry.start_date) return;

    setLoading(true);
    try {
      const cycleData = {
        start_date: newCycleEntry.start_date,
        end_date: newCycleEntry.end_date || null,
        symptoms: newCycleEntry.symptoms,
        flow: newCycleEntry.flow
      };
      
      await supabaseService.createPeriodEntry(cycleData);
      await loadPeriodData();
      
      // Reset form
      setNewCycleEntry({
        start_date: '',
        end_date: '',
        symptoms: [],
        flow: 'normal'
      });
      
      toast({
        title: "Success",
        description: "Previous cycle added successfully!",
      });
    } catch (error) {
      console.error('Error adding previous cycle:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add previous cycle. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const deletePreviousCycle = async (cycleId: string) => {
    if (!user) return;

    setLoading(true);
    try {
      await supabaseService.deletePeriodEntry(cycleId);
      await loadPeriodData();
      
      toast({
        title: "Success",
        description: "Cycle deleted successfully!",
      });
    } catch (error) {
      console.error('Error deleting cycle:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete cycle. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof PeriodData, value: string | number) => {
    const updatedData = { ...periodData, [field]: value };
    setPeriodData(updatedData);
    
    // Update cycle overview immediately when data changes
    if (field === 'lastPeriodDate' || field === 'cycleLength' || field === 'periodLength') {
      // The component will re-render and recalculate based on the new data
    }
  };

  const calculateCurrentPhase = () => {
    if (!periodData.lastPeriodDate) return 'menstrual';
    
    const lastPeriod = new Date(periodData.lastPeriodDate);
    const today = new Date();
    const daysSinceLastPeriod = Math.floor((today.getTime() - lastPeriod.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysSinceLastPeriod >= 0 && daysSinceLastPeriod < periodData.periodLength) {
      return 'menstrual';
    } else if (daysSinceLastPeriod < 13) {
      return 'follicular';
    } else if (daysSinceLastPeriod < 16) {
      return 'ovulatory';
    } else {
      return 'luteal';
    }
  };

  const calculateNextPeriod = () => {
    if (!periodData.lastPeriodDate) return null;
    const lastDate = new Date(periodData.lastPeriodDate);
    const nextDate = new Date(lastDate.getTime() + (periodData.cycleLength * 24 * 60 * 60 * 1000));
    return nextDate;
  };

  const calculateFertileWindow = () => {
    if (!periodData.lastPeriodDate) return { start: null, end: null };
    const lastDate = new Date(periodData.lastPeriodDate);
    const ovulationDay = periodData.cycleLength - 14;
    const fertileStart = new Date(lastDate.getTime() + ((ovulationDay - 5) * 24 * 60 * 60 * 1000));
    const fertileEnd = new Date(lastDate.getTime() + ((ovulationDay + 1) * 24 * 60 * 60 * 1000));
    return { start: fertileStart, end: fertileEnd };
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const getDayType = (day: number) => {
    if (!periodData.lastPeriodDate || !day) return 'normal';
    
    const checkDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const lastPeriod = new Date(periodData.lastPeriodDate);
    const nextPeriod = calculateNextPeriod();
    const fertile = calculateFertileWindow();
    
    const daysDiff = Math.floor((checkDate.getTime() - lastPeriod.getTime()) / (1000 * 60 * 60 * 24));
    if (daysDiff >= 0 && daysDiff < periodData.periodLength) {
      return 'period';
    }
    
    if (nextPeriod && Math.abs(checkDate.getTime() - nextPeriod.getTime()) < (24 * 60 * 60 * 1000)) {
      return 'predicted-period';
    }
    
    if (fertile.start && fertile.end && checkDate >= fertile.start && checkDate <= fertile.end) {
      return 'fertile';
    }
    
    return 'normal';
  };

  const getDayStyle = (dayType: string) => {
    switch (dayType) {
      case 'period':
        return 'bg-red-200 dark:bg-red-900/50 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700';
      case 'predicted-period':
        return 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800 border-dashed';
      case 'fertile':
        return 'bg-green-200 dark:bg-green-900/50 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700';
      default:
        return 'bg-gray-50 dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600 text-gray-900 dark:text-gray-100';
    }
  };

  const addCustomSymptom = () => {
    const newSymptom = prompt('Enter a new symptom to track:');
    if (newSymptom && !customSymptoms.includes(newSymptom)) {
      setCustomSymptoms([...customSymptoms, newSymptom]);
    }
  };

  const nextPeriod = calculateNextPeriod();
  const fertile = calculateFertileWindow();
  const daysUntilNext = nextPeriod ? Math.ceil((nextPeriod.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : null;
  const currentPhase = calculateCurrentPhase();
  const currentPhaseData = cyclePhases[currentPhase];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Period Tracker</h2>
        <p className="text-gray-600 dark:text-gray-300">Track your menstrual cycle and stay informed about your body</p>
      </div>

      {/* Current Phase Banner */}
      <div className={`${currentPhaseData.bgColor} rounded-2xl p-6 mb-8 shadow-sm border ${currentPhaseData.borderColor}`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className={`text-xl font-semibold ${currentPhaseData.color}`}>
              {currentPhaseData.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">{currentPhaseData.description}</p>
          </div>
          <Heart className={`w-8 h-8 ${currentPhaseData.color}`} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {currentPhaseData.tips.slice(0, 3).map((tip, index) => (
            <p key={index} className="text-sm text-gray-700 dark:text-gray-300 bg-white/50 dark:bg-gray-800/50 rounded-lg p-2">
              {tip}
            </p>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar View */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-pink-100 dark:border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Cycle Calendar</h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full text-gray-600 dark:text-gray-300"
                >
                  ←
                </button>
                <span className="font-medium text-gray-800 dark:text-gray-100">
                  {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </span>
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full text-gray-600 dark:text-gray-300"
                >
                  →
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 py-2">
                  {day}
                </div>
              ))}
              
              {getDaysInMonth(currentMonth).map((day, index) => {
                if (day === null) {
                  return <div key={index} className="aspect-square"></div>;
                }
                
                const dayType = getDayType(day);
                const dayStyle = getDayStyle(dayType);
                
                return (
                  <div
                    key={index}
                    className={`aspect-square rounded-lg border-2 flex items-center justify-center cursor-pointer transition-colors ${dayStyle}`}
                  >
                    <span className="text-sm font-medium">{day}</span>
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-100 dark:border-slate-600">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded bg-red-200 dark:bg-red-900/50 border-2 border-red-300 dark:border-red-700"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">Period</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded bg-red-100 dark:bg-red-900/30 border-2 border-red-200 dark:border-red-800 border-dashed"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">Predicted Period</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded bg-green-200 dark:bg-green-900/50 border-2 border-green-300 dark:border-green-700"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">Fertile Window</span>
              </div>
            </div>
          </div>

          {/* Previous Cycles Section */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-purple-100 dark:border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Previous Cycles</h3>
              <button
                onClick={() => setShowPreviousCycles(!showPreviousCycles)}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Previous Cycle</span>
              </button>
            </div>

            {/* Add Previous Cycle Form */}
            {showPreviousCycles && (
              <div className="mb-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                <h4 className="text-sm font-medium text-purple-700 dark:text-purple-300 mb-3">Add Previous Cycle</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={newCycleEntry.start_date}
                      onChange={(e) => setNewCycleEntry({...newCycleEntry, start_date: e.target.value})}
                      className="w-full p-2 border border-gray-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      End Date (Optional)
                    </label>
                    <input
                      type="date"
                      value={newCycleEntry.end_date}
                      onChange={(e) => setNewCycleEntry({...newCycleEntry, end_date: e.target.value})}
                      className="w-full p-2 border border-gray-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Flow
                  </label>
                  <select
                    value={newCycleEntry.flow}
                    onChange={(e) => setNewCycleEntry({...newCycleEntry, flow: e.target.value})}
                    className="w-full p-2 border border-gray-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100"
                  >
                    <option value="light">Light</option>
                    <option value="normal">Normal</option>
                    <option value="heavy">Heavy</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setShowPreviousCycles(false)}
                    className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addPreviousCycle}
                    disabled={!newCycleEntry.start_date || loading}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
                  >
                    Add Cycle
                  </button>
                </div>
              </div>
            )}

            {/* Previous Cycles List */}
            <div className="space-y-3">
              {existingPeriods.slice(-5).reverse().map((cycle, index) => (
                <div key={cycle.id || index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
                        {new Date(cycle.start_date).toLocaleDateString()}
                      </span>
                      {cycle.end_date && (
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          - {new Date(cycle.end_date).toLocaleDateString()}
                        </span>
                      )}
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs">
                        {cycle.flow || 'normal'}
                      </span>
                    </div>
                    {cycle.symptoms && cycle.symptoms.length > 0 && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {cycle.symptoms.join(', ')}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => deletePreviousCycle(cycle.id)}
                    disabled={loading}
                    className="p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {existingPeriods.length === 0 && (
                <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                  No previous cycles recorded yet
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-red-100 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Cycle Overview</h3>
            
            {nextPeriod && (
              <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/30 rounded-xl">
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="w-5 h-5 text-red-600 dark:text-red-400" />
                  <span className="font-medium text-red-800 dark:text-red-300">Next Period</span>
                </div>
                <p className="text-red-700 dark:text-red-300">
                  {nextPeriod.toLocaleDateString()} ({daysUntilNext} days)
                </p>
              </div>
            )}

            {fertile.start && fertile.end && (
              <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/30 rounded-xl">
                <div className="flex items-center space-x-2 mb-2">
                  <Heart className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span className="font-medium text-green-800 dark:text-green-300">Fertile Window</span>
                </div>
                <p className="text-green-700 dark:text-green-300 text-sm">
                  {fertile.start.toLocaleDateString()} - {fertile.end.toLocaleDateString()}
                </p>
              </div>
            )}

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Cycle Length:</span>
                <span className="font-medium text-gray-800 dark:text-gray-100">{periodData.cycleLength} days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Period Length:</span>
                <span className="font-medium text-gray-800 dark:text-gray-100">{periodData.periodLength} days</span>
              </div>
            </div>
          </div>

          {/* Enhanced Customizable Log Period */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-pink-100 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Log Your Period</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowCycleCustomization(!showCycleCustomization)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full text-gray-600 dark:text-gray-300"
                  title="Customize cycle settings"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setShowCustomization(!showCustomization)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full text-gray-600 dark:text-gray-300"
                  title="Customize tracking fields"
                >
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Cycle Customization */}
            {showCycleCustomization && (
              <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
                <h4 className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-3">Cycle Settings</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Cycle Length (days)
                    </label>
                    <input
                      type="range"
                      min="21"
                      max="45"
                      value={periodData.cycleLength}
                      onChange={(e) => handleInputChange('cycleLength', parseInt(e.target.value))}
                      className="w-full"
                    />
                    <span className="text-xs text-gray-500 dark:text-gray-400">{periodData.cycleLength} days</span>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Period Length (days)
                    </label>
                    <input
                      type="range"
                      min="2"
                      max="10"
                      value={periodData.periodLength}
                      onChange={(e) => handleInputChange('periodLength', parseInt(e.target.value))}
                      className="w-full"
                    />
                    <span className="text-xs text-gray-500 dark:text-gray-400">{periodData.periodLength} days</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Adjust these settings to match your unique cycle pattern
                </p>
              </div>
            )}

            {/* Tracking Fields Customization */}
            {showCustomization && (
              <div className="mb-4 p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Customize Tracking</h4>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(trackingFields).map(([field, enabled]) => (
                    <label key={field} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={enabled}
                        onChange={(e) => setTrackingFields({
                          ...trackingFields,
                          [field]: e.target.checked
                        })}
                        className="rounded"
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-300 capitalize">
                        {field}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Last Period Start Date
                </label>
                <input
                  type="date"
                  value={periodData.lastPeriodDate}
                  onChange={(e) => handleInputChange('lastPeriodDate', e.target.value)}
                  disabled={loading}
                  className="w-full p-3 border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-pink-300 dark:focus:ring-pink-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 disabled:opacity-50"
                />
              </div>

              {trackingFields.symptoms && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Symptoms
                    </label>
                    <button
                      onClick={addCustomSymptom}
                      className="text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {customSymptoms.map((symptom) => (
                      <button
                        key={symptom}
                        onClick={() => {
                          const current = periodData.notes.split(', ').filter(s => s.trim());
                          const updated = current.includes(symptom)
                            ? current.filter(s => s !== symptom)
                            : [...current, symptom];
                          handleInputChange('notes', updated.join(', '));
                        }}
                        className={`px-3 py-1 rounded-full text-xs border ${
                          periodData.notes.includes(symptom)
                            ? 'bg-pink-100 dark:bg-pink-900/30 border-pink-300 dark:border-pink-700 text-pink-700 dark:text-pink-300'
                            : 'border-gray-200 dark:border-slate-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700'
                        }`}
                      >
                        {symptom}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Additional Notes
                </label>
                <textarea
                  value={periodData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Any additional symptoms, notes, or observations..."
                  disabled={loading}
                  className="w-full p-3 border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-pink-300 dark:focus:ring-pink-500 focus:border-transparent resize-none h-20 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 disabled:opacity-50"
                ></textarea>
              </div>

              {/* Save Button */}
              <button
                onClick={handleSavePeriodData}
                disabled={loading || !periodData.lastPeriodDate}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>{loading ? 'Saving...' : 'Save Period Data'}</span>
              </button>
            </div>
          </div>

          {/* Phase-Specific Tips */}
          <div className={`${currentPhaseData.bgColor} rounded-2xl p-6 shadow-sm border ${currentPhaseData.borderColor}`}>
            <div className="flex items-center space-x-2 mb-4">
              <Info className={`w-5 h-5 ${currentPhaseData.color}`} />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {currentPhaseData.name} Tips
              </h3>
            </div>
            
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              {currentPhaseData.tips.map((tip, index) => (
                <p key={index} className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-2">
                  {tip}
                </p>
              ))}
            </div>

            {/* Phase Selection */}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">View tips for other phases:</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(cyclePhases).map(([key, phase]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedPhase(key)}
                    className={`px-2 py-1 rounded text-xs ${
                      key === currentPhase
                        ? phase.color + ' font-medium'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                    }`}
                  >
                    {phase.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeriodTracker;
