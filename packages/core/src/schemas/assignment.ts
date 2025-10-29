import { z } from 'zod';

export const rubricCriterionSchema = z.object({
  id: z.string(),
  description: z.string(),
  maxScore: z.number().min(0)
});

export const rubricSchema = z.object({
  id: z.string(),
  criteria: z.array(rubricCriterionSchema)
});

export const assignmentSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  dueDate: z.string(),
  rubric: rubricSchema
});

export type AssignmentInput = z.infer<typeof assignmentSchema>;