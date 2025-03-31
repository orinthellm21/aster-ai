export type TrendingResponse = Trending[];

export interface Trending {
  id: string;
  chain: string;
  address: string;
  symbol: string;
  logo: string;
  price: number;
  price_change_percent: number;
  swaps: number;
  volume: number;
  liquidity: number;
  market_cap: number;
  hot_level: number;
  pool_creation_timestamp: string;
  holder_count: number;
  twitter_username: string;
  website?: string;
  telegram?: string;
  total_supply: string;
  open_timestamp: string;
  price_change_percent1m: number;
  price_change_percent5m: number;
  price_change_percent1h: number;
  buys: number;
  sells: number;
  swaps_24h: any;
  initial_liquidity: number;
  is_show_alert: boolean;
  top_10_holder_rate: number;
  renounced_mint: number;
  renounced_freeze_account: number;
  burn_ratio: string;
  burn_status: string;
  launchpad_status: number;
  is_wash_trading: boolean;
  trending_timeframe: string;
  sort_criteria: string;
  createdAt: string;
  updatedAt: string;
}

export type SignalResponse = Signal[];

export interface Signal {
  id: string;
  ca: string;
  signal: null;
  reply_to_message_id: null;
  date: number;
  token_details: {
    logo: string;
    name: string;
    chain: string;
    price: number;
    social: {
      rug: {
        address: string;
        rug_ratio: string;
        rugged_tokens: null;
        holder_token_num: number;
        holder_rugged_num: number;
      };
      link: {
        gmgn: string;
        github: string;
        medium: string;
        reddit: string;
        tiktok: string;
        address: string;
        discord: string;
        website: string;
        youtube: string;
        facebook: string;
        linkedin: string;
        telegram: string;
        bitbucket: string;
        instagram: string;
        description: string;
        geckoterminal: string;
        verify_status: number;
        twitter_username: string;
      };
      vote: { like: number; unlike: number };
      address: string;
    };
    symbol: string;
    address: string;
    buy_tax: null;
    decimals: number;
    price_1h: number;
    sell_tax: null;
    swaps_1h: number;
    swaps_5m: number;
    swaps_6h: number;
    hot_level: number;
    liquidity: number;
    price_24h: number;
    renounced: null;
    swaps_24h: number;
    burn_ratio: string;
    volume_24h: number;
    burn_status: string;
    is_honeypot: null;
    total_supply: number;
    is_show_alert: boolean;
    renounced_mint: number;
    is_in_token_list: boolean;
    top_10_holder_rate: number;
    renounced_freeze_account: number;
  };
  createdAt: string;
  updatedAt: string;
}
