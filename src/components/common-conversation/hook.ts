import {
  createPaymentSwapService,
  createPaymentTransferService,
} from '@/apis/payment.apis';
import { useConversationContext } from '@/contexts/conversation-provider/hook';
import { useToast } from '@/hooks/use-toast';
import { ForwardedRef, useEffect, useRef, useState } from 'react';
import { NotificationModalHandler } from '../notification-modal/hook';
import { useSearchParams } from 'react-router-dom';

export type ReceivedProps = {};

const useCommonConversation = (props: ReceivedProps) => {
  const [swapping, setSwapping] = useState(false);

  const [text, setText] = useState('');

  const [swapTx, setSwapTx] = useState('');

  const { toast } = useToast();

  const [searchParams, setSearchParams] = useSearchParams();

  const notificationModalRef: ForwardedRef<NotificationModalHandler> =
    useRef(null);

  const {
    handleSendMessage,
    isSendMessagePending,
    endMessageRef,
    currentSocialMentionChart,
  } = useConversationContext();

  const handleSend = async (manualText?: string) => {
    if (!handleSendMessage) return;

    if (isSendMessagePending) return;

    setText('');

    handleSendMessage(manualText ?? text);
  };

  const handleSwap = async (data: {
    inputTokenCA: string;
    outputTokenCA: string;
    amount: string;
  }) => {
    try {
      if (!data.inputTokenCA || !data.outputTokenCA || !data.amount) throw '';

      setSwapTx('');

      setSwapping(true);

      const { txid } = await createPaymentSwapService(data);

      setSwapTx(txid);

      notificationModalRef.current?.handleOpen();
    } catch {
      toast({
        title: 'An error occurred in the payment.',
        description: 'Please try again later.',
      });
    } finally {
      setSwapping(false);
    }
  };

  const handleTransfer = async (data: {
    receiveAddress: string;
    amount: string;
  }) => {
    try {
      if (!data.receiveAddress || !data.amount) throw '';

      setSwapTx('');

      setSwapping(true);

      const { txid } = await createPaymentTransferService({
        receiveAddress: data.receiveAddress,
        amount: +data.amount,
      });

      setSwapTx(txid);

      notificationModalRef.current?.handleOpen();
    } catch {
      toast({
        title: 'An error occurred in the payment.',
        description: 'Please try again later.',
      });
    } finally {
      setSwapping(false);
    }
  };

  useEffect(() => {
    const message = searchParams.get('message');

    if (message) {
      const decodeMessage = decodeURIComponent(message);

      if (handleSendMessage) handleSendMessage(decodeMessage);

      setSearchParams((prevParams) => {
        prevParams.delete('message');

        return prevParams;
      });
    }
  }, [handleSendMessage, searchParams, setSearchParams]);

  return {
    text,
    setText,
    handleSend,
    endMessageRef,
    handleSwap,
    swapping,
    notificationModalRef,
    swapTx,
    currentSocialMentionChart,
    handleTransfer,
    ...props,
  };
};

export type Props = ReturnType<typeof useCommonConversation>;

export default useCommonConversation;
