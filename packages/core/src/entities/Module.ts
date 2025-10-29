import type { Lesson } from './Lesson';

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}