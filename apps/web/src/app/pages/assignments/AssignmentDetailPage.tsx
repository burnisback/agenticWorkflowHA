import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Assignment } from '@teacher-ai/core';
import { apiClient } from '../../services/apiClient';

export const AssignmentDetailPage: React.FC = () => {
  const { assignmentId } = useParams<{ assignmentId: string }>();
  const { data: assignment } = useQuery<Assignment | undefined>(['assignment', assignmentId], () =>
    apiClient.get(`/assignments/${assignmentId}`).then((res) => res.data)
  );
  if (!assignment) return <div>Loading...</div>;
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">{assignment.title}</h2>
      <p>{assignment.description}</p>
      <p className="mt-2">Due: {new Date(assignment.dueDate).toLocaleDateString()}</p>
      <div className="mt-4 space-x-4">
        <Link to="submit" className="underline text-blue-600">Submit</Link>
        <Link to="rubric" className="underline text-blue-600">View Rubric</Link>
      </div>
    </div>
  );
};