export type MessageRole = 'assistant' | 'user' | 'system';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  metadata?: {
    type?: 'text' | 'upload' | 'quick-action';
    file?: {
      name: string;
      size: number;
    };
  };
}
