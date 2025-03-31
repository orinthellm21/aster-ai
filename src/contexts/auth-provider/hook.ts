import { getUserService } from '@/apis/user.apis';
import { LocalStorageKey } from '@/constants/app.constants';
import { User } from '@/types/model.types';
import { useMutation } from '@tanstack/react-query';
import { Magic } from 'magic-sdk';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useLocalStorage } from 'usehooks-ts';

export type ReceivedProps = PropsWithChildren<object>;

type AuthProviderState = {
  user?: User;
  setUser?: React.Dispatch<React.SetStateAction<User | undefined>>;
  accessToken?: string | null;
  setAccessToken?: React.Dispatch<React.SetStateAction<string | null>>;
  reAuthLoading: boolean;
  magic?: Magic | null;
};

const initialState: AuthProviderState = {
  reAuthLoading: true,
};

export const AuthProviderContext =
  createContext<AuthProviderState>(initialState);

const useAuthProvider = (props: ReceivedProps) => {
  const [user, setUser] = useState<User>();
  const [magic, setMagic] = useState<Magic | null>(null);

  const [accessToken, setAccessToken] = useLocalStorage<string | null>(
    LocalStorageKey.ACCESS_TOKEN,
    localStorage.getItem(LocalStorageKey.ACCESS_TOKEN),
  );

  const handleReAuth = async () => {
    try {
      if (!accessToken) return;

      const user = await getUserService();

      setUser(user);
    } catch (error: any) {
      console.log(`🌈 ~ handleReAuth ~ error:`, error);

      localStorage.removeItem(LocalStorageKey.ACCESS_TOKEN);
    }
  };

  const reAuthMutation = useMutation({
    mutationFn: handleReAuth,
  });

  const {
    mutate: reAuthMutate,
    isIdle: reAuthIdle,
    isPending: reAuthPending,
  } = reAuthMutation;

  useEffect(() => {
    reAuthMutate();
  }, [reAuthMutate]);

  useEffect(() => {
    const magic = new Magic(import.meta.env.VITE_MAGIC_API_KEY, {
      extensions: [],
    });

    setMagic(magic);
  }, []);

  const value: AuthProviderState = {
    user,
    setUser,
    accessToken,
    setAccessToken,
    reAuthLoading: reAuthIdle || reAuthPending,
    magic,
  };

  return {
    value,
    ...props,
  };
};

export type Props = ReturnType<typeof useAuthProvider>;

export default useAuthProvider;

export const useAuthContext = () => {
  const context = useContext(AuthProviderContext);

  if (context === undefined)
    throw new Error('useAuthContext must be used within a AuthProvider');

  return context;
};
