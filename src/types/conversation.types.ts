import { Message } from './model.types';

export interface CreateMessageResponse {
  conversation_id: string;
  assistant: Message;
  user: Message;
}
