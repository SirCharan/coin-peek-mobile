import { Coin } from "@/types/coin";

const API_BASE_URL = "https://api.coingecko.com/api/v3";

export async function getCoins(
  page = 1, 
  perPage = 20, 
  currency = "usd", 
  sparkline = false
): Promise<{ data: Coin[] | null; error: string | null }> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=24h,7d,30d,1y`
    );

    if (!response.ok) {
      throw new Error(`Error fetching coin data: ${response.statusText}`);
    }

    const data: Coin[] = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error("Failed to fetch coin data:", error);
    return { 
      data: null, 
      error: error instanceof Error ? error.message : "Failed to fetch cryptocurrency data" 
    };
  }
}

export async function searchCoins(
  query: string, 
  currency = "usd"
): Promise<{ data: Coin[] | null; error: string | null }> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/search?query=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error(`Error searching coins: ${response.statusText}`);
    }

    const searchResults = await response.json();
    const coinIds = searchResults.coins.slice(0, 25).map((coin: any) => coin.id).join(',');

    if (!coinIds) {
      return { data: [], error: null };
    }

    const marketDataResponse = await fetch(
      `${API_BASE_URL}/coins/markets?vs_currency=${currency}&ids=${coinIds}&order=market_cap_desc&sparkline=false&price_change_percentage=24h,7d,30d,1y`
    );

    if (!marketDataResponse.ok) {
      throw new Error(`Error fetching market data: ${marketDataResponse.statusText}`);
    }

    const marketData: Coin[] = await marketDataResponse.json();
    return { data: marketData, error: null };
  } catch (error) {
    console.error("Failed to search coins:", error);
    return { 
      data: null, 
      error: error instanceof Error ? error.message : "Failed to search cryptocurrencies" 
    };
  }
}
