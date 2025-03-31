import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAuthContext } from '@/contexts/auth-provider/hook';
import { truncateAddress } from '@/utils';
import { formatNumber } from '@/utils/wallet.utils';
import { Loader2, LogOut } from 'lucide-react';
import { forwardRef, type FC } from 'react';
import CopyButton from '../copy-button';
import { Avatar, AvatarFallback } from '../ui/avatar';
import WalletAssets from '../wallet-assets';
import useAccountModal, {
  AccountModalHandler,
  type Props,
  type ReceivedProps,
} from './hook';
import DepositModal from '../deposit-modal';
import WithdrawModal from '../withdraw-modal';
import Button from '../ui/button';

const AccountModalLayout: FC<Props> = (props) => {
  const {
    open,
    openChangeHandler,
    walletAssets,
    walletBalance,
    depositModalRef,
    withdrawModalRef,
  } = props;

  const { user, setAccessToken, setUser } = useAuthContext();

  return (
    <Dialog open={open} onOpenChange={openChangeHandler}>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        onOpenAutoFocus={(e) => {
          e.preventDefault();
        }}
        closeable
        className="flex max-h-[80%] w-fit min-w-96 flex-col !rounded-3xl bg-[#363636] p-6"
      >
        <DialogHeader className="space-y-0">
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex flex-1 flex-col gap-5 overflow-hidden">
          <div className="flex gap-2.5">
            <Avatar className="h-8 w-8 items-center rounded-full">
              {/* <AvatarImage src={user?.id} alt={user?.id} /> */}
              <AvatarFallback className="rounded-lg">
                {user?.identifier?.at(0)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 gap-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold text-[#F4F4F5]">
                {user?.identifier ?? ''}
              </span>
              <div className="flex items-center gap-1">
                <span className="truncate text-xs font-light text-[#A3A3A3]">
                  {truncateAddress(user?.agent_address ?? '')}
                </span>
                <CopyButton text={user?.agent_address ?? ''} />
              </div>
            </div>
          </div>
          <div>
            <p className="text-4xl font-bold">
              {formatNumber(+(walletBalance?.data?.native ?? 0))} BNB
            </p>
          </div>

          <div className="flex items-stretch gap-5">
            <div
              className="flex-1 cursor-pointer rounded-xl bg-[#1B1B1B] p-3.5 pt-10 hover:bg-[#5e5e5e]"
              onClick={() => depositModalRef.current?.handleOpen()}
            >
              <p className="text-center text-sm font-medium">Deposit</p>
            </div>
            <div
              className="flex-1 cursor-pointer rounded-xl bg-[#1B1B1B] p-3.5 pt-10 hover:bg-[#5e5e5e]"
              onClick={() => withdrawModalRef.current?.handleOpen()}
            >
              <p className="text-center text-sm font-medium">Withdraw</p>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-2 overflow-hidden">
            <p>Tokens ({walletAssets?.data?.length ?? 0})</p>
            <div className="flex-1 overflow-y-auto">
              {walletAssets.isFetching || walletAssets.isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                <WalletAssets data={walletAssets?.data || []} />
              )}
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              variant="link"
              size="sm"
              className="px-0"
              onClick={() => {
                if (!setUser || !setAccessToken) return;

                setUser(undefined);
                setAccessToken(null);
              }}
            >
              <LogOut />
              Log out
            </Button>
          </div>
        </div>
      </DialogContent>
      <DepositModal ref={depositModalRef} />
      <WithdrawModal ref={withdrawModalRef} />
    </Dialog>
  );
};

const AccountModal = forwardRef<AccountModalHandler, ReceivedProps>(
  (props, ref) => (
    <AccountModalLayout {...useAccountModal({ ...props, innerRef: ref })} />
  ),
);

AccountModal.displayName = 'AccountModal';

export default AccountModal;
