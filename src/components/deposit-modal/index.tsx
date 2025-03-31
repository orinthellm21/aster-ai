import { forwardRef, type FC } from 'react';

import useDepositModal, {
  DepositModalHandler,
  type Props,
  type ReceivedProps,
} from './hook';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogPortal,
  DialogTitle,
} from '@/components/ui/dialog';

import { useAuthContext } from '@/contexts/auth-provider/hook';
import { useCommonContext } from '@/contexts/common-provider/hook';
import { CopyIcon } from '@radix-ui/react-icons';
import QRCode from 'react-qr-code';
import Button from '../ui/button';

const DepositModalLayout: FC<Props> = (props) => {
  const { open, openChangeHandler, handleCopyAddress } = props;

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
          <DialogTitle>Deposit</DialogTitle>
          <DialogDescription></DialogDescription>
          <div>
            <div className="mx-auto mt-6 max-w-[60%] rounded-lg bg-white p-4">
              <QRCode
                size={256}
                style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                value={user?.agent_address ?? ''}
                viewBox={`0 0 256 256`}
              />
            </div>
            <p className="grotesk-semibold mt-6 text-center text-xl">
              Address (Binance Smart Chain)
            </p>
            <p className="mt-1 text-center text-xs break-all text-[#8C8C8C]">
              {user?.agent_address}
            </p>
            <div className="px-4">
              <Button
                className="mt-10 w-full"
                onClick={handleCopyAddress}
                disabled={!user?.agent_address}
              >
                <CopyIcon />
                Copy to clipboard
              </Button>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

const DepositModal = forwardRef<DepositModalHandler, ReceivedProps>(
  (props, ref) => (
    <DepositModalLayout {...useDepositModal({ ...props, innerRef: ref })} />
  ),
);

DepositModal.displayName = 'DepositModal';

export default DepositModal;
