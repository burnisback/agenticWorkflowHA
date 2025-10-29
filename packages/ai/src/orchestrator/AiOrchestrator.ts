import { OpenAIProvider } from '../providers/OpenAIProvider';
import { AnthropicProvider } from '../providers/AnthropicProvider';
import { LocalMockAi } from '../providers/LocalMockAi';

/**
 * AiOrchestrator selects an AI provider based on the `provider` argument.  Consumers should
 * instantiate the orchestrator once and call `generate` with a prompt.  If an unknown provider
 * name is supplied it falls back to the local mock.
 */
export class AiOrchestrator {
  private provider: { generate(prompt: string): Promise<string> };

  constructor(provider: 'openai' | 'anthropic' | 'local', openAIApiKey?: string, anthropicApiKey?: string) {
    switch (provider) {
      case 'openai':
        this.provider = new OpenAIProvider(openAIApiKey ?? '');
        break;
      case 'anthropic':
        this.provider = new AnthropicProvider(anthropicApiKey ?? '');
        break;
      default:
        this.provider = new LocalMockAi();
    }
  }

  async generate(prompt: string): Promise<string> {
    return this.provider.generate(prompt);
  }
}