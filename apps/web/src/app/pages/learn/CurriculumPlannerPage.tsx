import React, { useState } from 'react';
import { AiOrchestrator } from '@teacher-ai/ai';
import { Button } from '@teacher-ai/ui';

export const CurriculumPlannerPage: React.FC = () => {
  const [outline, setOutline] = useState('');
  const orchestrator = new AiOrchestrator('local');
  const generate = async () => {
    const result = await orchestrator.generate('Generate a curriculum for Algebra I');
    setOutline(result);
  };
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Curriculum Planner</h2>
      <Button onClick={generate}>Generate Outline</Button>
      {outline && <pre className="mt-4 bg-gray-100 dark:bg-gray-800 p-4 rounded">{outline}</pre>}
    </div>
  );
};