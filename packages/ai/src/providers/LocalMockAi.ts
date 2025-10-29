/**
 * LocalMockAi is a deterministic provider used for development and testing.  It returns canned
 * responses for known prompts and echoes unknown prompts.  This allows developers to exercise the
 * AI orchestrator without incurring API cost or network latency.
 */
export class LocalMockAi {
  async generate(prompt: string): Promise<string> {
    if (prompt.toLowerCase().includes('curriculum')) {
      return 'This is a mock curriculum outline based on the provided goals.';
    }
    if (prompt.toLowerCase().includes('assignment')) {
      return 'Mock assignment generated.';
    }
    if (prompt.toLowerCase().includes('rubric')) {
      return 'Mock rubric with three criteria: clarity, completeness and creativity.';
    }
    return `Echo: ${prompt.substring(0, 50)}`;
  }
}