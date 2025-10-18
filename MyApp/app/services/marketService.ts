import { Platform } from 'react-native';

export type GseQuote = {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
};

const BASE_URL = (process.env.EXPO_PUBLIC_GSE_API_BASE_URL ?? 'https://dev.kwayisi.org/apis/gse').replace(/\/$/, '');

export async function fetchMarketList(): Promise<GseQuote[]> {
  // Example endpoint; adjust mapping as needed when wiring official feed
  const res = await fetch(`${BASE_URL}/live`);
  if (!res.ok) throw new Error(`GSE fetch failed: ${res.status}`);
  const data = await res.json();
  // Normalize into GseQuote[] if API shape differs
  return (data?.data ?? data ?? []).map((row: any) => ({
    symbol: row.symbol ?? row.sym ?? row.ticker,
    price: Number(row.price ?? row.last ?? row.close ?? 0),
    change: Number(row.change ?? row.chg ?? 0),
    changePercent: Number(row.changePercent ?? row.pct ?? 0),
  }));
}

export async function fetchSymbolHistory(symbol: string, range: '1d'|'1w'|'1m'|'3m'|'1y'|'all' = '1m') {
  const res = await fetch(`${BASE_URL}/history/${encodeURIComponent(symbol)}?range=${range}`);
  if (!res.ok) throw new Error(`History fetch failed: ${res.status}`);
  const data = await res.json();
  return data;
}
