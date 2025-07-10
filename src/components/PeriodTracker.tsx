
import React, { useState, useEffect } from 'react';
import { supabaseService } from '../services/supabaseService';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/use-toast';
import { PeriodData } from './PeriodTracker/types';
import { cyclePhases } from './PeriodTracker/cyclePhases';
import { calculateCurrentPhase } from './PeriodTracker/utils';
import PhaseBanner from './PeriodTracker/PhaseBanner';
import PeriodCalendar from './PeriodTracker/PeriodCalendar';
import PreviousCycles from './PeriodTracker/PreviousCycles';
import CycleOverview from './PeriodTracker/CycleOverview';
import PeriodLogger from './PeriodTracker/PeriodLogger';
import PhaseTips from './PeriodTracker/PhaseTips';

const PeriodTracker = () => {
  const [periodData, setPeriodData] = useState<PeriodData>({
    lastPeriodDate: '',
    cycleLength: 28,
    periodLength: 7,
    notes: ''
  });

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [existingPeriods, setExistingPeriods] = useState<any[]>([]);
  const { user } = useAuth();
  const { toast } = useToast();

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
          periodLength: 7,
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

  const addPreviousCycle = async (cycleData: any) => {
    if (!user) return;

    setLoading(true);
    try {
      await supabaseService.createPeriodEntry(cycleData);
      await loadPeriodData();
      
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
  };

  const currentPhase = calculateCurrentPhase(periodData);
  const currentPhaseData = cyclePhases[currentPhase];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Period Tracker</h2>
        <p className="text-gray-600 dark:text-gray-300">Track your menstrual cycle and stay informed about your body</p>
      </div>

      {/* Current Phase Banner */}
      <PhaseBanner currentPhaseData={currentPhaseData} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar View */}
        <div className="lg:col-span-2 space-y-6">
          <PeriodCalendar 
            periodData={periodData}
            currentMonth={currentMonth}
            setCurrentMonth={setCurrentMonth}
          />

          <PreviousCycles 
            existingPeriods={existingPeriods}
            loading={loading}
            onAddCycle={addPreviousCycle}
            onDeleteCycle={deletePreviousCycle}
          />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <CycleOverview periodData={periodData} />

          <PeriodLogger 
            periodData={periodData}
            loading={loading}
            onInputChange={handleInputChange}
            onSave={handleSavePeriodData}
          />

          <PhaseTips 
            currentPhaseData={currentPhaseData}
            currentPhase={currentPhase}
          />
        </div>
      </div>
    </div>
  );
};

export default PeriodTracker;
