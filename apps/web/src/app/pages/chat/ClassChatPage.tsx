import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../services/apiClient';
import { ChatMessage } from '@teacher-ai/core';
import { Button } from '@teacher-ai/ui';

export const ClassChatPage: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: messages = [] } = useQuery<ChatMessage[]>(['chat', 'class'], () =>
    apiClient.get('/chat/class').then((res) => res.data)
  );
  const [text, setText] = useState('');
  const mutation = useMutation(
    (content: string) => apiClient.post('/chat/class', { senderId: 'student1', content }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['chat', 'class']);
        setText('');
      }
    }
  );
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Class Chat</h2>
      <div className="border rounded p-4 h-64 overflow-y-auto mb-4 bg-gray-50 dark:bg-gray-800">
        {messages.map((m) => (
          <div key={m.id} className={`mb-2 ${m.isAi ? 'text-purple-600' : ''}`}>
            <strong>{m.isAi ? 'AI Tutor' : m.senderId}:</strong> {m.content}
          </div>
        ))}
      </div>
      <div className="flex space-x-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 border p-2 rounded"
          placeholder="Type your message"
        />
        <Button onClick={() => mutation.mutate(text)}>Send</Button>
      </div>
    </div>
  );
};