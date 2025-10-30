import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type WatchlistState = {
  symbols: string[];
  toggle: (symbol: string) => void;
  has: (symbol: string) => boolean;
};

export const useWatchlistStore = create<WatchlistState>()(
  persist(
    (set, get) => ({
      symbols: [],
      toggle: (symbol) => {
        const setSymbols = new Set(get().symbols);
        if (setSymbols.has(symbol)) setSymbols.delete(symbol);
        else setSymbols.add(symbol);
        set({ symbols: [...setSymbols].sort() });
      },
      has: (symbol) => get().symbols.includes(symbol),
    }),
    { name: 'watchlist' }
  )
);
