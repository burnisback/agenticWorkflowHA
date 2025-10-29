export interface ChatMessage {
  id: string;
  channelId: string;
  senderId: string;
  content: string;
  sentAt: string;
  isAi?: boolean;
}