import React, { createContext, useContext, useState } from 'react';
import type { User } from '@teacher-ai/core';
import { demoTeacher, demoStudents } from '@teacher-ai/mocks';

interface AuthContextValue {
  user: User | null;
  loginAs: (role: 'teacher' | 'student' | 'admin', index?: number) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProviderStub: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const loginAs = (role: 'teacher' | 'student' | 'admin', index = 0) => {
    if (role === 'teacher') setUser(demoTeacher);
    else if (role === 'student') setUser(demoStudents[index] ?? demoStudents[0]);
    else setUser({ id: 'admin', name: 'Admin', email: 'admin@example.com', role: 'admin' });
  };
  const logout = () => setUser(null);
  return <AuthContext.Provider value={{ user, loginAs, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProviderStub');
  return ctx;
};