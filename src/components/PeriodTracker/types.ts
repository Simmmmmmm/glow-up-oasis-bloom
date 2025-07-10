
export interface PeriodData {
  lastPeriodDate: string;
  cycleLength: number;
  periodLength: number;
  notes: string;
}

export interface CyclePhase {
  name: string;
  description: string;
  tips: string[];
  color: string;
  bgColor: string;
  borderColor: string;
}

export interface PreviousCycle {
  id: string;
  start_date: string;
  end_date: string | null;
  symptoms: string[];
  flow: string;
}

export interface TrackingFields {
  symptoms: boolean;
  flow: boolean;
  mood: boolean;
  exercise: boolean;
  sleep: boolean;
  temperature: boolean;
}
