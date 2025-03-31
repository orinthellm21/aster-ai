import { forwardRef, type FC } from 'react';

import useWithdrawModal, {
  WithdrawModalHandler,
  type Props,
  type ReceivedProps,
} from './hook';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { useAuthContext } from '@/contexts/auth-provider/hook';
import { useCommonContext } from '@/contexts/common-provider/hook';
import { cn } from '@/utils';
import { formatNumber } from '@/utils/wallet.utils';
import { isEmpty } from 'lodash';
import { Loader2 } from 'lucide-react';
import NotificationModal from '../notification-modal';
import Button from '../ui/button';
import { Input } from '../ui/input';

const WithdrawModalLayout: FC<Props> = (props) => {
  const {
    open,
    openChangeHandler,
    handleWithdraw,
    walletBalance,
    valueAmount,
    setValueAmount,
    isSubmitting,
    valueAddress,
    setValueAddress,
    notificationModalRef,
    withdrawTx,
  } = props;

  const { rootContainer } = useCommonContext();

  const { user } = useAuthContext();

  return (
    <Dialog open={open} onOpenChange={openChangeHandler}>
      <DialogContent
        onOpenAutoFocus={(e) => {
          e.preventDefault();
        }}
        className="flex max-h-[80%] w-fit min-w-96 flex-col !rounded-3xl bg-[#363636] p-6"
        closeable
      >
        <DialogHeader>
          <DialogTitle>Withdraw</DialogTitle>
          <DialogDescription></DialogDescription>
          <div>
            <div className="mt-6">
              <span className="text-sm">Address</span>
              <div className="relative">
                <Input
                  value={valueAddress}
                  id="input"
                  placeholder="Enter address"
                  className="mt-2 h-12 text-white outline-none focus-visible:ring-0"
                  onChange={(e) => setValueAddress(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm">Amount</span>
              <div className="relative">
                <Input
                  disabled={isSubmitting}
                  value={valueAmount}
                  id="input"
                  type="number"
                  inputMode="decimal"
                  placeholder="Enter amount"
                  className={cn(
                    'mt-2 h-12 pr-24 outline-none focus-visible:ring-0',
                  )}
                  min={0}
                  onChange={(e) => {
                    setValueAmount(e.target.value);
                  }}
                />

                <div className="absolute top-1/2 right-[6px] flex -translate-y-1/2 items-center gap-2">
                  <span className="text-sm">BNB</span>
                  <Button
                    variant="secondary"
                    className="h-auto rounded-lg px-3 py-1 text-sm"
                    onClick={() =>
                      setValueAmount(
                        walletBalance?.data?.native?.toString() || '0',
                      )
                    }
                  >
                    Max
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-1">
              <span className="text-xs text-[#8C8C8C]">Max transfer:</span>
              <p className="text-xs text-white">
                {formatNumber(+(walletBalance?.data?.native ?? 0))} BNB
              </p>
            </div>

            <div className="mt-8">
              <Button
                disabled={
                  isEmpty(valueAmount) ||
                  valueAmount == '0' ||
                  !Number(valueAmount) ||
                  !valueAddress
                }
                onClick={handleWithdraw}
                className="w-full"
              >
                {isSubmitting && <Loader2 className="animate-spin" />}
                Confirm
              </Button>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
      <NotificationModal ref={notificationModalRef}>
        <div className="mt-4">
          <a
            href={`https://bscscan.com/tx/${withdrawTx}`}
            target="_blank"
            className="text-sm break-all underline"
          >
            {withdrawTx}
          </a>
        </div>
      </NotificationModal>
    </Dialog>
  );
};

const WithdrawModal = forwardRef<WithdrawModalHandler, ReceivedProps>(
  (props, ref) => (
    <WithdrawModalLayout {...useWithdrawModal({ ...props, innerRef: ref })} />
  ),
);

WithdrawModal.displayName = 'WithdrawModal';

export default WithdrawModal;
