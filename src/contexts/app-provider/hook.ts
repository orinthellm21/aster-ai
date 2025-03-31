import { settingsService } from '@/apis/app.apis';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { createContext, PropsWithChildren, useContext } from 'react';
import { useAuthContext } from '../auth-provider/hook';
import { getConversationsService } from '@/apis/conversation.apis';
import { Conversation } from '@/types/model.types';

export type ReceivedProps = PropsWithChildren;

type AppProviderState = {
  settings?: UseQueryResult<Awaited<ReturnType<typeof settingsService>>, Error>;
  conversations?: UseQueryResult<Conversation[], Error>;
};

const initialState: AppProviderState = {};

export const AppProviderContext = createContext<AppProviderState>(initialState);

const useAppProvider = (props: ReceivedProps) => {
  const { user } = useAuthContext();

  const settings = useQuery({
    queryKey: ['settings'],
    queryFn: settingsService,
  });

  const conversations = useQuery({
    queryKey: ['conversations', user],
    queryFn: getConversationsService,
    enabled: !!user,
  });

  const value = { settings, conversations };

  return {
    value,
    ...props,
  };
};

export type Props = ReturnType<typeof useAppProvider>;

export default useAppProvider;

export const useAppContext = () => {
  const context = useContext(AppProviderContext);

  if (context === undefined)
    throw new Error('useAppContext must be used within a AppProvider.');

  return context;
};
