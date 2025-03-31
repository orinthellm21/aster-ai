import { useConversationContext } from '@/contexts/conversation-provider/hook';
import { useEffect } from 'react';

export type ReceivedProps = Record<string, any>;

const useHomePage = (props: ReceivedProps) => {
  const { setCurrentConversationId } = useConversationContext();

  useEffect(() => {
    if (setCurrentConversationId) {
      setCurrentConversationId('');
    }
  }, [setCurrentConversationId]);

  return {
    ...props,
  };
};

export type Props = ReturnType<typeof useHomePage>;

export default useHomePage;
