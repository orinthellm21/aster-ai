import { type FC } from 'react';
import useCommonProvider, {
  CommonProviderContext,
  type Props,
  type ReceivedProps,
} from './hook';

const CommonProviderLayout: FC<Props> = (props) => {
  const { children, value } = props;

  return (
    <CommonProviderContext.Provider {...props} value={value}>
      {children}
    </CommonProviderContext.Provider>
  );
};

const CommonProvider: FC<ReceivedProps> = (props) => (
  <CommonProviderLayout {...useCommonProvider(props)} />
);

export default CommonProvider;
