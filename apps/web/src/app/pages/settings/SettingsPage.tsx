import React from 'react';
import { useTheme } from '../providers/ThemeProvider';
import { useFeatureFlags } from '../../services/featureFlags';

/**
 * SettingsPage centralises user and application settings such as dark mode
 * preference and feature toggles. It leverages ThemeProvider and the
 * feature flag store to persist preferences across sessions.
 */
export const SettingsPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { aiTutor, aiAutograde, analyticsStudent360, toggleFlag } = useFeatureFlags();
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Settings</h2>
      <section className="mb-6">
        <h3 className="text-xl font-medium mb-2">Appearance</h3>
        <button
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded"
          onClick={toggleTheme}
        >
          Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
      </section>
      <section>
        <h3 className="text-xl font-medium mb-2">Feature Flags</h3>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input type="checkbox" checked={aiTutor} onChange={() => toggleFlag('aiTutor')} />
            <span>AI Tutor</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" checked={aiAutograde} onChange={() => toggleFlag('aiAutograde')} />
            <span>AI Autograde</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" checked={analyticsStudent360} onChange={() => toggleFlag('analyticsStudent360')} />
            <span>Student 360 Analytics</span>
          </label>
        </div>
      </section>
    </div>
  );
};