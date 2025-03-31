import { ToolFunctionName } from '@/constants/conversation.constants';

export interface User {
  id: string;

  identifier: string;
  ref_code: string;
  verified: boolean;
  auth_type: string;
  metadata: Record<string, any>;
  agent_address: string;
  account_index: number;
  invited: number;
  active: boolean;

  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Message {
  id: string;

  conversation_id: string;
  role: 'user' | 'assistant';
  content: string;
  tool_call: ToolCall | null;

  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ToolCall {
  arguments: Record<string, any>;
  response?: Record<string, any>;

  /**
   * The name of the function to call.
   */
  name: `${ToolFunctionName}`;
}

export interface Conversation {
  id: string;

  user_id: string;
  title: string;

  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
