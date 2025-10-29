/**
 * AnthropicProvider wraps the Anthropic SDK for text generation.  The API surface is kept minimal
 * and aligned with our provider interface.  This implementation is a placeholder and does not
 * include advanced options or retries.
 */
import { Client } from '@anthropic-ai/sdk';

export class AnthropicProvider {
  private client: Client;

  constructor(apiKey: string) {
    this.client = new Client({ apiKey });
  }

  async generate(prompt: string): Promise<string> {
    const response = await this.client.completions.create({
      prompt,
      model: 'claude-2',
      max_tokens_to_sample: 512
    });
    return response.completion ?? '';
  }
}