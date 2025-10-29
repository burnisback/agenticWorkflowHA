import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Course, Cohort } from '@teacher-ai/core';
import { apiClient } from '../../services/apiClient';
import { DataTable } from '@teacher-ai/ui';

/**
 * CohortsAdminPage displays the list of cohorts across all courses. It
 * aggregates cohorts from the courses response because our API does not
 * currently expose a standalone `/cohorts` endpoint. Editing and
 * creation of cohorts is deferred.
 */
export const CohortsAdminPage: React.FC = () => {
  const { data: courses = [] } = useQuery<Course[]>(['courses'], () => apiClient.get('/courses').then((res) => res.data));
  const cohorts: Cohort[] = courses.flatMap((course) => course.cohorts ?? []);
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Cohorts Admin</h2>
      <DataTable
        data={cohorts}
        columns={[
          { header: 'ID', accessor: (c) => c.id },
          { header: 'Name', accessor: (c) => c.name },
          { header: 'Students', accessor: (c) => c.students.length },
          { header: 'Teacher', accessor: (c) => c.teacher.name }
        ]}
      />
    </div>
  );
};