import { WalletAssetsResponse } from '@/types/wallet.types';

export type ReceivedProps = {
  data: WalletAssetsResponse;
};

const useWalletAssets = (props: ReceivedProps) => {
  return {
    ...props,
  };
};

export type Props = ReturnType<typeof useWalletAssets>;

export default useWalletAssets;
