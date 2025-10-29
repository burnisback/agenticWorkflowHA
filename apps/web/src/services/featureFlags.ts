import create from 'zustand';

/**
 * Defines the shape of our feature flags. Additional flags can be added here
 * as the application grows. Flags should default to true for features that
 * are part of the MVP and false for experimental/beta features.
 */
export interface FeatureFlags {
  aiTutor: boolean;
  aiAutograde: boolean;
  analyticsStudent360: boolean;
  toggleFlag: (flag: keyof Omit<FeatureFlags, 'toggleFlag'>) => void;
}

export const useFeatureFlags = create<FeatureFlags>((set) => ({
  aiTutor: true,
  aiAutograde: true,
  analyticsStudent360: true,
  toggleFlag: (flag) => set((state) => ({ ...state, [flag]: !state[flag] }))
}));