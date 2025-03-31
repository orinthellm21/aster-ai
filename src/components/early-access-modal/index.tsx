import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { abbrNum } from '@/utils';
import { CircleCheck } from 'lucide-react';
import { forwardRef, type FC } from 'react';
import NotificationModal from '../notification-modal';
import { Badge } from '../ui/badge';
import Button from '../ui/button';
import { Separator } from '../ui/separator';
import useEarlyAccessModal, {
  EarlyAccessModalHandler,
  type Props,
  type ReceivedProps,
} from './hook';

const EarlyAccessModalLayout: FC<Props> = (props) => {
  const {
    open,
    openChangeHandler,
    activeAccount,
    notificationModalRef,
    signature,
    handleActiveAccount,
  } = props;

  return (
    <Dialog open={open} onOpenChange={openChangeHandler}>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        onOpenAutoFocus={(e) => {
          e.preventDefault();
        }}
        className="block w-fit min-w-96 !rounded-3xl bg-[#363636] p-0 py-6"
      >
        <DialogHeader className="space-y-0">
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-5">
          <div>
            <div className="flex items-center justify-center gap-2">
              <p className="font-bold">Early Access Program</p>
              <Badge className="bg-[#E3E3E4] font-light">BETA</Badge>
            </div>

            <p className="mt-3.5 px-6 text-center text-sm text-[#848484]">
              BETA access is currently limited to a small group of users to
              ensure stability as we continue improving features.
            </p>
          </div>

          <Separator className="bg-[#7B7B7B]" />

          <div className="px-6">
            <div className="flex items-center justify-between text-sm font-semibold">
              <p>Payment</p>
              <p>
                {abbrNum({
                  number: (activeAccount.data?.total_price || 0) / 1e9,
                  decPlaces: 1,
                  formatType: 'number',
                  minPlaces: 1e6,
                })}{' '}
                BNB
              </p>
            </div>

            <p className="mt-3 text-center text-xs text-[#848484]">
              Funds will cover LLM integration, RPC services, infrastructure,
              and operations to ensure platform stability and reliability.
            </p>
          </div>

          <Separator className="bg-[#7B7B7B]" />

          <div className="px-6 text-sm">
            <p>Exclusive Benefits</p>
            <div className="mt-3 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <CircleCheck size={12} color="#999999" />
                <p className="text-[#999999]">Priority support provided</p>
              </div>

              <div className="flex items-center gap-2">
                <CircleCheck size={12} color="#999999" />
                <p className="text-[#999999]">Get early feature access</p>
              </div>

              <div className="flex items-center gap-2">
                <CircleCheck size={12} color="#999999" />
                <p className="text-[#999999]">
                  Enjoy unlimited AI interactions
                </p>
              </div>

              <div className="flex items-center gap-2">
                <CircleCheck size={12} color="#999999" />
                <p className="text-[#999999]">Be eligible for airdrops</p>
              </div>

              <div className="flex items-center gap-2">
                <CircleCheck size={12} color="#999999" />
                <p className="text-[#999999]">Help expand the platform</p>
              </div>
            </div>
          </div>

          <Separator className="bg-[#7B7B7B]" />

          <div className="flex justify-center">
            <Button
              className="bg-[#E0E0E0] text-xs text-[#4D4D4D]"
              onClick={handleActiveAccount}
            >
              Join (
              {abbrNum({
                number: (activeAccount.data?.total_price || 0) / 1e9,
                decPlaces: 1,
                formatType: 'number',
                minPlaces: 1e6,
              })}{' '}
              BNB)
            </Button>
          </div>
        </div>
      </DialogContent>

      <NotificationModal ref={notificationModalRef}>
        <div className="mt-4">
          <a
            href={`https://bscscan.com/tx/${signature}`}
            target="_blank"
            className="text-sm break-all underline"
          >
            {signature}
          </a>
        </div>
      </NotificationModal>
    </Dialog>
  );
};

const EarlyAccessModal = forwardRef<EarlyAccessModalHandler, ReceivedProps>(
  (props, ref) => (
    <EarlyAccessModalLayout
      {...useEarlyAccessModal({ ...props, innerRef: ref })}
    />
  ),
);

EarlyAccessModal.displayName = 'EarlyAccessModal';

export default EarlyAccessModal;
