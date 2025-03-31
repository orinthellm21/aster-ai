import { type FC } from 'react';
import useConversationProvider, {
  ConversationProviderContext,
  type Props,
  type ReceivedProps,
} from './hook';
import { Outlet } from 'react-router-dom';
import CommonConversation from '@/components/common-conversation';

const ConversationProviderLayout: FC<Props> = (props) => {
  const { value } = props;

  return (
    <ConversationProviderContext.Provider {...props} value={value}>
      <CommonConversation />
      <Outlet />
    </ConversationProviderContext.Provider>
  );
};

const ConversationProvider: FC<ReceivedProps> = (props) => (
  <ConversationProviderLayout {...useConversationProvider(props)} />
);

export default ConversationProvider;
