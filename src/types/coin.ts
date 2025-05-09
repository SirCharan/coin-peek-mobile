export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d_in_currency?: number;
  price_change_percentage_30d_in_currency?: number;
  price_change_percentage_1y_in_currency?: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  last_updated: string;
}

export interface CoinListResponse {
  coins: Coin[];
  error?: string;
}

export interface PaginationState {
  page: number;
  perPage: number;
  total?: number;
}

export interface SortOption {
  value: string;
  label: string;
  direction: 'asc' | 'desc';
}

export interface ColumnVisibility {
  price: boolean;
  '24h': boolean;
  '7d': boolean;
  '30d': boolean;
  '1y': boolean;
  'ath': boolean;
  'atl': boolean;
}
