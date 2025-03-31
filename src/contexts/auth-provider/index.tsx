import { type FC } from 'react';
import useAuthProvider, {
  AuthProviderContext,
  type Props,
  type ReceivedProps,
} from './hook';

const AuthProviderLayout: FC<Props> = (props) => {
  const { children, value } = props;

  return (
    <AuthProviderContext.Provider {...props} value={value}>
      {children}
    </AuthProviderContext.Provider>
  );
};

const AuthProvider: FC<ReceivedProps> = (props) => (
  <AuthProviderLayout {...useAuthProvider(props)} />
);

export default AuthProvider;
