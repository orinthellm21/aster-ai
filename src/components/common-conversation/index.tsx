import {
  AnalystStatus,
  ToolFunctionName,
} from '@/constants/conversation.constants';
import { useAppContext } from '@/contexts/app-provider/hook';
import { useAuthContext } from '@/contexts/auth-provider/hook';
import { useConversationContext } from '@/contexts/conversation-provider/hook';
import { abbrNum, cn, truncateAddress } from '@/utils';
import {
  ArrowDown,
  ArrowRight,
  Copy,
  Globe,
  Loader,
  Loader2,
  RotateCcw,
  Send,
} from 'lucide-react';
import moment from 'moment';
import { type FC } from 'react';
import Markdown from 'react-markdown';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import Button from '../ui/button';
import { Separator } from '../ui/separator';
import { Textarea } from '../ui/textarea';
import useCommonConversation, { type Props, type ReceivedProps } from './hook';
import {
  ResponsiveContainer,
  AreaChart,
  CartesianGrid,
  Area,
  Tooltip,
} from 'recharts';
import TwitterIcon from '@/assets/twitter.svg';
import TerminalIcon from '@/assets/terminal.svg';
import FundamentalsIcon from '@/assets/fundamentals.svg';
import ValuationIcon from '@/assets/valuation.svg';
import SentimentIcon from '@/assets/sentiment.svg';
import TrumpIcon from '@/assets/trump.jpg';
import SmartMoneyIcon from '@/assets/smart-money.svg';
import RiskIcon from '@/assets/risk.svg';
import CommonLoading from '../common-loading';
import NotificationModal from '../notification-modal';
import { toast } from '@/hooks/use-toast';
import TypingLoading from '../typing';
import {
  Tooltip as ToolTipShadcn,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Progress } from '../ui/progress';
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from 'react-circular-progressbar';
import CopyButton from '../copy-button';
// import SolanaIcon from '@/assets/solana.svg';
import BSCIcon from '@/assets/bsc.svg';
import ElizaIcon from '@/assets/eliza.svg';
import OpenAIIcon from '@/assets/openai.svg';
import GmgnIcon from '@/assets/gmgn.svg';
import ClaudeIcon from '@/assets/claude.svg';
import GeminiIcon from '@/assets/gemini.svg';
import GrokIcon from '@/assets/grok.svg';
import DeepseekIcon from '@/assets/deepseek.svg';
import DexScreenerIcon from '@/assets/dexscreener.svg';

moment.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s',
    s: 'a sec',
    ss: '%d secs',
    m: 'a min',
    mm: '%d mins',
    h: 'an hour',
    hh: '%d hours',
    d: 'a day',
    dd: '%d days',
    w: 'a week',
    ww: '%d weeks',
    M: 'a month',
    MM: '%d months',
    y: 'a year',
    yy: '%d years',
  },
});

const DEFAULT_SUGGESTIONS = [
  {
    title: "What's the price of BNB?",
    description: 'Find the current price of BNB',
  },
  {
    title: 'Top gainers in the last 24h',
    description: 'Find the top gainers in the last 24 hours',
  },
  // {
  //   title: 'Check my wallet',
  //   description: 'Check the portfolio of you wallet',
  // },
  // {
  //   title: 'Launch a new token',
  //   description: 'Deploy a new token on pump.fun ',
  // },
];

const DEFAULT_INTEGRATIONS = [
  {
    title: 'pump.fun',
    description: 'Find the current price of BNB',
  },
  {
    title: 'Jupiter',
    description: 'Find the top gainers in the last 24 hours',
  },
  {
    title: 'Magic Eden',
    description: 'Check the portfolio of you wallet',
  },
  {
    title: 'Dialect',
    description: 'Deploy a new token on pump.fun',
  },
  {
    title: 'DexScreener',
    description: 'Check the portfolio of you wallet',
  },
  {
    title: 'Defined Fi',
    description: 'Deploy a new token on pump.fun ',
  },
];

const ANALYST_STATUS = [
  {
    key: 'technical_analyst_agent',
    label: 'Technical',
    icon: TerminalIcon,
  },
  {
    key: 'fundamentals_agent',
    label: 'Fundamentals',
    icon: FundamentalsIcon,
  },
  {
    key: 'valuation_agent',
    label: 'Valuation',
    icon: ValuationIcon,
  },
  {
    key: 'sentiment_agent',
    label: 'Sentiment',
    icon: SentimentIcon,
  },
  {
    key: 'smart_money_signal',
    label: 'Smart Money Signal',
    icon: SmartMoneyIcon,
  },
  {
    key: 'risk_management_agent',
    label: 'Risk Management',
    icon: RiskIcon,
  },
];

