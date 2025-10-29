import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/learn', label: 'Learn' },
  { to: '/assignments', label: 'Assignments' },
  { to: '/grading', label: 'Grading' },
  { to: '/chat', label: 'Chat' },
  { to: '/social', label: 'Social' },
  { to: '/analytics', label: 'Analytics' },
  { to: '/admin', label: 'Admin' },
  { to: '/settings', label: 'Settings' }
];

export const Sidebar: React.FC = () => {
  return (
    <nav className="flex flex-col space-y-2 p-4 bg-gray-100 dark:bg-gray-800 min-h-screen w-48">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${isActive ? 'font-semibold' : ''}`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
};