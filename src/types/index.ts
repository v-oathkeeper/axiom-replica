

export type TokenCategory = 'new' | 'final-stretch' | 'migrated';

export interface Token {
  id: string;
  name: string;
  symbol: string;
  imageUrl: string;
  price: number;
  priceChange5m: number; // Percentage change
  priceChange1h: number;
  priceChange6h: number;
  volume24h: number;
  liquidity: number;
  marketCap: number;
  txns: number; // Total transactions
  buys: number;
  sells: number;
  createdAt: string; // ISO Date string
  category: TokenCategory;
}

export interface SortConfig {
  key: keyof Token;
  direction: 'asc' | 'desc';
}