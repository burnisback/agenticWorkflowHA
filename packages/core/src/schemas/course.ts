import { z } from 'zod';
import { userSchema } from './user';

export const cohortSchema = z.object({
  id: z.string(),
  name: z.string(),
  students: z.array(userSchema),
  teacher: userSchema
});

export const lessonSchema = z.object({
  id: z.string(),
  title: z.string(),
  moduleId: z.string(),
  content: z.string(),
  objectives: z.array(z.string())
});

export const courseSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  cohorts: z.array(cohortSchema),
  lessons: z.array(lessonSchema)
});

export type CourseInput = z.infer<typeof courseSchema>;