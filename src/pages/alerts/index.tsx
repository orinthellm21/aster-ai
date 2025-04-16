import React, { type FC } from 'react';
import useAlertsPage, { type Props, type ReceivedProps } from './hook';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Button from '@/components/ui/button';
import { abbrNum, timeDifference2, truncateAddress } from '@/utils';
import { Badge } from '@/components/ui/badge';
import CopyButton from '@/components/copy-button';
import { useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { isEmpty } from 'lodash';
import { Loader2 } from 'lucide-react';

const AlertsPageLayout: FC<Props> = (props) => {
  const { signal, setOffSet, offset, data } = props;
  const navigate = useNavigate();

  return (
    <InfiniteScroll
      className="pb-[200px]"
      dataLength={(data || []).length}
      next={() => setOffSet(offset + 1)}
      hasMore={!isEmpty(signal?.data)}
      loader={
        <div className="mt-8 flex items-center justify-center">
          <Loader2 className="animate-spin" />
        </div>
      }
      height={window.innerHeight}
    >
      <div className="flex w-full flex-1 flex-col gap-4 overflow-y-auto">
        {(data ?? []).map((item) => {
          if (item?.signal) {
            return (
              <div className="mx-auto rounded-xl border border-[#494949] bg-[#181818] p-4 sm:w-[80%]">
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold text-[#DCDCDC]">New pump</p>
                  <p className="text-xs text-[#A3A3A3]">
                    {timeDifference2(item.date * 1000)}
                  </p>
                </div>

                <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-3">
                  <div className="flex gap-3.5">
                    <Avatar className="size-12 rounded-xl">
                      <AvatarImage
                        className="rounded-xl object-cover"
                        src={item.token_details?.logo}
                      ></AvatarImage>
                      <AvatarFallback className="rounded-xl">
                        {item.token_details?.symbol.at(0)?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">
                        {item.token_details?.symbol}
                      </p>
                      <div className="flex items-center gap-1">
                        <p className="text-xs text-[#A3A3A3]">
                          {truncateAddress(item.ca)}
                        </p>
                        <CopyButton text={item.ca ?? ''} />
                      </div>
                    </div>
                  </div>
                </div>

                <p
                  className="inline-block bg-clip-text py-4 text-4xl font-bold text-transparent md:text-8xl"
                  style={{
                    backgroundImage:
                      'linear-gradient(90deg, #FFFFFF 0%, #999999 100%)',
                  }}
                >
                  {item?.signal}
                </p>

                <div className="mt-3 flex items-center gap-5">
                  <Button
                    className="text-foreground flex-1 bg-[#262626] hover:bg-[#666666]"
                    onClick={() => {
                      const message = encodeURIComponent(
                        `top holders of ${item.ca}`,
                      );

                      navigate(`/conversations?message=${message}`);
                    }}
                  >
                    Top Holders
                  </Button>
                  <Button
                    className="text-foreground flex-1 bg-[#262626] hover:bg-[#666666]"
                    onClick={() => {
                      const message = encodeURIComponent(
                        `dev check ${item.ca}`,
                      );

                      navigate(`/conversations?message=${message}`);
                    }}
                  >
                    Dev Analysis
                  </Button>
                  <Button
                    className="text-foreground flex-1 bg-[#262626] hover:bg-[#666666]"
                    onClick={() => {
                      const message = encodeURIComponent(
                        `token info of ${item.ca}`,
                      );

                      navigate(`/conversations?message=${message}`);
                    }}
                  >
                    Onchain Data
                  </Button>
                  {/* <Button
                className="text-foreground flex-1 bg-[#262626] hover:bg-[#666666]"
                onClick={() => onShare(item?.ca)}
                disabled={shareLoading}
              >
                {shareLoading && <Loader2 className="animate-spin" />}
                Share on X
              </Button> */}
                </div>
              </div>
            );
          }

          return (
            <div
              className="mx-auto rounded-xl border border-[#494949] bg-[#181818] p-4 sm:w-[80%]"
              key={`alert-item-${item.ca}`}
            >
              <div className="flex items-center justify-between">
                <p className="mt-1 text-[#C0C0C0]">
                  {item?.signal ? (
                    <>
                      <span className="font-bold">
                        {item.token_details.symbol}
                      </span>{' '}
                      got{' '}
                      <span className="font-bold text-green-500">
                        {item?.signal}
                      </span>{' '}
                      from entry
                    </>
                  ) : (
                    'New potential future trending token'
                  )}
                </p>

                <p className="text-xs text-[#A3A3A3]">
                  {timeDifference2(item.date * 1000)}
                </p>
              </div>
              {/* {item.sort_criteria === 'change5m' &&
              !!item?.price_change_percent5m && (
                <p className="mt-1 text-sm text-[#C0C0C0]">
                  <span className="text-foreground">{item.symbol}</span> price
                  just {item.price_change_percent5m < 0 ? 'dumped' : 'pumped'}{' '}
                  by{' '}
                  <span
                    className={cn({
                      'text-green-500': item.price_change_percent5m > 0,
                      'text-red-500': !(item.price_change_percent5m > 0),
                    })}
                  >
                    {(Math.abs(item.price_change_percent5m) * 100).toFixed(2)}%
                  </span>{' '}
                  price in 5 minutes.
                </p>
              )}
            {item.sort_criteria === 'change1h' &&
              !!item?.price_change_percent1h && (
                <p className="mt-1 text-sm text-[#C0C0C0]">
                  <span className="text-foreground">{item.symbol}</span> price
                  just {item.price_change_percent1h < 0 ? 'dumped' : 'pumped'}{' '}
                  by{' '}
                  <span
                    className={cn({
                      'text-green-500': item.price_change_percent1h > 0,
                      'text-red-500': !(item.price_change_percent1h > 0),
                    })}
                  >
                    {(Math.abs(item.price_change_percent1h) * 100).toFixed(2)}%
                  </span>{' '}
                  price in 1 hour.
                </p>
              )} */}

              {item?.ca && (
                <p className="mt-1 text-sm text-[#C0C0C0]">
                  Check CA on{' '}
                  <a
                    className="text-sm underline"
                    href={`https://dexscreener.com/bsc/${item.ca}`}
                    target="_blank"
                  >
                    dexscreener
                  </a>
                </p>
              )}
              <Separator className="my-3 bg-[#4F4F4F]" />
              <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                <div className="flex gap-3.5">
                  <Avatar className="size-12 rounded-xl">
                    <AvatarImage
                      className="rounded-xl object-cover"
                      src={item.token_details?.logo}
                    ></AvatarImage>
                    <AvatarFallback className="rounded-xl">
                      {item.token_details?.symbol.at(0)?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">
                      {item.token_details?.symbol}
                    </p>
                    <div className="flex items-center gap-1">
                      <p className="text-xs text-[#A3A3A3]">
                        {truncateAddress(item.ca)}
                      </p>
                      <CopyButton text={item.ca ?? ''} />
                    </div>
                  </div>
                </div>
                <div>
                  <p
                    className="text-xs text-[#A3A3A3]"
                    style={{
                      color: '#A3A3A3',
                    }}
                  >
                    Top 10 Holders
                  </p>
                  <p className="mt-2 text-xs">
                    {(
                      +(item?.token_details?.top_10_holder_rate ?? 0) * 100
                    ).toFixed(2)}
                    %
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#A3A3A3]">Social</p>
                  <div className="flex flex-wrap items-center gap-1">
                    {!!item?.token_details?.social?.link?.telegram && (
                      <a
                        href={item?.token_details?.social?.link?.telegram}
                        target="_blank"
                      >
                        <Badge className="bg-[#535353] font-light text-[#C0C0C0] hover:bg-[#868686]">
                          Telegram
                        </Badge>
                      </a>
                    )}
                    {!!item?.token_details?.social?.link?.website && (
                      <a
                        href={item?.token_details?.social?.link?.website}
                        target="_blank"
                      >
                        <Badge className="bg-[#535353] font-light text-[#C0C0C0] hover:bg-[#868686]">
                          Website
                        </Badge>
                      </a>
                    )}
                    {!!item?.token_details?.social?.link?.twitter_username && (
                      <a
                        href={
                          item?.token_details?.social?.link?.twitter_username.startsWith(
                            'http',
                          )
                            ? item?.token_details?.social?.link
                                ?.twitter_username
                            : `https://x.com/intent/user?screen_name=${item?.token_details?.social?.link?.twitter_username}`
                        }
                        target="_blank"
                      >
                        <Badge className="bg-[#535353] font-light text-[#C0C0C0] hover:bg-[#868686]">
                          Twitter
                        </Badge>
                      </a>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-[#A3A3A3]">Market Cap</p>
                  <p className="mt-2 text-xs">
                    $
                    {abbrNum({
                      number:
                        +(item?.token_details?.total_supply ?? 0) *
                        +(item?.token_details?.price ?? 0),
                      decPlaces: 3,
                      formatType: 'currency',
                      minPlaces: 1e6,
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#A3A3A3]">Liquidity</p>
                  <p className="mt-2 text-xs">
                    $
                    {abbrNum({
                      number: +(item?.token_details?.liquidity ?? 0),
                      decPlaces: 3,
                      formatType: 'currency',
                      minPlaces: 1e6,
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#A3A3A3]">Volume</p>
                  <p className="mt-2 text-xs">
                    $
                    {abbrNum({
                      number: +(item?.token_details?.volume_24h ?? 0),
                      decPlaces: 3,
                      formatType: 'currency',
                      minPlaces: 1e9,
                    })}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-5">
                <Button
                  className="text-foreground flex-1 bg-[#262626] hover:bg-[#666666]"
                  onClick={() => {
                    const message = encodeURIComponent(
                      `top holders of ${item.ca}`,
                    );

                    navigate(`/conversations?message=${message}`);
                  }}
                >
                  Top Holders
                </Button>
                <Button
                  className="text-foreground flex-1 bg-[#262626] hover:bg-[#666666]"
                  onClick={() => {
                    const message = encodeURIComponent(`dev check ${item.ca}`);

                    navigate(`/conversations?message=${message}`);
                  }}
                >
                  Dev Analysis
                </Button>
                <Button
                  className="text-foreground flex-1 bg-[#262626] hover:bg-[#666666]"
                  onClick={() => {
                    const message = encodeURIComponent(
                      `token info of ${item.ca}`,
                    );

                    navigate(`/conversations?message=${message}`);
                  }}
                >
                  Onchain Data
                </Button>
                {/* <Button
                className="text-foreground flex-1 bg-[#262626] hover:bg-[#666666]"
                onClick={() => onShare(item?.ca)}
                disabled={shareLoading}
              >
                {shareLoading && <Loader2 className="animate-spin" />}
                Share on X
              </Button> */}
              </div>
            </div>
          );
        })}
      </div>
    </InfiniteScroll>
  );
};

const AlertsPage: FC<ReceivedProps> = (props) => (
  <AlertsPageLayout {...useAlertsPage(props)} />
);

export default AlertsPage;
