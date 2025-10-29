import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Grade, Assignment } from '@teacher-ai/core';
import { apiClient } from '../../services/apiClient';
import { DataTable } from '@teacher-ai/ui';
import { useAuth } from '../providers/AuthProviderStub';

/**
 * Student360Page aggregates a student's performance across all assignments. It
 * fetches the grades and assignments from the API, filters them for the
 * current user and displays a simple table of scores alongside overall
 * statistics. In a future iteration this page can include mastery
 * visualisations such as heatmaps, risk flags and recommendations.
 */
export const Student360Page: React.FC = () => {
  const { user } = useAuth();
  const { data: grades = [] } = useQuery<Grade[]>(['grades'], () => apiClient.get('/grades').then((res) => res.data));
  const { data: assignments = [] } = useQuery<Assignment[]>(['assignments'], () => apiClient.get('/assignments').then((res) => res.data));

  const userGrades = useMemo(() => grades.filter((g) => g.studentId === user?.id), [grades, user]);
  const rows = userGrades.map((g) => {
    const assignment = assignments.find((a) => a.id === g.assignmentId);
    return {
      assignmentTitle: assignment?.title ?? g.assignmentId,
      score: g.score,
      feedback: g.feedback
    };
  });
  const averageScore = useMemo(() => {
    if (userGrades.length === 0) return 0;
    return (
      userGrades.reduce((sum, g) => sum + g.score, 0) / (userGrades.length * 15) // rubric max total 15 (3 criteria * 5)
    ) * 100;
  }, [userGrades]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Student 360</h2>
      {user ? (
        <>
          <p className="mb-4">Hello, {user.name}! Here is your progress overview:</p>
          <p className="mb-4">Average Score: {averageScore.toFixed(1)}%</p>
          <DataTable
            data={rows}
            columns={[
              { header: 'Assignment', accessor: (row) => row.assignmentTitle },
              { header: 'Score', accessor: (row) => `${row.score}/15` },
              { header: 'Feedback', accessor: (row) => row.feedback }
            ]}
          />
        </>
      ) : (
        <p>Please log in to see your analytics.</p>
      )}
    </div>
  );
};