import React from 'react';
import { demoChatMessages } from '@teacher-ai/mocks';

export const FeedPage: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Feed</h2>
      {demoChatMessages.slice(0, 10).map((m) => (
        <div key={m.id} className="mb-2 p-2 border rounded">
          <strong>{m.senderId}:</strong> {m.content}
        </div>
      ))}
    </div>
  );
};