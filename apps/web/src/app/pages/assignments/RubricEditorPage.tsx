import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { assignmentSchema } from '@teacher-ai/core/dist/schemas/assignment';
import { apiClient } from '../../services/apiClient';

export const RubricEditorPage: React.FC = () => {
  const { assignmentId } = useParams<{ assignmentId: string }>();
  const { data: assignment } = useQuery(['assignment', assignmentId], () =>
    apiClient.get(`/assignments/${assignmentId}`).then((res) => res.data)
  );
  if (!assignment) return <div>Loading...</div>;
  const parsed = assignmentSchema.parse(assignment);
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Rubric for {parsed.title}</h2>
      <ul className="list-disc pl-5">
        {parsed.rubric.criteria.map((c) => (
          <li key={c.id}>{c.description} – {c.maxScore} points</li>
        ))}
      </ul>
    </div>
  );
};