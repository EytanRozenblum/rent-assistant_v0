export interface MetricData {
  label: string;
  value: number;
  change: number;
  status: 'increase_good' | 'increase_bad' | 'decrease_good' | 'decrease_bad' | null;
  markets?: {
    [key: string]: {
      value: number;
      change: number;
      status: 'increase_good' | 'increase_bad' | 'decrease_good' | 'decrease_bad' | null;
    };
  };
  communities?: {
    [key: string]: {
      value: number;
      change: number;
      status: 'increase_good' | 'increase_bad' | 'decrease_good' | 'decrease_bad' | null;
    };
  };
} 