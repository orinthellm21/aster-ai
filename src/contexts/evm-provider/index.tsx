import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { type FC } from 'react';
import useEvmProvider, {
  EvmProviderContext,
  type Props,
  type ReceivedProps,
} from './hook';
import { bsc } from 'viem/chains';
import { WagmiProvider } from 'wagmi';

const config = getDefaultConfig({
  appName: 'BSC AI',
  projectId: import.meta.env.VITE_WAGMI_PROJECT_ID,
  chains: [bsc],
});

const EvmProviderLayout: FC<Props> = (props) => {
  const { children, value } = props;

  return (
    <EvmProviderContext.Provider {...props} value={value}>
      <WagmiProvider config={config}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </WagmiProvider>
    </EvmProviderContext.Provider>
  );
};

const EvmProvider: FC<ReceivedProps> = (props) => (
  <EvmProviderLayout {...useEvmProvider(props)} />
);

export default EvmProvider;
