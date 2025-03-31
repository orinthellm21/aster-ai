import { walletAssetsService, walletBalanceService } from '@/apis/wallet.apis';
import { useAuthContext } from '@/contexts/auth-provider/hook';
import { useQuery } from '@tanstack/react-query';
import {
  ForwardedRef,
  PropsWithChildren,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { DepositModalHandler } from '../deposit-modal/hook';
import { WithdrawModalHandler } from '../withdraw-modal/hook';

export type AccountModalHandler = {
  handleOpen: () => void;
  handleClose: () => void;
};

export type ReceivedProps = PropsWithChildren<{
  innerRef?: ForwardedRef<AccountModalHandler>;
}>;

const useSettingsModal = (props: ReceivedProps) => {
  const { innerRef: ref } = props;

  const { user } = useAuthContext();

  const [open, setOpen] = useState(false);

  const depositModalRef: ForwardedRef<DepositModalHandler> = useRef(null);
  const withdrawModalRef: ForwardedRef<WithdrawModalHandler> = useRef(null);

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

  const walletAssets = useQuery({
    queryKey: ['wallet-assets', user?.agent_address],
    queryFn: () => {
      if (!user?.agent_address) return null;

      return walletAssetsService({
        address: user?.agent_address,
      });
    },
    enabled: !!user?.agent_address,
    staleTime: 0,
  });

  const walletBalance = useQuery({
    queryKey: ['wallet-balance', user?.agent_address],
    queryFn: () => {
      if (!user?.agent_address) return null;

      return walletBalanceService({ address: user?.agent_address });
    },
    enabled: !!user?.agent_address,
    staleTime: 0,
  });

  return {
    open,
    openChangeHandler,
    depositModalRef,
    withdrawModalRef,
    walletAssets,
    walletBalance,
    ...props,
  };
};

export type Props = ReturnType<typeof useSettingsModal>;

export default useSettingsModal;
