import {
  createMessageService,
  getConversationHistoryService,
  getConversationsService,
  socialMentionChartService,
} from '@/apis/conversation.apis';
import {
  UseMutateFunction,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query';
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useAuthContext } from '../auth-provider/hook';
import { Conversation, Message } from '@/types/model.types';
import { useToast } from '@/hooks/use-toast';
import { generateRandomText } from '@/utils';
import { useNavigate } from 'react-router-dom';
import { ToolFunctionName } from '@/constants/conversation.constants';

export type ReceivedProps = PropsWithChildren;

type ConversationProviderState = {
  currentConversationId?: string | undefined;
  setCurrentConversationId?: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  currentMessages: Message[];
  setCurrentMessages?: Dispatch<SetStateAction<Message[]>>;
  handleSendMessage?: UseMutateFunction<void, Error, string, unknown>;
  isSendMessagePending: boolean;
  currentConversationHistory?: UseQueryResult<Message[], Error>;
  endMessageRef?: React.RefObject<HTMLDivElement>;
  currentSocialMentionChart?: any;
  conversionId?: string;
  setConversionId?: Dispatch<SetStateAction<string>>;
};

const initialState: ConversationProviderState = {
  currentMessages: [],
  isSendMessagePending: false,
};

export const ConversationProviderContext =
  createContext<ConversationProviderState>(initialState);

const useConversationProvider = (props: ReceivedProps) => {
  const queryClient = useQueryClient();

  const { user } = useAuthContext();

  const { toast } = useToast();

  const navigate = useNavigate();

  const [currentConversationId, setCurrentConversationId] = useState<string>();

  const [currentMessages, setCurrentMessages] = useState<Message[]>([]);

  const [symbol, setSymbol] = useState<string | null>(null);

  const [conversionId, setConversionId] = useState<string>('');

  const [typing, setTyping] = useState(false);

  const endMessageRef = useRef<HTMLDivElement>(null);

  const currentSocialMentionChart = useQuery({
    queryKey: ['social-mention-chart', symbol],
    queryFn: () => {
      if (!symbol) return [];

      return socialMentionChartService(symbol);
    },
    enabled: !!symbol,
  });

  const currentConversationHistory = useQuery({
    queryKey: ['conversation-history', currentConversationId],
    queryFn: async () => {
      if (!currentConversationId || !user) {
        setCurrentMessages([]);

        return [];
      }

      const messages = await getConversationHistoryService(
        currentConversationId,
      );

      setCurrentMessages(messages);

      return messages;
    },
    staleTime: 0,
    enabled: !!user && currentConversationId !== undefined,
  });

  const { mutate: handleSendMessage } = useMutation({
    mutationFn: async (text: string) => {
      try {
        setTyping(true);

        setCurrentMessages((curr) => [
          ...curr,
          {
            id: generateRandomText(12),
            content: text,
            conversation_id: currentConversationId ?? generateRandomText(12),
            role: 'user',
            tool_call: null,
            createdAt: new Date().toString(),
            updatedAt: new Date().toString(),
            deletedAt: null,
          },
        ]);

        const createdMessage = await createMessageService({
          content: text,
          conversation_id: currentConversationId,
        });

        if (!currentConversationId) {
          setCurrentConversationId(createdMessage.conversation_id);
          navigate(`/conversations/c/${createdMessage.conversation_id}`);
        }

        endMessageRef.current?.scrollTo({ behavior: 'smooth' });

        if (
          createdMessage?.assistant?.tool_call?.response?.token_detail
            ?.symbol &&
          createdMessage?.assistant?.tool_call?.name ===
            ToolFunctionName.GET_MENTIONS_ON_X
        ) {
          setSymbol(
            createdMessage?.assistant?.tool_call?.response?.token_detail
              ?.symbol,
          );
        }

        if (!currentConversationId) {
          setCurrentConversationId(createdMessage.conversation_id);
          navigate(`/conversations/c/${createdMessage.conversation_id}`);
        }

        setCurrentMessages((curr) => [
          ...curr.slice(0, -1),
          createdMessage.user,
          createdMessage.assistant,
        ]);
        console.log(`🌈 ~ hook.ts:162 ~ mutationFn: ~ setCurrentMessages:`);
      } catch (error: any) {
        const message =
          typeof error?.response?.data?.message === 'string'
            ? `${error?.response?.data?.message}`
            : typeof error === 'string'
              ? `${error}`
              : 'Please try again later.';

        toast({ title: 'Send message failed!', description: message });
      } finally {
        setTyping(false);
      }
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['conversations'],
      });
    },
  });

  useEffect(() => {
    if (currentMessages.length && currentConversationId !== undefined)
      endMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentMessages.length, currentConversationId]);

  const value = {
    currentConversationId,
    setCurrentConversationId,
    currentMessages,
    handleSendMessage,
    isSendMessagePending: typing,
    currentConversationHistory,
    endMessageRef,
    currentSocialMentionChart,
    conversionId,
    setConversionId,
    setCurrentMessages,
  };

  return {
    value,
    ...props,
  };
};

export type Props = ReturnType<typeof useConversationProvider>;

export default useConversationProvider;

export const useConversationContext = () => {
  const context = useContext(ConversationProviderContext);

  if (context === undefined)
    throw new Error(
      'useConversationContext must be used within a ConversationProvider.',
    );

  return context;
};
