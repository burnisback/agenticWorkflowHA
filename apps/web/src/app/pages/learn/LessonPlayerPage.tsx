import React from 'react';
import { useParams } from 'react-router-dom';

export const LessonPlayerPage: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Lesson {lessonId}</h2>
      <p>This is where lesson content will be displayed.</p>
    </div>
  );
};