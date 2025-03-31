import { createPaymentTransferService } from '@/apis/payment.apis';
import { walletBalanceService } from '@/apis/wallet.apis';
import { useAuthContext } from '@/contexts/auth-provider/hook';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';
import {
  ForwardedRef,
  PropsWithChildren,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { NotificationModalHandler } from '../notification-modal/hook';

export type WithdrawModalHandler = {
  handleOpen: () => void;
  handleClose: () => void;
};

export type ReceivedProps = PropsWithChildren<{
  innerRef?: ForwardedRef<WithdrawModalHandler>;
  onCloseHandler?: () => void;
}>;

const useWithdrawModal = (props: ReceivedProps) => {
  const { innerRef: ref, onCloseHandler } = props;

  const { toast } = useToast();

  const { user } = useAuthContext();

  const [open, setOpen] = useState(false);

  const [valueAddress, setValueAddress] = useState<string>('');

  const [valueAmount, setValueAmount] = useState<string>('');

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [withdrawTx, setWithdrawTx] = useState('');

  const notificationModalRef: ForwardedRef<NotificationModalHandler> =
    useRef(null);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    if (onCloseHandler) onCloseHandler();

    setOpen(false);
  }, [onCloseHandler]);

  const openChangeHandler = (open: boolean) => {
    if (!open) {
      if (onCloseHandler) onCloseHandler();
    }
    setOpen(open);
  };

  useImperativeHandle(
    ref,
    () => ({
      handleOpen,
      handleClose,
    }),
    [handleClose, handleOpen],
  );

  const walletBalance = useQuery({
    queryKey: ['wallet-balance', user?.agent_address],
    queryFn: () => {
      if (!user?.agent_address) return null;

      return walletBalanceService({ address: user?.agent_address });
    },
    enabled: !!user?.agent_address,
    staleTime: 0,
  });

  const handleWithdraw = async () => {
    if (!user) {
      toast({
        title: 'Withdraw failed!',
        description: 'Unavailable now.',
      });

      return;
    }

    if (!valueAddress) {
      toast({
        title: 'Withdraw failed!',
        description: 'Invalid address.',
      });

      return;
    }

    if (!valueAmount) {
      toast({
        title: 'Withdraw failed!',
        description: 'Invalid amount.',
      });

      return;
    }

    try {
      setIsSubmitting(true);

      setWithdrawTx('');

      const { txid } = await createPaymentTransferService({
        receiveAddress: valueAddress,
        amount: +valueAmount,
      });

      setWithdrawTx(txid);

      notificationModalRef.current?.handleOpen();
    } catch {
      toast({
        title: 'An error occurred in the payment.',
        description: 'Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return {
    open,
    openChangeHandler,
    handleWithdraw,
    walletBalance,
    valueAmount,
    setValueAmount,
    isSubmitting,
    setIsSubmitting,
    valueAddress,
    setValueAddress,
    withdrawTx,
    notificationModalRef,
    ...props,
  };
};

export type Props = ReturnType<typeof useWithdrawModal>;

export default useWithdrawModal;
