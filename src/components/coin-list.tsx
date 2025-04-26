
import { Coin } from "@/types/coin";
import CoinRow from "./coin-row";
import { SkeletonCard } from "./ui/skeleton-card";
import { Grid2X2, Table } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface CoinListProps {
  coins: Coin[] | null;
  isLoading: boolean;
  error: string | null;
}

export default function CoinList({ coins, isLoading, error }: CoinListProps) {
  const [view, setView] = useState<"grid" | "table">("table");

  if (error) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-medium text-destructive">Error loading coins</h3>
        <p className="text-muted-foreground mt-1">{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array(10).fill(0).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (!coins || coins.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-medium">No cryptocurrencies found</h3>
        <p className="text-muted-foreground mt-1">Try adjusting your search criteria</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <div className="bg-card rounded-lg overflow-hidden inline-flex p-1">
          <Button 
            variant={view === "table" ? "default" : "ghost"}
            size="sm"
            onClick={() => setView("table")}
            aria-label="Table view"
            className="rounded-md"
          >
            <Table className="h-4 w-4" />
          </Button>
          <Button 
            variant={view === "grid" ? "default" : "ghost"} 
            size="sm"
            onClick={() => setView("grid")}
            aria-label="Grid view"
            className="rounded-md"
          >
            <Grid2X2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {coins.map((coin) => (
            <CoinRow key={coin.id} coin={coin} view="grid" />
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-muted-foreground text-sm">
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-right">Price</th>
                <th className="py-3 px-4 text-right">1y Change</th>
              </tr>
            </thead>
            <tbody>
              {coins.map((coin) => (
                <CoinRow key={coin.id} coin={coin} view="table" />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
