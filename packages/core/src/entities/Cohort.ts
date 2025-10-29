import type { User } from './User';

export interface Cohort {
  id: string;
  name: string;
  students: User[];
  teacher: User;
}