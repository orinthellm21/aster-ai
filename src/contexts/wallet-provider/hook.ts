import { createContext, PropsWithChildren, useContext } from 'react';

export type ReceivedProps = PropsWithChildren;

type WalletProviderState = {};

const initialState: WalletProviderState = {};

export const WalletProviderContext =
  createContext<WalletProviderState>(initialState);

const useWalletProvider = (props: ReceivedProps) => {
  const value = {};

  return {
    value,
    ...props,
  };
};

export type Props = ReturnType<typeof useWalletProvider>;

export default useWalletProvider;

export const useWalletContext = () => {
  const context = useContext(WalletProviderContext);

  if (context === undefined)
    throw new Error('useWalletContext must be used within a WalletProvider');

  return context;
};
