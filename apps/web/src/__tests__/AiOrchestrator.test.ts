import { describe, it, expect } from 'vitest';
import { AiOrchestrator } from '@teacher-ai/ai';

describe('AiOrchestrator', () => {
  it('uses the local provider when provider argument is local', async () => {
    const orchestrator = new AiOrchestrator('local');
    const result = await orchestrator.generate('Test prompt');
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('falls back to local provider when unknown provider specified', async () => {
    const orchestrator = new AiOrchestrator('unknown' as any);
    const result = await orchestrator.generate('Another test');
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });
});