import { type FC } from 'react';
import useHomePage, { type Props, type ReceivedProps } from './hook';

const HomePageLayout: FC<Props> = (props) => {
  const {} = props;

  return <></>;
};

const HomePage: FC<ReceivedProps> = (props) => (
  <HomePageLayout {...useHomePage(props)} />
);

export default HomePage;
