import type { User } from '@teacher-ai/core';
import { demoTeacher, demoStudents } from '@teacher-ai/mocks';

/**
 * authClient is an abstraction for authentication that can later be
 * implemented using Cognito, Firebase, Auth0 or another provider. For
 * development purposes we provide a simple in‑memory stub. Consumers of
 * this client should not assume any particular auth implementation.
 */
class AuthClientStub {
  private currentUser: User | null = null;
  private listeners: Array<(user: User | null) => void> = [];

  /**
   * Sign in as a specific role. When role is "student" the optional index
   * parameter selects one of the demo students. This method notifies
   * subscribers of the new auth state.
   */
  async login(role: 'teacher' | 'student' | 'admin', index = 0): Promise<User> {
    let user: User;
    if (role === 'teacher') user = demoTeacher;
    else if (role === 'student') user = demoStudents[index] ?? demoStudents[0];
    else user = { id: 'admin', name: 'Admin', email: 'admin@example.com', role: 'admin' };
    this.currentUser = user;
    this.listeners.forEach((fn) => fn(this.currentUser));
    return user;
  }

  /**
   * Sign out the current user.
   */
  async logout(): Promise<void> {
    this.currentUser = null;
    this.listeners.forEach((fn) => fn(this.currentUser));
  }

  /**
   * Returns the currently authenticated user, if any.
   */
  async getCurrentUser(): Promise<User | null> {
    return this.currentUser;
  }

  /**
   * Subscribe to auth state changes. Returns an unsubscribe function.
   */
  onAuthStateChanged(callback: (user: User | null) => void): () => void {
    this.listeners.push(callback);
    // Immediately invoke the callback with the current state
    callback(this.currentUser);
    return () => {
      this.listeners = this.listeners.filter((fn) => fn !== callback);
    };
  }
}

export const authClient = new AuthClientStub();