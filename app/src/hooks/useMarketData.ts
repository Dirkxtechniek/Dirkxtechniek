import { useState, useEffect, useCallback } from 'react';

export interface Asset {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume?: string;
  marketCap?: string;
}

export interface MarketData {
  crypto: Asset[];
  stocks: Asset[];
  btcDominance: number;
  totalMarketCap: string;
  topGainers: Asset[];
  topLosers: Asset[];
}

const initialCryptoData: Asset[] = [
  { symbol: 'BTC', name: 'Bitcoin', price: 67420.50, change24h: 2.4, volume: '34.2B', marketCap: '1.32T' },
  { symbol: 'ETH', name: 'Ethereum', price: 3540.25, change24h: 1.8, volume: '18.5B', marketCap: '425B' },
  { symbol: 'SOL', name: 'Solana', price: 148.75, change24h: 4.1, volume: '4.2B', marketCap: '68B' },
  { symbol: 'AVAX', name: 'Avalanche', price: 28.40, change24h: -1.2, volume: '890M', marketCap: '11B' },
  { symbol: 'ARB', name: 'Arbitrum', price: 0.85, change24h: 3.5, volume: '245M', marketCap: '2.8B' },
  { symbol: 'OP', name: 'Optimism', price: 1.45, change24h: -0.8, volume: '156M', marketCap: '1.5B' },
];

const initialStockData: Asset[] = [
  { symbol: 'SPX', name: 'S&P 500', price: 5980.25, change24h: 0.6, volume: '2.1B' },
  { symbol: 'NDX', name: 'Nasdaq 100', price: 21400.80, change24h: 0.8, volume: '4.5B' },
  { symbol: 'GLD', name: 'Gold', price: 2485.50, change24h: -0.2, volume: '12M' },
  { symbol: 'DXY', name: 'US Dollar Index', price: 103.25, change24h: 0.1, volume: '45K' },
  { symbol: 'TNX', name: '10Y Treasury', price: 4.25, change24h: -0.05, volume: '890K' },
  { symbol: 'VIX', name: 'Volatility Index', price: 14.8, change24h: -2.1, volume: '2.3M' },
];

export function useMarketData(): MarketData {
  const [marketData, setMarketData] = useState<MarketData>({
    crypto: initialCryptoData,
    stocks: initialStockData,
    btcDominance: 52.4,
    totalMarketCap: '2.48T',
    topGainers: [],
    topLosers: [],
  });

  const updatePrices = useCallback(() => {
    setMarketData(prev => {
      const updateAsset = (asset: Asset): Asset => {
        const volatility = asset.symbol === 'BTC' ? 0.002 : asset.symbol === 'ETH' ? 0.003 : 0.005;
        const change = (Math.random() - 0.5) * volatility;
        const newPrice = asset.price * (1 + change);
        const newChange24h = asset.change24h + (Math.random() - 0.5) * 0.1;
        
        return {
          ...asset,
          price: newPrice,
          change24h: parseFloat(newChange24h.toFixed(2)),
        };
      };

      const updatedCrypto = prev.crypto.map(updateAsset);
      const updatedStocks = prev.stocks.map(updateAsset);

      const allAssets = [...updatedCrypto, ...updatedStocks];
      const sortedByChange = [...allAssets].sort((a, b) => b.change24h - a.change24h);

      return {
        crypto: updatedCrypto,
        stocks: updatedStocks,
        btcDominance: prev.btcDominance + (Math.random() - 0.5) * 0.05,
        totalMarketCap: prev.totalMarketCap,
        topGainers: sortedByChange.slice(0, 3),
        topLosers: sortedByChange.slice(-3).reverse(),
      };
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(updatePrices, 3000);
    return () => clearInterval(interval);
  }, [updatePrices]);

  useEffect(() => {
    const allAssets = [...marketData.crypto, ...marketData.stocks];
    const sortedByChange = [...allAssets].sort((a, b) => b.change24h - a.change24h);
    
    setMarketData(prev => ({
      ...prev,
      topGainers: sortedByChange.slice(0, 3),
      topLosers: sortedByChange.slice(-3).reverse(),
    }));
  }, []);

  return marketData;
}
