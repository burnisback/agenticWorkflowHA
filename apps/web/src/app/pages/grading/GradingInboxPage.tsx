import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Submission } from '@teacher-ai/core';
import { apiClient } from '../../services/apiClient';
import { DataTable } from '@teacher-ai/ui';
import { Link } from 'react-router-dom';

export const GradingInboxPage: React.FC = () => {
  const { data: submissions = [] } = useQuery<Submission[]>(['submissions'], () =>
    apiClient.get('/submissions').then((res) => res.data)
  );
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Grading Inbox</h2>
      <DataTable
        data={submissions}
        columns={[
          { header: 'Assignment', accessor: (s) => s.assignmentId },
          { header: 'Student', accessor: (s) => s.studentId },
          { header: 'Submitted', accessor: (s) => new Date(s.submittedAt).toLocaleString() },
          { header: 'Actions', accessor: (s) => <Link to={s.id}>Grade</Link> }
        ]}
      />
    </div>
  );
};