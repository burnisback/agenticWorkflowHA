/**
 * OpenAIProvider wraps the OpenAI SDK to provide text completion functionality.  It exposes a single
 * `generate` method that returns a promise of a string.  In production you would configure
 * temperature, model and error handling here.  For now this is a thin wrapper.
 */
import { Configuration, OpenAIApi } from 'openai';

export class OpenAIProvider {
  private client: OpenAIApi;

  constructor(apiKey: string) {
    const configuration = new Configuration({ apiKey });
    this.client = new OpenAIApi(configuration);
  }

  async generate(prompt: string): Promise<string> {
    const response = await this.client.createCompletion({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 512
    });
    return response.data.choices?.[0]?.text ?? '';
  }
}