import { type FC } from 'react';
import useConversationPage, { type Props, type ReceivedProps } from './hook';

const ConversationPageLayout: FC<Props> = (props) => {
  const {} = props;

  return <></>;
};

const ConversationPage: FC<ReceivedProps> = (props) => (
  <ConversationPageLayout {...useConversationPage(props)} />
);

export default ConversationPage;
