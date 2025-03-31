import { FC } from 'react';
import useTyping, { Props, ReceivedProps } from './hook';

const TypingLoadingLayout: FC<Props> = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="loader">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

const TypingLoading: FC<ReceivedProps> = (props) => (
  <TypingLoadingLayout {...useTyping(props)} />
);

export default TypingLoading;
