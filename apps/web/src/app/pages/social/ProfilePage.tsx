import React from 'react';
import { useAuth } from '../../providers/AuthProviderStub';

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  if (!user) return <div>Please log in to view your profile.</div>;
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  );
};