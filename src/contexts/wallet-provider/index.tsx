import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { type FC } from 'react';
import { WagmiProvider } from 'wagmi';
import { bsc } from 'wagmi/chains';
import useWalletProvider, {
  WalletProviderContext,
  type Props,
  type ReceivedProps,
} from './hook';



const WalletProviderLayout: FC<Props> = (props) => {
  const { children, value } = props;

  return (
    <WalletProviderContext.Provider {...props} value={value}>
      <RainbowKitProvider>{children}</RainbowKitProvider>
    </WalletProviderContext.Provider>
  );
};

const WalletProvider: FC<ReceivedProps> = (props) => (
  <WalletProviderLayout {...useWalletProvider(props)} />
);

export default WalletProvider;
