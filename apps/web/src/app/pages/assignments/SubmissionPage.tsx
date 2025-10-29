import React from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { apiClient } from '../../services/apiClient';
import { Button } from '@teacher-ai/ui';

const schema = z.object({
  content: z.string().min(1, 'Please enter your submission')
});

export const SubmissionPage: React.FC = () => {
  const { assignmentId } = useParams<{ assignmentId: string }>();
  const { register, handleSubmit, formState } = useForm<{ content: string }>({ resolver: zodResolver(schema) });
  const onSubmit = async (values: { content: string }) => {
    await apiClient.post('/submissions', {
      assignmentId,
      studentId: 'student1',
      content: values.content,
      submittedAt: new Date().toISOString()
    });
    alert('Submission saved');
  };
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Submit Assignment</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <textarea className="w-full p-2 border rounded" rows={6} {...register('content')} />
        {formState.errors.content && <p className="text-red-600">{formState.errors.content.message}</p>}
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};