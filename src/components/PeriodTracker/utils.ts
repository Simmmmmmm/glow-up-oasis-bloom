
import { PeriodData } from './types';

export const calculateCurrentPhase = (periodData: PeriodData) => {
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

export const calculateNextPeriod = (periodData: PeriodData) => {
  if (!periodData.lastPeriodDate) return null;
  const lastDate = new Date(periodData.lastPeriodDate);
  const nextDate = new Date(lastDate.getTime() + (periodData.cycleLength * 24 * 60 * 60 * 1000));
  return nextDate;
};

export const calculateFertileWindow = (periodData: PeriodData) => {
  if (!periodData.lastPeriodDate) return { start: null, end: null };
  const lastDate = new Date(periodData.lastPeriodDate);
  const ovulationDay = periodData.cycleLength - 14;
  const fertileStart = new Date(lastDate.getTime() + ((ovulationDay - 5) * 24 * 60 * 60 * 1000));
  const fertileEnd = new Date(lastDate.getTime() + ((ovulationDay + 1) * 24 * 60 * 60 * 1000));
  return { start: fertileStart, end: fertileEnd };
};

export const formatCycleInfo = (cycle: any) => {
  const startDate = new Date(cycle.start_date);
  const endDate = cycle.end_date ? new Date(cycle.end_date) : null;
  const cycleDuration = endDate ? Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1 : 'Ongoing';
  
  return {
    month: startDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    startDate: startDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
    endDate: endDate ? endDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }) : 'Ongoing',
    duration: cycleDuration,
    flow: cycle.flow || 'normal',
    symptoms: cycle.symptoms || []
  };
};
