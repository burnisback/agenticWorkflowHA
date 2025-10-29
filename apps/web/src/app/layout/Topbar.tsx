import React from 'react';
import { useTheme } from '../providers/ThemeProvider';
import { useAuth } from '../providers/AuthProviderStub';

export const Topbar: React.FC = () => {
  const { toggleTheme } = useTheme();
  const { user, loginAs, logout } = useAuth();
  return (
    <header className="flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-900 shadow">
      <h1 className="text-xl font-bold">Teacher AI</h1>
      <div className="flex items-center space-x-4">
        <button onClick={toggleTheme} className="text-sm underline">
          Toggle theme
        </button>
        {user ? (
          <>
            <span className="text-sm">{user.name}</span>
            <button onClick={logout} className="text-sm underline">
              Logout
            </button>
          </>
        ) : (
          <>
            <button onClick={() => loginAs('teacher')} className="text-sm underline">
              Login as Teacher
            </button>
            <button onClick={() => loginAs('student')} className="text-sm underline">
              Login as Student
            </button>
          </>
        )}
      </div>
    </header>
  );
};