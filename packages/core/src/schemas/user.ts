import { z } from 'zod';

export const userSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  email: z.string().email(),
  role: z.enum(['student', 'teacher', 'admin'])
});

export type UserInput = z.infer<typeof userSchema>;