
"use client";

import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Coin } from "@/types/coin";
import { getCoins, searchCoins } from "@/services/coinService";
import SearchBar from "@/components/search-bar";
import CoinList from "@/components/coin-list";
import Pagination from "@/components/pagination";
import { useToast } from "@/hooks/use-toast";

const COINS_PER_PAGE = 20;
const TOTAL_COINS = 100; // We're showing top 100 as per requirements
const TOTAL_PAGES = Math.ceil(TOTAL_COINS / COINS_PER_PAGE);

export default function Index() {
  const [coins, setCoins] = useState<Coin[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentPage = Number(searchParams.get("page")) || 1;
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        let result;

        if (searchQuery) {
          result = await searchCoins(searchQuery);
        } else {
          result = await getCoins(currentPage, COINS_PER_PAGE);
        }

        if (result.error) {
          throw new Error(result.error);
        }

        setCoins(result.data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to fetch cryptocurrency data";
        setError(errorMessage);
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentPage, searchQuery, toast]);

  return (
    <div className="min-h-screen pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Cryptocurrency Market</h1>
          <p className="text-muted-foreground">
            Top {TOTAL_COINS} cryptocurrencies by market capitalization
          </p>
        </div>

        <div className="mb-6">
          <SearchBar initialQuery={searchQuery} />
        </div>

        <CoinList 
          coins={coins} 
          isLoading={isLoading} 
          error={error} 
        />

        {!searchQuery && !error && !isLoading && (
          <Pagination currentPage={currentPage} totalPages={TOTAL_PAGES} />
        )}
      </div>
    </div>
  );
}
