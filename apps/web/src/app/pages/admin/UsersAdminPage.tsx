import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { User } from '@teacher-ai/core';
import { apiClient } from '../../services/apiClient';
import { DataTable } from '@teacher-ai/ui';

/**
 * UsersAdminPage lists all users (teachers, students, admins). CRUD
 * functionality can be added later. The data comes from the MSW
 * fixtures via the `/api/users` endpoint.
 */
export const UsersAdminPage: React.FC = () => {
  const { data: users = [] } = useQuery<User[]>(['users'], () => apiClient.get('/users').then((res) => res.data));
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Users Admin</h2>
      <DataTable
        data={users}
        columns={[
          { header: 'ID', accessor: (u) => u.id },
          { header: 'Name', accessor: (u) => u.name },
          { header: 'Email', accessor: (u) => u.email },
          { header: 'Role', accessor: (u) => u.role }
        ]}
      />
    </div>
  );
};