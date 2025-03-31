import { socialOAuthService } from '@/apis/auth.apis';
import { SearchParamKey } from '@/constants/app.constants';
import { AuthType } from '@/constants/auth.constants';
import { useAuthContext } from '@/contexts/auth-provider/hook';
import { useToast } from '@/hooks/use-toast';
import { useCallback, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export type ReceivedProps = {};

export interface TwitterAuth {
  state: string | null;
  code: string | null;
  error: string | null;
}

const useAuthorizePage = (props: ReceivedProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const stateParam = searchParams.get('state');
  const codeParam = searchParams.get('code');
  const errorParam = searchParams.get('error');
  const authTypeParam = searchParams.get('type');

  const { toast } = useToast();

  const navigate = useNavigate();

  const { user, reAuthLoading, setUser, setAccessToken } = useAuthContext();

  const currentScreen = ['register', 'auth'].includes(
    searchParams.get(SearchParamKey.SCREEN_HINT) ?? '',
  )
    ? (searchParams.get(SearchParamKey.SCREEN_HINT) as string)
    : 'auth';

  const handleChangeScreen = (screen: string) => {
    setSearchParams((prevParams) => {
      prevParams.set(SearchParamKey.SCREEN_HINT, screen);

      return prevParams;
    });
  };

  const connectTwitter = useCallback(
    async (twitterAuth: TwitterAuth) => {
      try {
        if (!setUser || !setAccessToken) {
          throw 'Unavailable now.';
        }

        if (!twitterAuth.code || twitterAuth.error) throw 'Code invalid.';

        if (!twitterAuth.state) throw 'State invalid.';

        const twitterRedirect = `${window.location.origin}/authorize?type=twitter`;

        const { user, jwt } = await socialOAuthService({
          provider: AuthType.TWITTER,
          code: twitterAuth.code,
          state: twitterAuth.state,
          refCode: twitterAuth.state,
          redirect_uri: twitterRedirect,
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
        setSearchParams((prevParams) => {
          prevParams.delete('type');
          prevParams.delete('code');
          prevParams.delete('state');
          prevParams.delete('error');

          return prevParams;
        });
      }
    },
    [navigate, setAccessToken, setSearchParams, setUser, toast],
  );

  useEffect(() => {
    if (authTypeParam === 'twitter') {
      connectTwitter({ code: codeParam, state: stateParam, error: errorParam });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authTypeParam, codeParam, stateParam, errorParam]);

  useEffect(() => {
    if (!reAuthLoading && user) {
      navigate('/conversations');
    }
  }, [navigate, reAuthLoading, user]);

  return {
    currentScreen,
    handleChangeScreen,
    ...props,
  };
};

export type Props = ReturnType<typeof useAuthorizePage>;

export default useAuthorizePage;
