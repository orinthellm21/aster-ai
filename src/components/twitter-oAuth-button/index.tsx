import React, { type FC } from 'react';
import useTwitterOAuthButton, { type Props, type ReceivedProps } from './hook';
import Button from '../ui/button';

const TwitterOAuthButtonLayout: FC<Props> = (props) => {
  const { handleLogin, submitting } = props;

  return (
    <Button
      className="size-auto rounded-2xl bg-[#181818] p-3 hover:bg-[#5c5c5c]"
      size="icon"
      type="button"
      onClick={handleLogin}
      disabled={submitting}
    >
      <img src="/icons/x-logo.png" alt="x" className="size-6" />
    </Button>
  );
};

const TwitterOAuthButton: FC<ReceivedProps> = (props) => (
  <TwitterOAuthButtonLayout {...useTwitterOAuthButton(props)} />
);

export default TwitterOAuthButton;
