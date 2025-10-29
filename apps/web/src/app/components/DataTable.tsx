import React from 'react';

export interface Column<T> {
  header: string;
  accessor: (row: T) => React.ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
}

export function DataTable<T>({ data, columns }: DataTableProps<T>): React.ReactElement {
  return (
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead className="bg-gray-50 dark:bg-gray-800">
        <tr>
          {columns.map((col) => (
            <th key={col.header} className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
        {data.map((row, idx) => (
          <tr key={idx}>
            {columns.map((col) => (
              <td key={col.header} className="px-4 py-2 text-sm">
                {col.accessor(row)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}