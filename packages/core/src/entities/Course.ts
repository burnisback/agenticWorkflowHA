import type { Cohort } from './Cohort';
import type { Lesson } from './Lesson';

export interface Course {
  id: string;
  title: string;
  description: string;
  cohorts: Cohort[];
  lessons: Lesson[];
}