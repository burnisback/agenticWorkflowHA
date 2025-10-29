import type { Rubric } from './Rubric';

export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  rubric: Rubric;
}