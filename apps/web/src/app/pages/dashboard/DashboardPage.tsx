import React from 'react';
import { useAuth } from '../../providers/AuthProviderStub';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
      {user ? <p>Welcome, {user.name}!</p> : <p>Please log in to see your dashboard.</p>}
    </div>
  );
};