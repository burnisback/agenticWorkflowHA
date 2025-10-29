import React from 'react';

export const EmptyState: React.FC<{ message?: string }> = ({ message = 'No data available.' }) => (
  <div className="text-center p-8 text-gray-500">{message}</div>
);