import { useConversationContext } from '@/contexts/conversation-provider/hook';
import useProtectRouter from '@/hooks/use-protect-router';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export type ReceivedProps = Record<string, any>;

const useConversationPage = (props: ReceivedProps) => {
  const params = useParams();

  const { setCurrentConversationId } = useConversationContext();

  useEffect(() => {
    if (params.id && setCurrentConversationId) {
      setCurrentConversationId(params.id);
    }
  }, [params.id, setCurrentConversationId]);

  return {
    ...props,
  };
};

export type Props = ReturnType<typeof useConversationPage>;

export default useConversationPage;
