import { createPaymentActiveAccountService } from '@/apis/payment.apis';
import { useAppContext } from '@/contexts/app-provider/hook';
import { useAuthContext } from '@/contexts/auth-provider/hook';
import { useWalletContext } from '@/contexts/wallet-provider/hook';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';
import {
  ForwardedRef,
  PropsWithChildren,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { NotificationModalHandler } from '../notification-modal/hook';
import { useAccount, useSendTransaction } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { parseEther } from 'viem';

export type EarlyAccessModalHandler = {
  handleOpen: () => void;
  handleClose: () => void;
};

export type ReceivedProps = PropsWithChildren<{
  innerRef?: ForwardedRef<EarlyAccessModalHandler>;
}>;

const useSettingsModal = (props: ReceivedProps) => {
  const { innerRef: ref } = props;

  const { user } = useAuthContext();

  const { settings } = useAppContext();

  const { isConnected } = useAccount();

  // const { handleConnectWallet } = useWalletContext();

  const { toast } = useToast();

  const { sendTransactionAsync } = useSendTransaction();

  const { openConnectModal } = useConnectModal();

  const [open, setOpen] = useState(false);

  const [signature, setSignature] = useState<string>();

  const notificationModalRef: ForwardedRef<NotificationModalHandler> =
    useRef(null);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const openChangeHandler = (open: boolean) => {
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

  const activeAccount = useQuery({
    queryKey: ['payment-active-account'],
    queryFn: createPaymentActiveAccountService,
    enabled: !user?.active,
  });

  const handleActiveAccount = async () => {
    try {
      if (!isConnected) {
        if (openConnectModal) openConnectModal();

        return;
      }

      if (!activeAccount.data) throw 'Unavailable now.';

      if (!settings?.data?.sol_receive_address) throw 'Unavailable now.';

      if (!activeAccount?.data?.total_price) throw 'Unavailable now.';

      const tx = await sendTransactionAsync({
        to: settings.data.sol_receive_address as `0x${string}`,
        value: parseEther(activeAccount.data.total_price.toString()),
      });

      setSignature(tx);

      notificationModalRef.current?.handleOpen();
    } catch (error: any) {
      const message =
        typeof error?.response?.data?.message === 'string'
          ? `${error?.response?.data?.message}`
          : typeof error === 'string'
            ? `${error}`
            : 'Please try again later.';

      toast({
        title: 'Active failed!',
        description: message,
      });
    }
  };

  useEffect(() => {
    if (user && !user.active) {
      setOpen(true);
    }
  }, [user]);

  return {
    open,
    openChangeHandler,
    activeAccount,
    handleActiveAccount,
    signature,
    notificationModalRef,
    ...props,
  };
};

export type Props = ReturnType<typeof useSettingsModal>;

export default useSettingsModal;
