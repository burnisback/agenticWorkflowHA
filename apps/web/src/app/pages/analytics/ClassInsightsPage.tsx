import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Assignment, Grade } from '@teacher-ai/core';
import { apiClient } from '../../services/apiClient';
import { DataTable } from '@teacher-ai/ui';

/**
 * ClassInsightsPage summarises the class performance by computing average
 * scores for each assignment. In a future version this page could show
 * distribution charts, engagement trends and other analytics. For now it
 * presents a simple table of assignment averages.
 */
export const ClassInsightsPage: React.FC = () => {
  const { data: assignments = [] } = useQuery<Assignment[]>(['assignments'], () => apiClient.get('/assignments').then((res) => res.data));
  const { data: grades = [] } = useQuery<Grade[]>(['grades'], () => apiClient.get('/grades').then((res) => res.data));

  const rows = useMemo(() => {
    return assignments.map((assignment) => {
      const assignmentGrades = grades.filter((g) => g.assignmentId === assignment.id);
      const avg = assignmentGrades.length
        ? assignmentGrades.reduce((sum, g) => sum + g.score, 0) / (assignmentGrades.length * 15)
        : 0;
      return {
        assignmentTitle: assignment.title,
        averageScore: (avg * 100).toFixed(1) + '%',
        submissions: assignmentGrades.length
      };
    });
  }, [assignments, grades]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Class Insights</h2>
      <DataTable
        data={rows}
        columns={[
          { header: 'Assignment', accessor: (row) => row.assignmentTitle },
          { header: 'Average Score', accessor: (row) => row.averageScore },
          { header: 'Submissions', accessor: (row) => row.submissions }
        ]}
      />
    </div>
  );
};