import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Course } from '@teacher-ai/core';
import { apiClient } from '../../services/apiClient';
import { DataTable, Button, Card } from '@teacher-ai/ui';

/**
 * CoursesAdminPage provides a simple CRUD interface for managing courses.
 * New courses can be added via a form; editing and deletion can be added
 * later. Data is stored in the in‑memory fixtures via MSW handlers.
 */
export const CoursesAdminPage: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: courses = [] } = useQuery<Course[]>(['courses'], () => apiClient.get('/courses').then((res) => res.data));
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const mutation = useMutation((course: Course) => apiClient.post('/courses', course).then((res) => res.data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['courses']);
      setTitle('');
      setDescription('');
    }
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `course${Date.now()}`;
    mutation.mutate({ id, title, description, cohorts: [], lessons: [] });
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Courses Admin</h2>
      <Card className="p-4 mb-4">
        <form onSubmit={submit} className="space-y-2">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              className="w-full border rounded p-2"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <input
              className="w-full border rounded p-2"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <Button type="submit" disabled={mutation.isLoading}>Add Course</Button>
        </form>
      </Card>
      <DataTable
        data={courses}
        columns={[
          { header: 'ID', accessor: (c) => c.id },
          { header: 'Title', accessor: (c) => c.title },
          { header: 'Description', accessor: (c) => c.description },
          { header: 'Cohorts', accessor: (c) => c.cohorts?.length ?? 0 }
        ]}
      />
    </div>
  );
};