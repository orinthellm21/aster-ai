import { socialOAuthService } from '@/apis/auth.apis';
import { AuthType } from '@/constants/auth.constants';
import { useAuthContext } from '@/contexts/auth-provider/hook';
import { useToast } from '@/hooks/use-toast';
import { useGoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export type ReceivedProps = {
  refCode?: string;
};

const useGoogleOAuthButton = (props: ReceivedProps) => {
  const { refCode } = props;

  const { setUser, setAccessToken } = useAuthContext();

  const { toast } = useToast();

  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);

  const handleLogin = useGoogleLogin({
    flow: 'auth-code',
    redirect_uri: window.location.origin,
    onSuccess: async ({ code }) => {
      try {
        if (!setUser || !setAccessToken) return;

        setSubmitting(true);

        const { user, jwt } = await socialOAuthService({
          provider: AuthType.GOOGLE,
          code,
          refCode,
          redirect_uri: window.location.origin,
        });

        setUser(user);
        setAccessToken(jwt);

        navigate('/conversations');
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
    },
  });

  return { submitting, setSubmitting, handleLogin, ...props };
};

export type Props = ReturnType<typeof useGoogleOAuthButton>;

export default useGoogleOAuthButton;
