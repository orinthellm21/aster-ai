import { useAppContext } from '@/contexts/app-provider/hook';
import { abbrNum } from '@/utils';
import { Wallet } from 'lucide-react';
import { FC } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import useWalletAssets, { Props, ReceivedProps } from './hook';

const WalletAssetsLayout: FC<Props> = (props) => {
  const { data } = props;
  const { settings } = useAppContext();

  return (
    <div>
      {data?.length ? (
        <div className="flex flex-col gap-5">
          {(data ?? []).map((asset) => {
            return (
              <div
                className="flex items-center justify-between"
                key={asset?.token?.address}
              >
                <div className="flex items-center gap-2">
                  <Avatar className="size-10">
                    <AvatarImage src={asset?.token?.logo} alt="token" />
                    <AvatarFallback>{asset?.token?.symbol}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-1">
                      <h3 className="grotesk-medium text-sm text-white">
                        {asset?.token?.name}
                      </h3>
                    </div>
                    <span className="text-xs text-[#999999]">
                      {abbrNum({
                        number: +asset?.balance,
                        decPlaces: 2,
                        formatType: 'number',
                        minPlaces: Math.pow(10, 9),
                      })}{' '}
                      {asset?.token?.symbol}
                    </span>
                  </div>
                </div>

                <div className="">
                  <h3 className="grotesk-medium text-right text-sm text-white">
                    {abbrNum({
                      number:
                        +asset?.usd_value /
                        (settings?.data?.native_usd_price ?? 0),
                      decPlaces: 6,
                      formatType: 'number',
                      minPlaces: Math.pow(10, 4),
                    })}{' '}
                    BNB
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex h-full flex-col items-center justify-center">
          <Wallet className="mb-4" />
          <h3 className="grotesk-semibold mb-1 text-2xl text-white">
            No token yet
          </h3>
          <h4 className="text-center text-sm text-[#8C8C8C]">
            Token you buy will show up here.
          </h4>
          <h4 className="mb-4 text-center text-sm text-[#8C8C8C]">
            Looks like your wallet is empty. Buy some tokens to get started!
          </h4>
        </div>
      )}
    </div>
  );
};

const WalletAssets: FC<ReceivedProps> = (props) => (
  <WalletAssetsLayout {...useWalletAssets(props)} />
);

export default WalletAssets;
