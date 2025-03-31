import { CommonResponse } from '@/types/api.types';
import httpClient from '.';
import { Conversation, Message } from '@/types/model.types';
import { CreateMessageResponse } from '@/types/conversation.types';

export const createMessageService = async (body: {
  content: string;
  conversation_id?: string;
}) => {
  const {
    data: { data },
  } = await httpClient.post<CommonResponse<CreateMessageResponse>>(
    'agent/chat',
    body,
  );

  return data;
};

export const getConversationsService = async () => {
  const {
    data: { data },
  } = await httpClient.get<CommonResponse<Conversation[]>>(
    'agent/conversations',
  );

  return data;
};

export const getConversationHistoryService = async (conversationId: string) => {
  const {
    data: { data },
  } = await httpClient.get<CommonResponse<Message[]>>(
    'agent/history/' + conversationId,
  );

  return data;
};

export const socialMentionChartService = async (symbol: string) => {
  const {
    data: { data },
  } = await httpClient.get<CommonResponse<Record<string, any>[]>>(
    'coin/chart/' + symbol,
  );

  return data;
};

export const deleteConversion = async (body: { conversationId: string }) => {
  await httpClient.delete(`agent/conversation/${body.conversationId}`);
};

export const updateConversion = async (body: {
  conversationId: string;
  newTitle: string;
}) => {
  const {
    data: { data },
  } = await httpClient.patch<CommonResponse<CreateMessageResponse>>(
    `agent/conversation`,
    body,
  );

  return data;
};
