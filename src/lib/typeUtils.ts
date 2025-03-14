
/**
 * Type utility functions to handle type comparison issues
 */

// Type guard to check if a priority value is 'high'
export function isHighPriority(priority: string): priority is 'high' {
  return priority === 'high';
}

// Type guard to check if a priority value is 'low' or 'normal'
export function isLowOrNormalPriority(priority: string): priority is 'low' | 'normal' {
  return priority === 'low' || priority === 'normal';
}
