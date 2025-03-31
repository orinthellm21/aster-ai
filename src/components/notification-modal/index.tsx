import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { forwardRef, type FC } from 'react';
import useNotificationModal, {
  NotificationModalHandler,
  type Props,
  type ReceivedProps,
} from './hook';

const NotificationModalLayout: FC<Props> = (props) => {
  const { open, openChangeHandler, children } = props;

  return (
    <Dialog open={open} onOpenChange={openChangeHandler}>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        onOpenAutoFocus={(e) => {
          e.preventDefault();
        }}
        className="block"
        closeable
      >
        <DialogHeader>
          <DialogTitle>Notification</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

const NotificationModal = forwardRef<NotificationModalHandler, ReceivedProps>(
  (props, ref) => (
    <NotificationModalLayout
      {...useNotificationModal({ ...props, innerRef: ref })}
    />
  ),
);

NotificationModal.displayName = 'NotificationModal';

export default NotificationModal;
