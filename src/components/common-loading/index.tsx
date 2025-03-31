import React, { type FC } from 'react';
import useCommonLoading, { type Props, type ReceivedProps } from './hook';
import { Loader2 } from 'lucide-react';

const CommonLoadingLayout: FC<Props> = (props) => {
  const {} = props;
  return (
    <div className="absolute top-0 right-0 bottom-0 left-0 z-10 flex items-center justify-center">
      <Loader2 className="animate-spin" size={40} strokeWidth={1.5} />
    </div>
  );
};

const CommonLoading: FC<ReceivedProps> = (props) => (
  <CommonLoadingLayout {...useCommonLoading(props)} />
);

export default CommonLoading;
