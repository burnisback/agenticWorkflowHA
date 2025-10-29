import { describe, it, expect } from 'vitest';
import { userSchema, assignmentSchema } from '@teacher-ai/core/schemas';

describe('Zod schemas', () => {
  it('validates a user object', () => {
    const obj = { id: 'u1', name: 'Test User', email: 'test@example.com', role: 'student' };
    const parsed = userSchema.parse(obj);
    expect(parsed).toEqual(obj);
  });

  it('rejects invalid user roles', () => {
    const obj: any = { id: 'u2', name: 'Bad', email: 'bad@example.com', role: 'invalid' };
    expect(() => userSchema.parse(obj)).toThrow();
  });

  it('validates an assignment object', () => {
    const obj = {
      id: 'a1',
      title: 'Test Assignment',
      description: 'Desc',
      dueDate: new Date().toISOString(),
      rubric: {
        id: 'r1',
        criteria: [
          { id: 'c1', description: 'Quality', maxScore: 5 },
          { id: 'c2', description: 'Depth', maxScore: 5 }
        ]
      }
    };
    const parsed = assignmentSchema.parse(obj);
    expect(parsed.title).toBe('Test Assignment');
  });
});