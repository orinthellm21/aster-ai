import React, { type FC } from 'react';
import useGoogleOAuthButton, { type Props, type ReceivedProps } from './hook';
import Button from '../ui/button';

const GoogleOAuthButtonLayout: FC<Props> = (props) => {
  const { submitting, handleLogin } = props;

  return (
    <Button
      className="size-auto rounded-2xl bg-[#181818] p-3 hover:bg-[#5c5c5c]"
      size="icon"
      onClick={handleLogin}
      disabled={submitting}
      type="button"
    >
      <img src="/icons/google-logo.png" alt="google" className="size-6" />
    </Button>
  );
};

const GoogleOAuthButton: FC<ReceivedProps> = (props) => (
  <GoogleOAuthButtonLayout {...useGoogleOAuthButton(props)} />
);

export default GoogleOAuthButton;