const CommonConversationLayout: FC<Props> = (props) => {
  const {
    text,
    setText,
    handleSend,
    handleSwap,
    swapping,
    notificationModalRef,
    swapTx,
    currentSocialMentionChart,
    handleTransfer,
  } = props;

  const {
    handleSendMessage,
    currentMessages,
    isSendMessagePending,
    currentConversationHistory,
    endMessageRef,
  } = useConversationContext();

  const { settings } = useAppContext();

  if (
    currentConversationHistory?.isFetching ||
    (!currentMessages.length && isSendMessagePending)
  ) {
    return (
      <div className="flex items-center justify-center py-6">
        <Loader2 className="!size-6 animate-spin text-[#A3A3A3]" />
      </div>
    );
  }

  return (
    <div
      className={cn('mx-auto flex w-full flex-1 flex-col sm:w-[80%]', {
        'overflow-y-auto': !currentMessages.length,
        'overflow-y-hidden': !!currentMessages.length,
      })}
    >
      {swapping && <CommonLoading />}

      <NotificationModal ref={notificationModalRef}>
        <div className="mt-4">
          <a
            href={`https://bscscan.com/tx/${swapTx}`}
            target="_blank"
            className="text-sm break-all underline"
          >
            {swapTx}
          </a>
        </div>
      </NotificationModal>

      <div
        className={cn('flex w-full flex-1 flex-col justify-start gap-6', {
          'overflow-y-auto': !!currentMessages.length,
          // 'overflow-y-hidden': !currentMessages.length,
        })}
      >
        {!currentMessages.length ? (
          <h2 className="mb-4 scroll-m-20 text-center text-4xl font-semibold tracking-tight first:mt-0">
            How can I assist you?
          </h2>
        ) : (
          <>
            <div
              className={cn(
                'flex flex-1 flex-col gap-6 overflow-y-auto text-sm sm:text-base',
              )}
            >
              {currentMessages.map((message, index) => {
                // console.log('message', message);
                let trendingComponent;

                if (
                  message?.tool_call?.name ===
                  ToolFunctionName.GET_TRENDING_TOKENS
                ) {
                  trendingComponent = (
                    <>
                      {message?.tool_call?.response?.trending_tokens?.length ? (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                          {(
                            message?.tool_call?.response?.trending_tokens ?? []
                          ).map((item: Record<string, any>) => {
                            return (
                              <div
                                key={`message-trending-detail-${message.id}-${item?.address}`}
                                className="flex flex-col gap-3 rounded-xl border border-[#494949] bg-[#181818] p-4"
                              >
                                <div className="flex items-start justify-between">
                                  <div className="items-center-center flex gap-3.5">
                                    <Avatar className="size-12 rounded-xl">
                                      <AvatarImage
                                        className="rounded-xl object-cover"
                                        src={item?.logo}
                                      />
                                      <AvatarFallback className="rounded-xl">
                                        {item?.symbol?.at(0)?.toUpperCase()}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col justify-center">
                                      <p className="text-sm font-medium">
                                        {item?.symbol ?? ''}
                                      </p>
                                      <div className="flex items-center gap-1">
                                        <p className="text-xs text-[#A3A3A3]">
                                          {truncateAddress(item?.address ?? '')}
                                        </p>
                                        <CopyButton
                                          text={item?.address ?? ''}
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-2 pt-[5px]">
                                    {item?.website && (
                                      <a href={item?.website} target="_blank">
                                        <Globe className="size-3 cursor-pointer" />
                                      </a>
                                    )}
                                    {item?.twitter_username && (
                                      <a
                                        href={`https://x.com/${item?.twitter_username}`}
                                        target="_blank"
                                      >
                                        <img
                                          src="/icons/x-logo.png"
                                          alt="x"
                                          className="size-3 cursor-pointer"
                                        />
                                      </a>
                                    )}
                                    {item?.telegram && (
                                      <a href={item?.telegram} target="_blank">
                                        <Send className="size-3 cursor-pointer" />
                                      </a>
                                    )}
                                  </div>
                                </div>
                                <Separator className="bg-[#4F4F4F]" />
                                <div className="grid grid-cols-2 gap-x-2 gap-y-4">
                                  <div>
                                    <p className="text-xs text-[#A3A3A3]">
                                      Market Cap
                                    </p>
                                    <p className="text-sm font-bold">
                                      $
                                      {abbrNum({
                                        number: +(item?.market_cap ?? 0),
                                        decPlaces: 3,
                                        formatType: 'currency',
                                        minPlaces: 1e6,
                                      })}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-[#A3A3A3]">
                                      24h Volume
                                    </p>

                                    <p className="text-sm font-bold">
                                      $
                                      {abbrNum({
                                        number: +(item?.volume ?? 0),
                                        decPlaces: 3,
                                        formatType: 'currency',
                                        minPlaces: 1e6,
                                      })}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-[#A3A3A3]">
                                      Holders
                                    </p>
                                    <p className="text-sm font-bold">
                                      {abbrNum({
                                        number: +(item?.holder_count ?? 0),
                                        decPlaces: 3,
                                        formatType: 'number',
                                        minPlaces: 1e6,
                                      })}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-[#A3A3A3]">
                                      Liquidity
                                    </p>
                                    <p className="text-sm font-bold">
                                      $
                                      {abbrNum({
                                        number: +(item?.liquidity ?? 0),
                                        decPlaces: 3,
                                        formatType: 'currency',
                                        minPlaces: 1e6,
                                      })}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <></>
                      )}
                    </>
                  );
                }

                let tokenInfoComponent;

                if (
                  message?.tool_call?.name ===
                    ToolFunctionName.GET_TOKEN_INFO ||
                  message?.tool_call?.name === ToolFunctionName.ANALYSIS
                ) {
                  const social = message?.tool_call?.response?.social;
                  const tokenDetail =
                    message?.tool_call?.response?.token_detail;
                  const tokenSelections =
                    message?.tool_call?.response?.token_selection;

                  tokenInfoComponent = (
                    <>
                      {Array.isArray(tokenSelections) &&
                        !!tokenSelections.length && (
                          <div className="mb-5 rounded-lg border border-solid border-[#494949] p-4">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                              {tokenSelections.map(
                                (item: Record<string, any>) => {
                                  return (
                                    <div
                                      key={`message-swap-detail-${message.id}-${item?.address}`}
                                      className="flex flex-col justify-between gap-3 rounded-xl border border-[#494949] bg-[#181818] p-4"
                                    >
                                      <div className="items-center-center flex gap-3.5">
                                        <Avatar className="size-12 rounded-xl">
                                          <AvatarImage
                                            className="rounded-xl object-cover"
                                            src={item?.logo}
                                          />
                                          <AvatarFallback className="rounded-xl">
                                            {item?.symbol?.at(0)?.toUpperCase()}
                                          </AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col justify-center">
                                          <p className="text-sm font-medium">
                                            {item?.name ?? ''}{' '}
                                            <span className="text-sm font-normal text-[#A3A3A3]">
                                              ({item?.symbol ?? ''})
                                            </span>
                                          </p>
                                          <div className="flex items-center gap-1">
                                            <p className="text-xs text-[#A3A3A3]">
                                              {truncateAddress(
                                                item?.address ?? '',
                                              )}
                                            </p>
                                            <CopyButton
                                              text={item?.address ?? ''}
                                            />
                                          </div>
                                        </div>
                                      </div>

                                      <Button
                                        className=""
                                        onClick={() =>
                                          handleSend(item?.address ?? '')
                                        }
                                      >
                                        Check
                                      </Button>
                                    </div>
                                  );
                                },
                              )}
                            </div>
                          </div>
                        )}
                      {tokenDetail ? (
                        <div className="mb-5 rounded-lg border border-solid border-[#494949] p-4">
                          <div className="mt-3">
                            <div className="flex items-center gap-3.5">
                              <Avatar className="size-12 rounded-xl">
                                <AvatarImage
                                  className="rounded-xl object-cover"
                                  src={tokenDetail?.logo}
                                />
                                <AvatarFallback className="rounded-xl">
                                  {tokenDetail?.symbol?.at(0)?.toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col justify-center">
                                <p className="text-sm font-bold">
                                  {tokenDetail?.name ?? ''}{' '}
                                  <span className="text-xs font-normal text-[#A3A3A3]">
                                    ({tokenDetail?.symbol ?? ''})
                                  </span>
                                </p>
                                <div className="flex items-center gap-1">
                                  <p className="text-xs text-[#A3A3A3]">
                                    {truncateAddress(
                                      tokenDetail?.address ?? '',
                                    )}
                                  </p>
                                  <CopyButton
                                    text={tokenDetail?.address ?? ''}
                                  />
                                  <a
                                    href={`https://dexscreener.com/bsc/${tokenDetail?.address ?? ''}`}
                                    target="_blank"
                                    className="ml-2 text-xs text-[#A3A3A3] hover:underline"
                                  >
                                    View on DexScreener
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                              <div className="rounded-lg bg-[#0C0C0C] p-3">
                                <p className="text-xs font-medium text-[#C0C0C0]">
                                  Price USD
                                </p>
                                <p className="text-lg font-bold">
                                  $
                                  {abbrNum({
                                    number: +(tokenDetail?.price ?? 0),
                                    decPlaces: 3,
                                    formatType: 'currency',
                                    minPlaces: 1e6,
                                  })}
                                </p>
                              </div>
                              <div className="rounded-lg bg-[#0C0C0C] p-3">
                                <p className="text-xs font-medium text-[#C0C0C0]">
                                  Liquidity
                                </p>
                                <p className="text-lg font-bold">
                                  $
                                  {abbrNum({
                                    number: +(tokenDetail?.liquidity ?? 0),
                                    decPlaces: 3,
                                    formatType: 'currency',
                                    minPlaces: 1e6,
                                  })}
                                </p>
                              </div>
                              <div className="rounded-lg bg-[#0C0C0C] p-3">
                                <p className="text-xs font-medium text-[#C0C0C0]">
                                  Market Cap
                                </p>
                                <p className="text-lg font-bold">
                                  $
                                  {abbrNum({
                                    number:
                                      +(tokenDetail?.total_supply ?? 0) *
                                      +(tokenDetail?.price ?? 0),
                                    decPlaces: 3,
                                    formatType: 'currency',
                                    minPlaces: 1e6,
                                  })}
                                </p>
                              </div>
                              <div className="rounded-lg bg-[#0C0C0C] p-3">
                                <p className="text-xs font-medium text-[#C0C0C0]">
                                  Fully Diluted Valuation (FDV)
                                </p>

                                <p className="text-lg font-bold">
                                  $
                                  {abbrNum({
                                    number:
                                      +(tokenDetail?.total_supply ?? 0) *
                                      +(tokenDetail?.price ?? 0),
                                    decPlaces: 3,
                                    formatType: 'currency',
                                    minPlaces: 1e6,
                                  })}
                                </p>
                              </div>
                              <div className="rounded-lg bg-[#0C0C0C] p-3">
                                <p className="text-xs font-medium text-[#C0C0C0]">
                                  24h Trading Volume:
                                </p>
                                <p className="text-lg font-bold">
                                  $
                                  {abbrNum({
                                    number: +(tokenDetail?.volume_24h ?? 0),
                                    decPlaces: 3,
                                    formatType: 'currency',
                                    minPlaces: 1e6,
                                  })}
                                </p>
                              </div>
                              <div className="rounded-lg bg-[#0C0C0C] p-3">
                                <p className="text-xs font-medium text-[#C0C0C0]">
                                  Top 10 Holders
                                </p>
                                <p className="text-lg font-bold">
                                  {(
                                    +(tokenDetail?.top_10_holder_rate ?? 0) *
                                    100
                                  ).toFixed(2)}
                                  %
                                </p>
                              </div>
                            </div>
                            {/* <p className="mt-5 text-sm text-[#C0C0C0]">
                      The token is trading on Raydium DEX and has shown
                      significant price movement with a 24h change of +8,572%.
                    </p> */}
                            <Separator className="my-4 bg-[#4F4F4F]" />
                            <p className="text-xs font-medium">Links</p>
                            <div className="mt-2 flex flex-wrap items-center gap-2">
                              {!!social?.link?.website && (
                                <a href={social?.link?.website} target="_blank">
                                  <Badge className="bg-[#0C0C0C] font-light text-[#C0C0C0] hover:bg-[#535353]">
                                    Website
                                  </Badge>
                                </a>
                              )}
                              {!!social?.link?.twitter_username && (
                                <a
                                  href={
                                    social?.link?.twitter ||
                                    `https://x.com/intent/user?screen_name=${social?.link?.twitter_username}`
                                  }
                                  target="_blank"
                                >
                                  <Badge className="bg-[#0C0C0C] font-light text-[#C0C0C0] hover:bg-[#535353]">
                                    Twitter
                                  </Badge>
                                </a>
                              )}
                              {!!social?.link?.telegram && (
                                <a
                                  href={social?.link?.telegram}
                                  target="_blank"
                                >
                                  <Badge className="bg-[#0C0C0C] font-light text-[#C0C0C0] hover:bg-[#535353]">
                                    Telegram
                                  </Badge>
                                </a>
                              )}
                              {!!social?.link?.discord && (
                                <a href={social?.link?.discord} target="_blank">
                                  <Badge className="bg-[#0C0C0C] font-light text-[#C0C0C0] hover:bg-[#535353]">
                                    Discord
                                  </Badge>
                                </a>
                              )}
                              {!!social?.link?.facebook && (
                                <a
                                  href={social?.link?.facebook}
                                  target="_blank"
                                >
                                  <Badge className="bg-[#0C0C0C] font-light text-[#C0C0C0] hover:bg-[#535353]">
                                    Facebook
                                  </Badge>
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                    </>
                  );
                }

                let swapTokenComponent;

                if (message?.tool_call?.name === ToolFunctionName.SWAP_TOKEN) {
                  const tokenSelections =
                    message?.tool_call?.response?.token_selection;

                  const tokenDetail =
                    message?.tool_call?.response?.token_detail;

                  const inputTokenSymbol =
                    message?.tool_call?.arguments?.inputTokenSymbol;

                  const outputTokenSymbol =
                    message?.tool_call?.arguments?.outputTokenSymbol;

                  const isBuy = inputTokenSymbol === 'BNB';

                  const inputAmount = +(
                    message?.tool_call?.arguments?.amount ?? 0
                  );

                  const outputAmount = isBuy
                    ? (+(settings?.data?.native_usd_price ?? 0) * inputAmount) /
                      +(tokenDetail?.price ?? 0)
                    : (inputAmount * +(tokenDetail?.price ?? 0)) /
                      +(settings?.data?.native_usd_price ?? 0);

                  const swapInputTokenCA =
                    message?.tool_call?.arguments?.inputTokenCA;

                  const swapOutputTokenCA =
                    message?.tool_call?.arguments?.outputTokenCA;

                  const swapAmount = message?.tool_call?.arguments?.amount;

                  swapTokenComponent = (
                    <div className="mb-5 rounded-lg border border-solid border-[#494949] p-4">
                      {Array.isArray(tokenSelections) &&
                        !!tokenSelections.length && (
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                            {tokenSelections.map(
                              (item: Record<string, any>) => {
                                return (
                                  <div
                                    key={`message-swap-detail-${message.id}-${item?.address}`}
                                    className="flex flex-col gap-3 rounded-xl border border-[#494949] bg-[#181818] p-4"
                                  >
                                    <div className="items-center-center flex gap-3.5">
                                      <Avatar className="size-12 rounded-xl">
                                        <AvatarImage
                                          className="rounded-xl object-cover"
                                          src={item?.logo}
                                        ></AvatarImage>
                                        <AvatarFallback className="rounded-xl">
                                          {item?.symbol?.at(0)?.toUpperCase()}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div className="flex flex-col justify-center">
                                        <p className="text-sm font-medium">
                                          {item?.name ?? ''}{' '}
                                          <span className="text-sm font-normal text-[#A3A3A3]">
                                            ({item?.symbol ?? ''})
                                          </span>
                                        </p>
                                        <div className="flex items-center gap-1">
                                          <p className="text-xs text-[#A3A3A3]">
                                            {truncateAddress(
                                              item?.address ?? '',
                                            )}
                                          </p>
                                          <CopyButton
                                            text={item?.address ?? ''}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <Separator className="bg-[#4F4F4F]" />
                                    <div className="grid grid-cols-2 gap-x-2 gap-y-4">
                                      <div>
                                        <p className="text-xs text-[#A3A3A3]">
                                          Price
                                        </p>
                                        <p className="text-sm font-bold">
                                          $
                                          {abbrNum({
                                            number: +(item?.price ?? 0),
                                            decPlaces: 6,
                                            formatType: 'currency',
                                            minPlaces: 1e6,
                                          })}
                                        </p>
                                      </div>
                                    </div>
                                    <Separator className="bg-[#4F4F4F]" />
                                    <Button
                                      className=""
                                      onClick={() =>
                                        handleSend(item?.address ?? '')
                                      }
                                    >
                                      Select
                                    </Button>
                                  </div>
                                );
                              },
                            )}
                          </div>
                        )}
                      {tokenDetail && (
                        <div className="flex flex-col gap-5 rounded-xl border border-[#494949] bg-[#181818] p-4">
                          <p className="text-lg font-bold">
                            Search Token Information
                          </p>
                          <div className="flex items-center gap-3.5">
                            <Avatar className="size-12 rounded-xl">
                              <AvatarImage
                                className="rounded-xl object-cover"
                                src={tokenDetail?.logo}
                              ></AvatarImage>
                              <AvatarFallback className="rounded-xl">
                                {tokenDetail?.symbol?.at(0)?.toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col justify-center">
                              <p className="text-sm font-medium">
                                {tokenDetail?.symbol ?? ''}{' '}
                              </p>
                              <div className="flex items-center gap-1">
                                <p className="text-xs text-[#A3A3A3]">
                                  {truncateAddress(tokenDetail?.address ?? '')}
                                </p>
                                <CopyButton text={tokenDetail?.address ?? ''} />
                                <a
                                  href={`https://dexscreener.com/bsc/${tokenDetail?.address ?? ''}`}
                                  target="_blank"
                                  className="ml-2 text-xs text-[#A3A3A3] hover:underline"
                                >
                                  View on DexScreener
                                </a>
                              </div>
                            </div>
                          </div>
                          <Separator className="bg-[#4F4F4F]" />
                          <p className="text-lg font-bold">
                            Preview Swap Detail
                          </p>
                          <div className="relative flex flex-col gap-3">
                            <div className="flex items-center rounded-xl bg-[#494949] px-4 py-2">
                              <p className="text-lg font-bold">
                                {abbrNum({
                                  number: inputAmount,
                                  decPlaces: 6,
                                  formatType: 'number',
                                  minPlaces: 1e6,
                                })}{' '}
                                {inputTokenSymbol}
                              </p>
                            </div>
                            <div className="flex items-center rounded-xl bg-[#494949] px-4 py-2">
                              <p className="text-lg font-bold">
                                {abbrNum({
                                  number: outputAmount,
                                  decPlaces: 6,
                                  formatType: 'number',
                                  minPlaces: 1e6,
                                })}{' '}
                                {outputTokenSymbol}
                              </p>
                            </div>
                            <div className="absolute top-1/2 left-1/2 w-fit -translate-1/2 rounded-full bg-[#696969]">
                              <ArrowDown />
                            </div>
                          </div>
                          <Button
                            onClick={() => {
                              handleSwap({
                                inputTokenCA: swapInputTokenCA,
                                outputTokenCA: swapOutputTokenCA,
                                amount: swapAmount,
                              });
                            }}
                          >
                            Confirm
                          </Button>
                        </div>
                      )}
                    </div>
                  );
                }

                let tokenHoldersComponent;

                if (
                  message?.tool_call?.name ===
                    ToolFunctionName.GET_TOKEN_HOLDERS ||
                  message?.tool_call?.name === ToolFunctionName.ANALYSIS
                ) {
                  const holders = message?.tool_call?.response?.holders;

                  const tokenSelections =
                    message?.tool_call?.response?.token_selection;

                  if (holders || tokenSelections)
                    tokenHoldersComponent = (
                      <div className="mb-5 rounded-lg border border-solid border-[#494949] p-4">
                        {Array.isArray(tokenSelections) &&
                          !!tokenSelections.length && (
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                              {tokenSelections.map(
                                (item: Record<string, any>) => {
                                  return (
                                    <div
                                      key={`message-swap-detail-${message.id}-${item?.address}`}
                                      className="flex flex-col justify-between gap-3 rounded-xl border border-[#494949] bg-[#181818] p-4"
                                    >
                                      <div className="items-center-center flex gap-3.5">
                                        <Avatar className="size-12 rounded-xl">
                                          <AvatarImage
                                            className="rounded-xl object-cover"
                                            src={item?.logo}
                                          />
                                          <AvatarFallback className="rounded-xl">
                                            {item?.symbol?.at(0)?.toUpperCase()}
                                          </AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col justify-center">
                                          <p className="text-sm font-medium">
                                            {item?.name ?? ''}{' '}
                                            <span className="text-sm font-normal text-[#A3A3A3]">
                                              ({item?.symbol ?? ''})
                                            </span>
                                          </p>
                                          <div className="flex items-center gap-1">
                                            <p className="text-xs text-[#A3A3A3]">
                                              {truncateAddress(
                                                item?.address ?? '',
                                              )}
                                            </p>
                                            <CopyButton
                                              text={item?.address ?? ''}
                                            />
                                          </div>
                                        </div>
                                      </div>

                                      <Button
                                        className=""
                                        onClick={() =>
                                          handleSend(item?.address ?? '')
                                        }
                                      >
                                        Check
                                      </Button>
                                    </div>
                                  );
                                },
                              )}
                            </div>
                          )}
                        {!!holders?.length && !tokenSelections?.length && (
                          <div className="mt-3 flex flex-col gap-4 rounded-xl border border-[#494949] bg-[#181818] p-4">
                            <p className="text-lg font-bold text-white">
                              Top {holders?.length || 0} Holders Entry Points
                            </p>
                            <div className="grid grid-cols-[repeat(5,_auto)] overflow-x-auto">
                              <div className="px-2 text-center text-sm text-[#A3A3A3]">
                                #
                              </div>
                              <div className="px-2 text-center text-sm text-[#A3A3A3]">
                                Address
                              </div>
                              <div className="px-2 text-center text-sm text-[#A3A3A3]">
                                Holding
                              </div>
                              <div className="px-2 text-center text-sm text-[#A3A3A3]">
                                Duration
                              </div>
                              <div className="px-2 text-center text-sm text-[#A3A3A3]">
                                PnL
                              </div>
                              {(holders ?? []).map(
                                (item: Record<string, any>, index: number) => {
                                  return (
                                    <div
                                      className="contents"
                                      key={`message-holder-detail-${message.id}-${item?.address}`}
                                    >
                                      <div
                                        className={cn(
                                          'flex flex-col items-center justify-center border-b-[#4F4F4F] px-2 py-3 text-sm',
                                          {
                                            'border-b':
                                              index !==
                                              +(holders?.length ?? 0) - 1,
                                          },
                                        )}
                                      >
                                        {index + 1}
                                      </div>
                                      <div
                                        className={cn(
                                          'flex items-center justify-center gap-1 border-b-[#4F4F4F] px-2 py-3 text-sm',
                                          {
                                            'border-b':
                                              index !==
                                              +(holders?.length ?? 0) - 1,
                                          },
                                        )}
                                      >
                                        {truncateAddress(item?.address ?? '')}
                                        <CopyButton
                                          text={item?.address ?? ''}
                                        />
                                      </div>
                                      <div
                                        className={cn(
                                          'flex flex-col items-center justify-center border-b-[#4F4F4F] px-2 py-3 text-end text-sm',
                                          {
                                            'border-b':
                                              index !==
                                              +(holders?.length ?? 0) - 1,
                                          },
                                        )}
                                      >
                                        <p>
                                          {(
                                            +(item?.amount_percentage ?? 0) *
                                            100
                                          ).toFixed(2)}
                                          %
                                        </p>
                                        <p className="text-xs text-[#A3A3A3]">
                                          $
                                          {abbrNum({
                                            number: Math.abs(
                                              +(item?.usd_value ?? 0),
                                            ),
                                            decPlaces: 3,
                                            formatType: 'currency',
                                            minPlaces: 1e3,
                                          })}
                                        </p>
                                      </div>
                                      <div
                                        className={cn(
                                          'flex flex-col items-center justify-center border-b-[#4F4F4F] px-2 py-3 text-end text-sm',
                                          {
                                            'border-b':
                                              index !==
                                              +(holders?.length ?? 0) - 1,
                                          },
                                        )}
                                      >
                                        {item?.start_holding_at
                                          ? moment(
                                              +(
                                                item?.start_holding_at ??
                                                Date.now() / 1000
                                              ) * 1000,
                                            ).from(
                                              moment(
                                                +(
                                                  item?.end_holding_at ??
                                                  Date.now() / 1000
                                                ) * 1000,
                                              ),
                                            )
                                          : '---'}
                                      </div>
                                      <div
                                        className={cn(
                                          'flex flex-col items-center justify-center border-b-[#4F4F4F] px-2 py-3 text-end text-sm',
                                          {
                                            'border-b':
                                              index !==
                                              +(holders?.length ?? 0) - 1,
                                          },
                                        )}
                                      >
                                        {item?.profit ? (
                                          <p
                                            className={cn({
                                              'text-[#43C334]':
                                                item?.profit > 0,
                                              'text-[#FF0000]':
                                                item?.profit < 0,
                                            })}
                                          >
                                            {item?.profit < 0 ? '-' : ''}$
                                            {abbrNum({
                                              number: Math.abs(
                                                +(item?.profit ?? 0),
                                              ),
                                              decPlaces: 3,
                                              formatType: 'currency',
                                              minPlaces: 1e3,
                                            })}
                                          </p>
                                        ) : (
                                          '---'
                                        )}
                                      </div>
                                    </div>
                                  );
                                },
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                }

                let socialMentionComponent;

                if (
                  message?.tool_call?.name ===
                  ToolFunctionName.GET_MENTIONS_ON_X
                ) {
                  const tokenDetail =
                    message?.tool_call?.response?.token_detail;
                  const info = message?.tool_call?.response?.topic?.info;
                  const summaryChange1W =
                    message?.tool_call?.response?.topic?.summary_change_1w;
                  const summaryChange1M =
                    message?.tool_call?.response?.topic?.summary_change_1m;

                  const CustomTooltip = ({ active, payload }: any) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded bg-[#181818] p-2">
                          <p className="text-sm text-white">
                            <span className="text-xs !text-[#82ca9d]">
                              interactions:
                            </span>{' '}
                            {abbrNum({
                              number: +(payload?.[0]?.value ?? 0),
                              decPlaces: 3,
                              formatType: 'number',
                              minPlaces: 1e6,
                            })}
                          </p>
                          <p className="text-sm text-white">
                            <span className="text-xs !text-[#ff9f43]">
                              opens:
                            </span>{' '}
                            {abbrNum({
                              number: +(payload?.[1]?.value ?? 0),
                              decPlaces: 3,
                              formatType: 'number',
                              minPlaces: 1e6,
                            })}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  };

                  socialMentionComponent = (
                    <>
                      {tokenDetail?.address ? (
                        <div className="mb-5 rounded-lg border border-solid border-[#494949] p-4">
                          <h4 className="mb-2 text-lg font-bold text-white">
                            Mention
                          </h4>
                          <div className="flex items-center gap-3.5">
                            <Avatar className="size-12 rounded-xl">
                              <AvatarImage
                                className="rounded-xl object-cover"
                                src={tokenDetail?.logo}
                              />
                              <AvatarFallback className="rounded-xl">
                                {tokenDetail?.token_address
                                  ?.at(0)
                                  ?.toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col justify-center gap-1">
                              <p className="text-sm font-bold">
                                {tokenDetail?.name}{' '}
                                <span className="text-xs font-normal text-[#A3A3A3]">
                                  ({tokenDetail?.symbol})
                                </span>
                              </p>
                              <div className="flex items-center gap-1">
                                <p className="text-xs text-[#A3A3A3]">
                                  {truncateAddress(tokenDetail?.address)}
                                </p>
                                <CopyButton text={tokenDetail?.address ?? ''} />
                              </div>
                            </div>
                          </div>
                          {currentSocialMentionChart.isLoading ? (
                            <div className="flex items-center justify-center py-6">
                              <Loader2 className="!size-6 animate-spin text-[#A3A3A3]" />
                            </div>
                          ) : (
                            <ResponsiveContainer width="100%" height={200}>
                              <AreaChart
                                width={500}
                                height={200}
                                data={(
                                  currentSocialMentionChart.data || []
                                ).map((item: any) => ({
                                  name: item?.time,
                                  value1: item?.interactions,
                                  value2: item?.open,
                                }))}
                              >
                                <defs>
                                  <linearGradient
                                    id="gradientFill1"
                                    x1="0"
                                    y1="0"
                                    x2="1"
                                    y2="0"
                                  >
                                    <stop
                                      offset="0%"
                                      stopColor="rgba(2,0,36,1)"
                                      stopOpacity={1}
                                    />
                                    <stop
                                      offset="100%"
                                      stopColor="rgba(130,202,157,0.01)"
                                      stopOpacity={1}
                                    />
                                  </linearGradient>
                                </defs>
                                <defs>
                                  <linearGradient
                                    id="gradientFill2"
                                    x1="0"
                                    y1="0"
                                    x2="1"
                                    y2="0"
                                  >
                                    <stop
                                      offset="0%"
                                      stopColor="rgba(2,0,36,1)"
                                      stopOpacity={1}
                                    />
                                    <stop
                                      offset="100%"
                                      stopColor="rgba(255,160,67,0.01)"
                                      stopOpacity={1}
                                    />
                                  </linearGradient>
                                </defs>
                                <CartesianGrid stroke="transparent" />
                                <Tooltip content={<CustomTooltip />} />
                                <Area
                                  type="monotone"
                                  dataKey="value1"
                                  stroke="#82ca9d"
                                  fill="url(#gradientFill1)"
                                />
                                <Area
                                  type="monotone"
                                  dataKey="value2"
                                  stroke="#ff9f43"
                                  fill="url(#gradientFill2)"
                                />
                              </AreaChart>
                            </ResponsiveContainer>
                          )}
                          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                            {[
                              {
                                label: 'Price',
                                value: `$${abbrNum({
                                  number: +(tokenDetail?.price ?? 0),
                                  decPlaces: 3,
                                  formatType: 'currency',
                                  minPlaces: 1e6,
                                })}`,
                              },
                              {
                                label: 'Engagements 1H',
                                value: abbrNum({
                                  number: +(info?.interactions_1h ?? 0),
                                  decPlaces: 3,
                                  formatType: 'number',
                                  minPlaces: 1e6,
                                }),
                              },
                              {
                                label: 'Engagements 24H',
                                value: abbrNum({
                                  number: +(info?.interactions_24h ?? 0),
                                  decPlaces: 3,
                                  formatType: 'number',
                                  minPlaces: 1e6,
                                }),
                              },
                              {
                                label: 'Engagements 1W',
                                value: abbrNum({
                                  number: +(
                                    summaryChange1W?.interactions_1w ?? 0
                                  ),
                                  decPlaces: 3,
                                  formatType: 'number',
                                  minPlaces: 1e6,
                                }),
                              },
                              {
                                label: 'Engagements 1M',
                                value: abbrNum({
                                  number: +(
                                    summaryChange1M?.interactions_1m ?? 0
                                  ),
                                  decPlaces: 3,
                                  formatType: 'number',
                                  minPlaces: 1e6,
                                }),
                              },
                            ].map((item, index) => (
                              <div key={index} className="flex flex-col gap-1">
                                <span className="text-xs text-[#A3A3A3]">
                                  {item.label}
                                </span>
                                <p className="text-sm font-bold text-white">
                                  {item.value}
                                </p>
                              </div>
                            ))}
                          </div>
                          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                            {[
                              {
                                label: 'Price',
                                value: `$${abbrNum({
                                  number: +(tokenDetail?.price ?? 0),
                                  decPlaces: 3,
                                  formatType: 'currency',
                                  minPlaces: 1e6,
                                })}`,
                                isNegative: Number(tokenDetail?.price) > 0,
                              },
                              {
                                label: 'Score 1H',
                                value: abbrNum({
                                  number: +(info?.score1h ?? 0),
                                  decPlaces: 3,
                                  formatType: 'number',
                                  minPlaces: 1e6,
                                }),
                                isNegative: Number(info?.score1h) > 0,
                              },
                              {
                                label: 'Engagements 24H',
                                value: `${abbrNum({
                                  number: +(info?.interactions_24h_change ?? 0),
                                  decPlaces: 3,
                                  formatType: 'number',
                                  minPlaces: 1e6,
                                })}%`,
                                isNegative:
                                  Number(info?.interactions_24h_change) > 0,
                              },
                              {
                                label: 'Post mentioned on X',
                                value: abbrNum({
                                  number: +(info?.posts_active ?? 0),
                                  decPlaces: 3,
                                  formatType: 'number',
                                  minPlaces: 1e6,
                                }),
                                isNegative: Number(info?.posts_active) > 0,
                              },
                              {
                                label: 'Engagements 1W',
                                value: `${abbrNum({
                                  number: +(
                                    summaryChange1W?.interactions_1w_percent_change ??
                                    0
                                  ),
                                  decPlaces: 3,
                                  formatType: 'number',
                                  minPlaces: 1e6,
                                })}%`,
                                isNegative:
                                  Number(
                                    summaryChange1W?.interactions_1w_percent_change,
                                  ) > 0,
                              },
                              {
                                label: 'Engagements 1M',
                                value: `${abbrNum({
                                  number: +(
                                    summaryChange1M?.interactions_1m_percent_change ??
                                    0
                                  ),
                                  decPlaces: 3,
                                  formatType: 'number',
                                  minPlaces: 1e6,
                                })}%`,
                                isNegative:
                                  Number(
                                    summaryChange1M?.interactions_1m_percent_change,
                                  ) > 0,
                              },
                            ].map((item, index) => (
                              <div
                                className="rounded-lg bg-[#181818] p-3"
                                key={index}
                              >
                                <p
                                  className={cn(
                                    'text-xs font-medium text-[#C0C0C0]',
                                  )}
                                >
                                  {item.label}
                                </p>
                                <p
                                  className={cn(
                                    'text-lg font-bold',
                                    item?.isNegative &&
                                      [2, 4, 5].includes(index)
                                      ? 'text-[#02C159]'
                                      : !item?.isNegative &&
                                          [2, 4, 5].includes(index)
                                        ? 'text-[#D32029]'
                                        : 'text-white',
                                  )}
                                >
                                  {item.value}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                    </>
                  );
                }

                let socialKOLComponent;

                if (
                  message?.tool_call?.name ===
                  ToolFunctionName.GET_TWEET_CREATORS_KOL
                ) {
                  const mention = message.tool_call?.response?.kol_mention;
                  const topMention =
                    message.tool_call?.response?.top_kol_mention;
                  const creators = message.tool_call?.response?.creators;
                  const posts = message.tool_call?.response?.posts;

                  socialKOLComponent = (
                    <div className="mb-5 flex flex-col gap-6 rounded-lg border border-solid border-[#494949] p-4">
                      <div className="border-b-solid border-b border-b-[#4F4F4F] pb-6">
                        <h4 className="mb-4 text-lg font-bold text-white">
                          Mention
                        </h4>
                        <div className="flex items-center gap-10">
                          <p className="text-sm font-bold text-white">
                            <span className="text-xs text-[#A3A3A3]">
                              KOL Mentioned:{' '}
                            </span>
                            {mention}
                          </p>
                          <p className="text-sm font-bold text-white">
                            <span className="text-xs text-[#A3A3A3]">
                              Top KOL Mentioned:{' '}
                            </span>{' '}
                            {topMention}
                          </p>
                        </div>
                      </div>

                      <div className="border-b-solid border-b border-b-[#4F4F4F] pb-6">
                        <h4 className="mb-4 text-lg font-bold text-white">
                          Top KOL Mentioned
                        </h4>
                        <div className="flex flex-wrap items-start gap-4">
                          {(creators || []).map(
                            (item: Record<string, any>, index: number) => (
                              <a
                                className="relative flex items-center gap-2 rounded-lg border border-solid border-[#494949] bg-[#181818] p-4"
                                key={index}
                                href={`https://twitter.com/${item?.name}`}
                                target="_blank"
                              >
                                <Avatar className="size-12 rounded-xl">
                                  <AvatarImage
                                    className="rounded-xl object-cover"
                                    src={item?.avatar}
                                  />
                                  <AvatarFallback className="rounded-xl">
                                    {item?.name?.at(0)?.toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="pr-4">
                                  <p className="text-sm font-bold text-white">
                                    {item?.name || ''}{' '}
                                  </p>
                                  {/* <span className="text-xs text-[#A3A3A3]">
                                  {item?.
influencer_rank}
                                </span> */}
                                </div>
                                <img
                                  src={TwitterIcon}
                                  alt="TwitterIcon"
                                  className="absolute top-[10px] right-[10px]"
                                />
                              </a>
                            ),
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col">
                        {(posts || []).map(
                          (item: Record<string, any>, index: number) => (
                            <a
                              className="relative flex items-start justify-between gap-2 p-4"
                              key={index}
                              href={item?.post_link}
                              target="_blank"
                            >
                              <div className="flex items-start gap-2 rounded-lg">
                                <Avatar className="size-12 rounded-xl">
                                  <AvatarImage
                                    className="rounded-xl object-cover"
                                    src={item?.influencer_avatar}
                                  />
                                  <AvatarFallback className="rounded-xl">
                                    {item?.influencer_name
                                      ?.at(0)
                                      ?.toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="pr-10">
                                  <p className="text-sm font-bold text-white">
                                    {item?.influencer_name || ''}{' '}
                                  </p>
                                  <span className="text-xs text-[#A3A3A3]">
                                    {item?.title || ''}
                                  </span>
                                </div>
                              </div>

                              <span className="text-xs text-orange-400">
                                ({item?.sentiment}/5)
                              </span>
                            </a>
                          ),
                        )}
                      </div>
                    </div>
                  );
                }

                let devCheckComponent;

                if (
                  message?.tool_call?.name === ToolFunctionName.DEV_CHECK ||
                  message?.tool_call?.name === ToolFunctionName.ANALYSIS
                ) {
                  const tokenInfo = message.tool_call?.response?.token_info;

                  const creatorHoldBalance =
                    message.tool_call?.response?.wallet_balance?.balance;

                  const rugInfo = message.tool_call?.response?.rug_info;

                  const tokens = rugInfo?.history;

                  devCheckComponent = (
                    <>
                      {tokenInfo && (
                        <div className="mb-5 flex flex-col gap-6 rounded-lg border border-solid border-[#494949] p-4">
                          <div>
                            <p className="text-lg font-bold">
                              Check Developer Profile
                            </p>
                            <div className="mt-4 grid grid-cols-[repeat(2,_auto)] gap-2">
                              <p className="text-sm">Creator Wallet Address:</p>
                              <div className="flex items-center gap-1">
                                <p className="text-sm">
                                  {truncateAddress(
                                    tokenInfo?.dev?.address ?? '',
                                  )}
                                </p>
                                <CopyButton
                                  text={tokenInfo?.dev?.address ?? ''}
                                />
                              </div>
                              <p className="text-sm">Creator Hold:</p>
                              <p className="text-sm">
                                {abbrNum({
                                  number: +(creatorHoldBalance ?? 0),
                                  decPlaces: 3,
                                  formatType: 'currency',
                                  minPlaces: 1e6,
                                })}
                              </p>
                            </div>
                          </div>
                          {Array.isArray(tokens) && !!tokens.length && (
                            <div>
                              <p className="text-lg font-bold">
                                Dev Also Created Tokens
                              </p>
                              <div className="mt-4 grid grid-cols-[repeat(4,_auto)] gap-2">
                                <div className="text-sm text-[#A3A3A3]"></div>
                                <div className="text-sm text-[#A3A3A3]">
                                  Token
                                </div>
                                <div className="text-center text-sm text-[#A3A3A3]">
                                  CA
                                </div>
                                <div className="text-center text-sm text-[#A3A3A3]">
                                  Audit
                                </div>
                                {tokens.map((item) => {
                                  const auditType = item?.rugged_type;

                                  return (
                                    <div
                                      key={`message-dev-check-detail-${message.id}-${item?.address}`}
                                      className="contents"
                                    >
                                      <div>
                                        <Avatar className="size-10 rounded-xl">
                                          <AvatarImage
                                            className="rounded-xl object-cover"
                                            src={item?.logo}
                                          />
                                          <AvatarFallback className="rounded-xl">
                                            {item?.name?.at(0)?.toUpperCase()}
                                          </AvatarFallback>
                                        </Avatar>
                                      </div>
                                      <div className="flex items-center text-sm font-medium">
                                        {truncateAddress(item?.name ?? '')}
                                      </div>
                                      <div className="flex items-center justify-center gap-1 text-xs text-[#A3A3A3]">
                                        {truncateAddress(item?.address ?? '')}{' '}
                                        <CopyButton
                                          text={item?.address ?? ''}
                                        />
                                      </div>
                                      <div className="flex items-center justify-center">
                                        {auditType ? (
                                          <Badge variant="secondary">
                                            {auditType}
                                          </Badge>
                                        ) : (
                                          '--'
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  );
                }

                let analysisAgentComponent;

                if (
                  message?.tool_call?.name ===
                  ToolFunctionName.MARKET_ANALYSIS_AGENT
                ) {
                  const tokenDetail =
                    message?.tool_call?.response?.token_detail;
                  const analyzed = message?.tool_call?.response?.analyzed;

                  if (!message?.tool_call?.response?.analyzed) {
                    return (
                      <>
                        {Array.isArray(
                          message?.tool_call?.response?.token_selection,
                        ) &&
                          message?.tool_call?.response?.token_selection
                            .length && (
                            <div className="mb-5 rounded-lg border border-solid border-[#494949] p-4">
                              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                                {message?.tool_call?.response?.token_selection.map(
                                  (item: Record<string, any>) => {
                                    return (
                                      <div
                                        key={`message-swap-detail-${message.id}-${item?.address}`}
                                        className="flex flex-col justify-between gap-3 rounded-xl border border-[#494949] bg-[#181818] p-4"
                                      >
                                        <div className="items-center-center flex gap-3.5">
                                          <Avatar className="size-12 rounded-xl">
                                            <AvatarImage
                                              className="rounded-xl object-cover"
                                              src={item?.logo}
                                            />
                                            <AvatarFallback className="rounded-xl">
                                              {item?.symbol
                                                ?.at(0)
                                                ?.toUpperCase()}
                                            </AvatarFallback>
                                          </Avatar>
                                          <div className="flex flex-col justify-center">
                                            <p className="text-sm font-medium">
                                              {item?.name ?? ''}{' '}
                                              <span className="text-sm font-normal text-[#A3A3A3]">
                                                ({item?.symbol ?? ''})
                                              </span>
                                            </p>
                                            <div className="flex items-center gap-1">
                                              <p className="text-xs text-[#A3A3A3]">
                                                {truncateAddress(
                                                  item?.address ?? '',
                                                )}
                                              </p>
                                              <CopyButton
                                                text={item?.address ?? ''}
                                              />
                                            </div>
                                          </div>
                                        </div>

                                        <Button
                                          className=""
                                          onClick={() =>
                                            handleSend(item?.address ?? '')
                                          }
                                        >
                                          Check
                                        </Button>
                                      </div>
                                    );
                                  },
                                )}
                              </div>
                            </div>
                          )}
                      </>
                    );
                  }

                  return (
                    <div className="mb-5 rounded-lg border border-solid border-[#494949] p-4">
                      {Object.keys(analyzed?.decisions).map((id) => (
                        <>
                          <div className="border-b border-solid border-b-[#494949]">
                            <div className="flex w-full flex-row flex-wrap items-center gap-3 px-2 py-3 sm:flex-nowrap">
                              <div className="flex w-full gap-3.5 border-solid border-r-[#494949] pr-5 sm:items-center sm:border-r">
                                <Avatar className="size-12 rounded-xl">
                                  <AvatarImage
                                    className="rounded-xl object-cover"
                                    src={tokenDetail?.logo}
                                  />
                                  <AvatarFallback className="rounded-xl">
                                    {tokenDetail?.token_address
                                      ?.at(0)
                                      ?.toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>

                                <div className="w-full">
                                  <div className="flex flex-wrap justify-between">
                                    <div className="flex items-center">
                                      <h4 className="truncate text-sm text-white">
                                        {tokenDetail?.name}
                                        <span className="text-xs text-[#8C8C8C]">
                                          ({tokenDetail?.symbol})
                                        </span>
                                      </h4>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <p className="text-xs text-[#A3A3A3]">
                                      {truncateAddress(
                                        tokenDetail?.token_address,
                                      )}
                                    </p>
                                    <CopyButton
                                      text={tokenDetail?.address ?? ''}
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="flex w-full flex-row justify-between sm:pl-5">
                                <div className="mt-1 flex flex-col gap-1">
                                  <p className="text-xs text-[#8C8C8C]">
                                    Action:
                                  </p>
                                  <p
                                    className={`text-sm uppercase ${analyzed?.decisions?.[id]?.action === 'buy' ? 'text-[#43C334]' : analyzed?.decisions?.[id]?.action === 'sell' ? 'text-[##FF0000]' : 'text-[#8C8C8C]'}`}
                                  >
                                    {analyzed?.decisions?.[id]?.action}
                                  </p>
                                </div>

                                <div className="mt-1 flex flex-col gap-1">
                                  <p className="text-xs text-[#8C8C8C]">
                                    Confidence:
                                  </p>
                                  <p className="text-sm text-white">
                                    {analyzed?.decisions?.[id]?.confidence
                                      ? Math.round(
                                          analyzed?.decisions?.[id]?.confidence,
                                        )
                                      : 0}
                                    %
                                  </p>
                                </div>
                                <div className="mt-1 flex flex-col gap-1">
                                  <p className="text-xs text-[#8C8C8C]">
                                    Price:
                                  </p>
                                  <p className="text-sm text-white">
                                    $
                                    {abbrNum({
                                      number: Number(
                                        tokenDetail?.price ||
                                          tokenDetail?.usd_price ||
                                          0,
                                      ),
                                      decPlaces: 3,
                                      formatType: 'currency',
                                      minPlaces: 1e6,
                                    })}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col">
                            <div key={id}>
                              <div className="mt-3 grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
                                {ANALYST_STATUS.map((obj) => {
                                  const status =
                                    analyzed?.analyst_signals?.[obj.key]?.[id]
                                      ?.signal;
                                  const confidence =
                                    analyzed?.analyst_signals?.[obj.key]?.[id]
                                      ?.confidence || 0;
                                  const candleTimeFrame =
                                    analyzed?.analyst_signals?.[obj.key]?.[id]
                                      ?.candle_timeframe || null;

                                  if (!status) return <></>;

                                  return (
                                    <div
                                      className="flex w-full flex-col items-center justify-center gap-2 rounded-lg bg-[#181818] p-4"
                                      key={obj.key}
                                    >
                                      <div className="flex items-center">
                                        {obj.key ===
                                        'technical_analyst_agent' ? (
                                          <div className="flex w-full max-w-fit items-end gap-1 text-center">
                                            <p className="text-sm text-white">
                                              {obj.label}
                                            </p>
                                            {candleTimeFrame && (
                                              <TooltipProvider
                                                delayDuration={0}
                                              >
                                                <ToolTipShadcn>
                                                  <TooltipTrigger asChild>
                                                    <div className="flex cursor-pointer items-center gap-1">
                                                      <p className="cursor-pointer text-[10px] text-[#8C8C8C]">
                                                        ({candleTimeFrame})
                                                      </p>
                                                      <InfoCircledIcon
                                                        width={16}
                                                        height={16}
                                                        color="#8C8C8C"
                                                      />
                                                    </div>
                                                  </TooltipTrigger>
                                                  <TooltipContent
                                                    className="max-w-[280px] bg-[#181818]"
                                                    side="right"
                                                  >
                                                    <p className="cursor-pointer text-[10px] text-white">
                                                      Our analysis considers at
                                                      least the last 200
                                                      candles, depending on the
                                                      token's age. If the token
                                                      is new, we analyze all
                                                      available historical data
                                                      to ensure accuracy.
                                                    </p>
                                                  </TooltipContent>
                                                </ToolTipShadcn>
                                              </TooltipProvider>
                                            )}
                                          </div>
                                        ) : (
                                          <p className="w-full max-w-fit text-center text-sm text-white">
                                            {obj.label}
                                          </p>
                                        )}
                                      </div>

                                      <CircularProgressbarWithChildren
                                        strokeWidth={4}
                                        value={Math.round(confidence)}
                                        className="w-[120px] items-center justify-center"
                                        styles={buildStyles({
                                          pathColor:
                                            AnalystStatus.NEUTRAL === status
                                              ? '#8C8C8C'
                                              : AnalystStatus.BULLISH === status
                                                ? '#43C334'
                                                : AnalystStatus.BEARISH ===
                                                    status
                                                  ? '#FF0000'
                                                  : '#8C8C8C',
                                          trailColor: '#374151',
                                        })}
                                      >
                                        <div className="flex w-full flex-col items-center justify-center gap-1">
                                          <p className="w-full max-w-[40px] text-center text-lg text-white">
                                            {Math.round(confidence)}%
                                          </p>

                                          <div
                                            className="flex w-full max-w-fit items-center justify-center rounded-md bg-[#1F1F1F] px-2 py-0.5 text-[10px] uppercase"
                                            style={{
                                              color:
                                                AnalystStatus.NEUTRAL === status
                                                  ? '#8C8C8C'
                                                  : AnalystStatus.BULLISH ===
                                                      status
                                                    ? '#43C334'
                                                    : AnalystStatus.BEARISH ===
                                                        status
                                                      ? '##FF0000'
                                                      : '#8C8C8C',
                                            }}
                                          >
                                            {status}
                                          </div>
                                        </div>
                                      </CircularProgressbarWithChildren>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>

                          {tokenDetail?.token_address && (
                            <div
                              id="dexscreener-embed"
                              className="relative mt-3"
                            >
                              <iframe
                                style={{
                                  width: '100%',
                                  height: '500px',
                                  border: 'none',
                                }}
                                src={`https://dexscreener.com/bsc/${tokenDetail?.token_address}?embed=1&loadChartSettings=0&trades=0&tabs=0&info=0&chartLeftToolbar=0&chartDefaultOnMobile=1&chartTheme=dark&theme=dark&chartStyle=1&chartType=usd&interval=15`}
                              />
                              <div
                                className="absolute top-0 right-0 left-0 z-[110] h-[38px] bg-[#000]"
                                style={{
                                  top: 460,
                                }}
                              />
                            </div>
                          )}

                          <div className="flex flex-col">
                            <div>
                              <p className="mt-2 py-1 text-xs text-[#8C8C8C]">
                                Reasoning:
                              </p>
                              <p className="text-sm text-white">
                                {analyzed?.decisions?.[id]?.reasoning}
                              </p>
                            </div>
                          </div>
                        </>
                      ))}
                    </div>
                  );
                }

                let transferNativeTokenComponent;

                if (
                  message?.tool_call?.name ===
                  ToolFunctionName.TRANSFER_NATIVE_TOKEN
                ) {
                  const amount = message?.tool_call?.arguments?.amount;

                  const receiveAddress =
                    message?.tool_call?.arguments?.receiveAddress;

                  transferNativeTokenComponent = (
                    <div className="mb-5 rounded-lg border border-solid border-[#494949] p-4">
                      {amount && receiveAddress && (
                        <div className="flex flex-col gap-5 rounded-xl border border-[#494949] bg-[#181818] p-4">
                          <p className="text-lg font-bold">
                            Preview Transfer Detail
                          </p>
                          <div className="relative flex flex-row gap-3">
                            <div className="flex flex-1 items-center justify-center rounded-xl bg-[#494949] px-4 py-2">
                              <p className="text-lg font-bold">
                                {abbrNum({
                                  number: amount,
                                  decPlaces: 6,
                                  formatType: 'number',
                                  minPlaces: 1e6,
                                })}{' '}
                                BNB
                              </p>
                            </div>
                            <div className="flex flex-1 items-center justify-center rounded-xl bg-[#494949] px-4 py-2">
                              <p className="text-lg font-bold">
                                {truncateAddress(receiveAddress)}
                              </p>
                            </div>
                            <div className="absolute top-1/2 left-1/2 w-fit -translate-1/2 rounded-full bg-[#696969]">
                              <ArrowRight />
                            </div>
                          </div>
                          <Button
                            onClick={() => {
                              handleTransfer({
                                receiveAddress: receiveAddress,
                                amount: amount,
                              });
                            }}
                          >
                            Confirm
                          </Button>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <div
                    key={`message-item-${message.id || index}`}
                    className={cn({
                      'self-end': message.role === 'user',
                      'max-w-[80%]':
                        message.role === 'user' || !message?.tool_call,
                    })}
                  >
                    {message.role !== 'user' && (
                      <>
                        {trendingComponent}
                        {tokenInfoComponent}
                        {swapTokenComponent}
                        {socialMentionComponent}
                        {tokenHoldersComponent}
                        {socialKOLComponent}
                        {devCheckComponent}
                        {analysisAgentComponent}
                        {transferNativeTokenComponent}
                      </>
                    )}

                    {message?.tool_call?.name !==
                      ToolFunctionName.GET_TRENDING_TOKENS && (
                      <>
                        <div
                          className={cn(
                            'flex w-fit items-center gap-2 rounded-xl rounded-tl-none bg-[#181818] px-4 py-3',
                            {
                              'bg-foreground self-end rounded-tl-xl rounded-tr-none':
                                message.role === 'user',
                            },
                          )}
                        >
                          <article
                            className={cn(
                              'markdown prose dark:prose-invert text-sm break-words',
                              {
                                'text-[#C0C0C0]': message.role === 'assistant',
                                'text-[#494949]': message.role === 'user',
                              },
                            )}
                          >
                            <Markdown
                            // remarkPlugins={[remarkHtml]}
                            // rehypePlugins={[rehypeKatex]}
                            >
                              {message.content}
                            </Markdown>
                          </article>
                          {message.role !== 'user' &&
                            message?.tool_call?.name ===
                              ToolFunctionName.ERROR && (
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => {
                                  const prevMessage =
                                    currentMessages?.[index - 1]?.content;

                                  if (prevMessage) handleSend(prevMessage);
                                }}
                              >
                                <RotateCcw />
                              </Button>
                            )}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
              <div ref={endMessageRef} />

              {isSendMessagePending && (
                <div className="mr-auto ml-0 rounded-xl bg-[#181818] p-2">
                  <TypingLoading />
                </div>
              )}
            </div>
          </>
        )}

        <div
          className={cn(
            'relative min-h-40 overflow-hidden rounded-xl pb-4 transition-colors',
          )}
        >
          <Textarea
            placeholder="Start a new conversation..."
            className={cn(
              'min-h-36 rounded-xl bg-[#494949] p-4 pb-14 text-[#A3A3A3] shadow-lg focus-visible:ring-0',
              {
                'shadow-md': !!currentMessages.length,
              },
            )}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSend();
              }
            }}
            // onPaste={handlePaste}
            disabled={isSendMessagePending}
          />

          <div className="absolute right-4 bottom-8 left-4 flex items-center justify-between gap-1">
            <p className="text-xs break-words text-[#A3A3A3]">
              Type / to search for saved prompts (e.g /Binance Smart Chain
              Price...)
            </p>

            <Button
              className="text-foreground relative size-9 rounded-xl bg-[#515151] hover:bg-[#848484]"
              onClick={() => handleSend()}
              disabled={!text || isSendMessagePending}
            >
              {isSendMessagePending ? (
                <Loader2 className="!size-6 animate-spin text-[#A3A3A3]" />
              ) : (
                <ArrowRight
                  strokeWidth={3}
                  className="!size-6 text-[#A3A3A3]"
                />
              )}
            </Button>
          </div>
        </div>

        {!currentMessages.length && (
          <>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <p className="text-sm font-semibold text-[#848484]">
                  Suggestions
                </p>
                <div className="grid grid-cols-2 gap-5">
                  {DEFAULT_SUGGESTIONS.map((s, index) => {
                    return (
                      <div
                        key={`suggestion-item-${index}`}
                        className="cursor-pointer rounded-xl bg-[#181818] p-4 transition-all hover:bg-[#5c5c5c]"
                        onClick={() => {
                          if (!handleSendMessage) return;
                          handleSendMessage(s.title);
                        }}
                      >
                        <p className="text-sm font-medium">{s.title}</p>
                        <p className="text-xs text-[#A3A3A3]">
                          {s.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-sm font-semibold text-[#848484]">
                  Integrations
                </p>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      icon: BSCIcon,
                    },
                    {
                      icon: ElizaIcon,
                    },
                    {
                      icon: OpenAIIcon,
                    },
                    {
                      icon: GmgnIcon,
                    },
                    {
                      icon: ClaudeIcon,
                    },
                    {
                      icon: GeminiIcon,
                    },
                    {
                      icon: GrokIcon,
                    },
                    {
                      icon: DeepseekIcon,
                    },
                    {
                      icon: DexScreenerIcon,
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={cn(
                        'relative flex items-center justify-center rounded-md bg-[#181818] p-6',
                      )}
                    >
                      <img
                        src={item.icon}
                        alt="icon"
                        className="flex items-center justify-center"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* <div className="pb-4">
              <div>
                <div className="flex flex-col gap-3">
                  <p className="text-sm font-semibold text-[#848484]">
                    Integrations
                  </p>
                  <div className="grid grid-cols-2 gap-5">
                    {DEFAULT_INTEGRATIONS.map((s, index) => {
                      return (
                        <div
                          key={`suggestion-item-${index}`}
                          className="flex cursor-pointer items-center gap-4 rounded-xl bg-[#181818] p-4 transition-all hover:bg-[#5c5c5c]"
                        >
                          <div className="size-8 min-w-8 rounded-lg bg-blue-500"></div>
                          <div>
                            <p className="text-sm font-medium">{s.title}</p>
                            <p className="text-xs text-[#A3A3A3]">
                              {s.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div> */}
          </>
        )}
      </div>
    </div>
  );
};

const CommonConversation: FC<ReceivedProps> = (props) => (
  <CommonConversationLayout {...useCommonConversation(props)} />
);

export default CommonConversation;
