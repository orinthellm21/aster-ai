import { type FC } from 'react';
import useAppProvider, {
  AppProviderContext,
  type Props,
  type ReceivedProps,
} from './hook';
import { Outlet } from 'react-router-dom';

const AppProviderLayout: FC<Props> = (props) => {
  const { value } = props;

  return (
    <AppProviderContext.Provider {...props} value={value}>
      <Outlet />
    </AppProviderContext.Provider>
  );
};

const AppProvider: FC<ReceivedProps> = (props) => (
  <AppProviderLayout {...useAppProvider(props)} />
);

export default AppProvider;
