import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Assignment } from '@teacher-ai/core';
import { apiClient } from '../../services/apiClient';
import { DataTable, Button } from '@teacher-ai/ui';
import { Link } from 'react-router-dom';

export const AssignmentsPage: React.FC = () => {
  const { data: assignments = [] } = useQuery<Assignment[]>(['assignments'], () => apiClient.get('/assignments').then((res) => res.data));

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Assignments</h2>
      <Link to="new">
        <Button>Create Assignment</Button>
      </Link>
      <div className="mt-4">
        <DataTable
          data={assignments}
          columns={[
            { header: 'Title', accessor: (a) => a.title },
            { header: 'Due Date', accessor: (a) => new Date(a.dueDate).toLocaleDateString() },
            { header: 'Actions', accessor: (a) => <Link to={a.id}>View</Link> }
          ]}
        />
      </div>
    </div>
  );
};