import { createContext, PropsWithChildren, useContext } from 'react';

export type ReceivedProps = PropsWithChildren;

type EvmProviderState = {};

const initialState: EvmProviderState = {};

export const EvmProviderContext = createContext<EvmProviderState>(initialState);

const useEvmProvider = (props: ReceivedProps) => {
  const value = {};

  return {
    value,
    ...props,
  };
};

export type Props = ReturnType<typeof useEvmProvider>;

export default useEvmProvider;

export const useWalletContext = () => {
  const context = useContext(EvmProviderContext);

  if (context === undefined)
    throw new Error('useWalletContext must be used within a EvmProvider');

  return context;
};
