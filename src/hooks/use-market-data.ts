import { useState, useEffect, useCallback } from "react";
import type { CryptoData, MarketOverview, FearGreedData } from "@/types";

const COINGECKO_API = "https://api.coingecko.com/api/v3";

export function useMarketData() {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [marketOverview, setMarketOverview] = useState<MarketOverview | null>(null);
  const [fearGreed, setFearGreed] = useState<FearGreedData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<number>(Date.now());

  const fetchCryptoData = useCallback(async () => {
    try {
      const response = await fetch(
        `${COINGECKO_API}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=24h`
      );

      if (!response.ok) throw new Error("Failed to fetch crypto data");

      const data = await response.json();
      setCryptoData(data);
      setLastUpdate(Date.now());
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setCryptoData(getMockCryptoData());
    }
  }, []);

  const fetchMarketOverview = useCallback(async () => {
    try {
      const response = await fetch(`${COINGECKO_API}/global`);

      if (!response.ok) throw new Error("Failed to fetch market overview");

      const data = await response.json();
      const globalData = data.data;

      setMarketOverview({
        total_market_cap: globalData.total_market_cap.usd,
        total_volume: globalData.total_volume.usd,
        market_cap_change_percentage_24h: globalData.market_cap_change_percentage_24h_usd,
        btc_dominance: globalData.market_cap_percentage.btc,
        eth_dominance: globalData.market_cap_percentage.eth,
      });
    } catch (err) {
      setMarketOverview(getMockMarketOverview());
    }
  }, []);

  const fetchFearGreed = useCallback(async () => {
    try {
      const response = await fetch("https://api.alternative.me/fng/?limit=1");

      if (!response.ok) throw new Error("Failed to fetch fear & greed");

      const data = await response.json();
      if (data.data && data.data.length > 0) {
        setFearGreed({
          value: parseInt(data.data[0].value),
          value_classification: data.data[0].value_classification,
          timestamp: data.data[0].timestamp,
        });
      }
    } catch (err) {
      setFearGreed(getMockFearGreed());
    }
  }, []);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    await Promise.all([fetchCryptoData(), fetchMarketOverview(), fetchFearGreed()]);
    setLoading(false);
  }, [fetchCryptoData, fetchMarketOverview, fetchFearGreed]);

  useEffect(() => {
    fetchAll();
    const interval = setInterval(fetchAll, 60000);
    return () => clearInterval(interval);
  }, [fetchAll]);

  const getCoinData = useCallback(
    (symbol: string) => {
      return cryptoData.find(
        (coin) => coin.symbol.toLowerCase() === symbol.toLowerCase()
      );
    },
    [cryptoData]
  );

  const getTopGainers = useCallback(
    (limit = 5) => {
      return [...cryptoData]
        .filter((coin) => coin.price_change_percentage_24h > 0)
        .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
        .slice(0, limit);
    },
    [cryptoData]
  );

  const getTopLosers = useCallback(
    (limit = 5) => {
      return [...cryptoData]
        .filter((coin) => coin.price_change_percentage_24h < 0)
        .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
        .slice(0, limit);
    },
    [cryptoData]
  );

  const getAISector = useCallback(
    (limit = 5) => {
      const aiCoins = ["near", "rndr", "tao", "grt", "fet", "agix", "ocean", "phb"];
      return cryptoData
        .filter((coin) => aiCoins.includes(coin.symbol.toLowerCase()))
        .slice(0, limit);
    },
    [cryptoData]
  );

  const getLayer1 = useCallback(
    (limit = 5) => {
      const l1Coins = ["btc", "eth", "sol", "avax", "dot", "ada", "bnb"];
      return cryptoData
        .filter((coin) => l1Coins.includes(coin.symbol.toLowerCase()))
        .slice(0, limit);
    },
    [cryptoData]
  );

  const getLayer2 = useCallback(
    (limit = 5) => {
      const l2Coins = ["matic", "arb", "op", "imx", "manta"];
      return cryptoData
        .filter((coin) => l2Coins.includes(coin.symbol.toLowerCase()))
        .slice(0, limit);
    },
    [cryptoData]
  );

  return {
    cryptoData,
    marketOverview,
    fearGreed,
    loading,
    error,
    lastUpdate,
    refresh: fetchAll,
    getCoinData,
    getTopGainers,
    getTopLosers,
    getAISector,
    getLayer1,
    getLayer2,
  };
}

function getMockCryptoData(): CryptoData[] {
  return [
    {
      id: "bitcoin",
      symbol: "btc",
      name: "Bitcoin",
      current_price: 64231.45,
      price_change_percentage_24h: 2.34,
      market_cap: 1265000000000,
      total_volume: 28900000000,
      image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
    },
    {
      id: "ethereum",
      symbol: "eth",
      name: "Ethereum",
      current_price: 3456.78,
      price_change_percentage_24h: 1.87,
      market_cap: 415000000000,
      total_volume: 15200000000,
      image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    },
    {
      id: "solana",
      symbol: "sol",
      name: "Solana",
      current_price: 142.56,
      price_change_percentage_24h: 5.23,
      market_cap: 63500000000,
      total_volume: 3200000000,
      image: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
    },
    {
      id: "cardano",
      symbol: "ada",
      name: "Cardano",
      current_price: 0.456,
      price_change_percentage_24h: -1.23,
      market_cap: 16200000000,
      total_volume: 450000000,
      image: "https://assets.coingecko.com/coins/images/975/large/cardano.png",
    },
    {
      id: "polkadot",
      symbol: "dot",
      name: "Polkadot",
      current_price: 7.23,
      price_change_percentage_24h: -2.45,
      market_cap: 10200000000,
      total_volume: 280000000,
      image: "https://assets.coingecko.com/coins/images/12171/large/polkadot.png",
    },
  ];
}

function getMockMarketOverview(): MarketOverview {
  return {
    total_market_cap: 2450000000000,
    total_volume: 89000000000,
    market_cap_change_percentage_24h: 1.45,
    btc_dominance: 51.2,
    eth_dominance: 16.8,
  };
}

function getMockFearGreed(): FearGreedData {
  return {
    value: 65,
    value_classification: "Greed",
    timestamp: Date.now().toString(),
  };
}