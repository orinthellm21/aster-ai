import { AuthType } from '@/constants/auth.constants';
import { useAuthContext } from '@/contexts/auth-provider/hook';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from 'twitter-api-sdk';

export type ReceivedProps = {
  refCode?: string;
};

const useTwitterOAuthButton = (props: ReceivedProps) => {
  const { refCode } = props;

  const { toast } = useToast();

  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async () => {
    try {
      setSubmitting(true);

      const twitterRedirect = `${window.location.origin}/authorize?type=twitter`;

      const twitterState = refCode ?? 'ASTER_AI';

      const authClient = new auth.OAuth2User({
        client_id: import.meta.env.VITE_TWITTER_CLIENT_ID || '',
        callback: twitterRedirect,
        scopes: ['users.read', 'tweet.read'],
      });

      const authUrl = authClient.generateAuthURL({
        code_challenge_method: 'plain',
        state: twitterState ?? '',
        code_challenge: twitterState ?? '',
      });

      window.open(authUrl, '_self');
    } catch (error: any) {
      const message =
        typeof error?.response?.data?.message === 'string'
          ? `${error?.response?.data?.message}`
          : typeof error === 'string'
            ? `${error}`
            : 'Please try again later.';

      toast({ title: 'Login failed!', description: message });
    } finally {
      setSubmitting(false);
    }
  };

  return { submitting, setSubmitting, handleLogin, ...props };
};

export type Props = ReturnType<typeof useTwitterOAuthButton>;

export default useTwitterOAuthButton;
