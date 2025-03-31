export interface WalletBalanceResponse {
  native: number;
  native_usd: number;
}

export type WalletAssetsResponse = Array<WalletAsset>;
export interface WalletAsset {
  token: Token;
  balance: string;
  usd_value: string;
  realized_profit_30d: string;
  realized_profit: string;
  realized_pnl: string;
  realized_pnl_30d: string;
  unrealized_profit: string;
  unrealized_pnl: string;
  total_profit?: string;
  total_profit_pnl: string;
  avg_cost: string;
  avg_sold: string;
  buy_30d: number;
  sell_30d: number;
  sells: number;
  price: string;
  cost: string;
  position_percent: string;
  last_active_timestamp: number;
  history_sold_income: string;
  history_bought_cost: string;
  start_holding_at?: number;
  end_holding_at?: number;
  liquidity: string;
  wallet_token_tags?: string[];
}

export interface Token {
  address: string;
  token_address: string;
  symbol: string;
  name: string;
  decimals: number;
  logo: string;
  price_change_6h?: string;
  is_show_alert: boolean;
  is_honeypot?: boolean;
}
