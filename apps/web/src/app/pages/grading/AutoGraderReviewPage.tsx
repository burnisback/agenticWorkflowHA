import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../services/apiClient';
import { Grade } from '@teacher-ai/core';
import { Button } from '@teacher-ai/ui';

export const AutoGraderReviewPage: React.FC = () => {
  const { submissionId } = useParams<{ submissionId: string }>();
  const queryClient = useQueryClient();
  const { data: grade } = useQuery<Grade | undefined>(['grade', submissionId], () =>
    apiClient.get(`/grades`).then((res) => res.data.find((g: Grade) => g.id.includes(submissionId ?? '')))
  );
  const [score, setScore] = useState<number>(grade?.score ?? 0);
  const [feedback, setFeedback] = useState<string>(grade?.feedback ?? '');
  const mutation = useMutation((newGrade: Grade) => apiClient.post('/grades', newGrade), {
    onSuccess: () => queryClient.invalidateQueries(['grade', submissionId])
  });
  if (!grade) return <div>Loading...</div>;
  const handleSubmit = () => {
    mutation.mutate({ ...grade, score, feedback });
  };
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Auto‑grade Review</h2>
      <div className="space-y-4">
        <div>
          <label className="block">Score</label>
          <input type="number" value={score} onChange={(e) => setScore(Number(e.target.value))} className="border p-1" />
        </div>
        <div>
          <label className="block">Feedback</label>
          <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} className="border p-1 w-full" />
        </div>
        <Button onClick={handleSubmit}>Save Grade</Button>
      </div>
    </div>
  );
};