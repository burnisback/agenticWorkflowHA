import React from 'react';
import { Badge } from '@teacher-ai/core';

const demoBadges: Badge[] = [
  { id: 'b1', name: 'Great Listener', description: 'Participated in class discussions', imageUrl: '' },
  { id: 'b2', name: 'Assignment Pro', description: 'Completed all assignments on time', imageUrl: '' }
];

export const BadgesPage: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Badges</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {demoBadges.map((badge) => (
          <div key={badge.id} className="p-4 border rounded flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-200 rounded" />
            <div>
              <h3 className="font-semibold">{badge.name}</h3>
              <p className="text-sm text-gray-600">{badge.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};