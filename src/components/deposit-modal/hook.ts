import { useAuthContext } from '@/contexts/auth-provider/hook';
import { useWalletContext } from '@/contexts/wallet-provider/hook';
import { useToast } from '@/hooks/use-toast';
import {
  ForwardedRef,
  PropsWithChildren,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';

export type DepositModalHandler = {
  handleOpen: () => void;
  handleClose: () => void;
};

export type ReceivedProps = PropsWithChildren<{
  innerRef?: ForwardedRef<DepositModalHandler>;
  onCloseHandler?: () => void;
}>;

const useDepositModal = (props: ReceivedProps) => {
  const { innerRef: ref, onCloseHandler } = props;

  const { toast } = useToast();

  const { user } = useAuthContext();

  const [open, setOpen] = useState(false);

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

  const handleCopyAddress = async () => {
    if (!user?.agent_address) return;

    await navigator?.clipboard?.writeText(user.agent_address);

    toast({
      title: 'Copied!',
    });
  };

  return {
    open,
    openChangeHandler,
    handleCopyAddress,
    ...props,
  };
};

export type Props = ReturnType<typeof useDepositModal>;

export default useDepositModal;
