import React, { type FC } from 'react';
import useCopyButton, { type Props, type ReceivedProps } from './hook';
import Button from '../ui/button';
import { Copy } from 'lucide-react';
import { cn } from '@/utils';

const CopyButtonLayout: FC<Props> = (props) => {
  const { handleClick, loading } = props;

  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-auto p-1"
      onClick={handleClick}
    >
      <Copy
        stroke={loading ? '#43C334' : '#A3A3A3'}
        className={cn({
          'rotate-z-180': loading,
        })}
      />
    </Button>
  );
};

const CopyButton: FC<ReceivedProps> = (props) => (
  <CopyButtonLayout {...useCopyButton(props)} />
);

export default CopyButton;
