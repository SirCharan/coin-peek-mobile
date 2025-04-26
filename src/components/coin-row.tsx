
import { Coin, ColumnVisibility } from "@/types/coin";
import { cn } from "@/lib/utils";

interface CoinRowProps {
  coin: Coin;
  view: "grid" | "table";
  columnVisibility: ColumnVisibility;
}

export default function CoinRow({ coin, view, columnVisibility }: CoinRowProps) {
  const renderPriceChange = (change: number | undefined) => {
    if (typeof change !== 'number') return 'N/A';
    const isPositive = change > 0;
    return (
      <span className={cn(
        "inline-block text-sm font-medium rounded-md px-2 py-1",
        isPositive ? "bg-green-950/30 text-crypto-positive" : "bg-red-950/30 text-crypto-negative"
      )}>
        {isPositive ? '+' : ''}{change.toFixed(2)}%
      </span>
    );
  };

  if (view === "grid") {
    return (
      <div className="bg-card rounded-lg p-4 border border-border hover:border-accent transition-colors">
        <div className="flex items-center space-x-3 mb-3">
          <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
          <div className="flex flex-col">
            <h3 className="font-medium">{coin.name}</h3>
            <span className="text-xs text-muted-foreground uppercase">{coin.symbol}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          {columnVisibility.price && (
            <div className="text-lg font-semibold">
              ${coin.current_price.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 8
              })}
            </div>
          )}
          <div className="grid grid-cols-2 gap-2">
            {columnVisibility['24h'] && (
              <div>24h: {renderPriceChange(coin.price_change_percentage_24h)}</div>
            )}
            {columnVisibility['7d'] && (
              <div>7d: {renderPriceChange(coin.price_change_percentage_7d_in_currency)}</div>
            )}
            {columnVisibility['30d'] && (
              <div>30d: {renderPriceChange(coin.price_change_percentage_30d_in_currency)}</div>
            )}
            {columnVisibility['1y'] && (
              <div>1y: {renderPriceChange(coin.price_change_percentage_1y_in_currency)}</div>
            )}
            {columnVisibility.ath && (
              <div>ATH: {renderPriceChange(coin.ath_change_percentage)}</div>
            )}
            {columnVisibility.atl && (
              <div>ATL: {renderPriceChange(coin.atl_change_percentage)}</div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Table view
  return (
    <tr className="border-b border-border hover:bg-muted/50 transition-colors">
      <td className="py-3 px-4">
        <div className="flex items-center space-x-3">
          <img src={coin.image} alt={coin.name} className="w-6 h-6 rounded-full" />
          <div>
            <span className="font-medium">{coin.name}</span>
            <span className="text-xs text-muted-foreground ml-2 uppercase">{coin.symbol}</span>
          </div>
        </div>
      </td>
      {columnVisibility.price && (
        <td className="py-3 px-4 text-right font-medium">
          ${coin.current_price.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 8
          })}
        </td>
      )}
      {columnVisibility['24h'] && (
        <td className="py-3 px-4 text-right">
          {renderPriceChange(coin.price_change_percentage_24h)}
        </td>
      )}
      {columnVisibility['7d'] && (
        <td className="py-3 px-4 text-right">
          {renderPriceChange(coin.price_change_percentage_7d_in_currency)}
        </td>
      )}
      {columnVisibility['30d'] && (
        <td className="py-3 px-4 text-right">
          {renderPriceChange(coin.price_change_percentage_30d_in_currency)}
        </td>
      )}
      {columnVisibility['1y'] && (
        <td className="py-3 px-4 text-right">
          {renderPriceChange(coin.price_change_percentage_1y_in_currency)}
        </td>
      )}
      {columnVisibility.ath && (
        <td className="py-3 px-4 text-right">
          {renderPriceChange(coin.ath_change_percentage)}
        </td>
      )}
      {columnVisibility.atl && (
        <td className="py-3 px-4 text-right">
          {renderPriceChange(coin.atl_change_percentage)}
        </td>
      )}
    </tr>
  );
}
