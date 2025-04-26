
import { Coin } from "@/types/coin";
import { cn } from "@/lib/utils";

interface CoinRowProps {
  coin: Coin;
  view: "grid" | "table";
}

export default function CoinRow({ coin, view }: CoinRowProps) {
  const priceChangePercent = coin.price_change_percentage_1y_in_currency;
  const isPositive = priceChangePercent && priceChangePercent > 0;

  if (view === "grid") {
    return (
      <div className="bg-card rounded-lg p-4 border border-border hover:border-accent transition-colors">
        <div className="flex items-center space-x-3 mb-3">
          <img 
            src={coin.image} 
            alt={coin.name} 
            className="w-8 h-8 rounded-full"
          />
          <div className="flex flex-col">
            <h3 className="font-medium">{coin.name}</h3>
            <span className="text-xs text-muted-foreground uppercase">{coin.symbol}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-end">
          <div>
            <div className="text-lg font-semibold">
              ${coin.current_price.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 8
              })}
            </div>
          </div>
          
          <div className={cn(
            "text-sm font-medium rounded-md px-2 py-1",
            isPositive ? "bg-green-950/30 text-crypto-positive" : "bg-red-950/30 text-crypto-negative"
          )}>
            {priceChangePercent 
              ? `${isPositive ? '+' : ''}${priceChangePercent.toFixed(2)}%` 
              : 'N/A'}
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
          <img 
            src={coin.image} 
            alt={coin.name} 
            className="w-6 h-6 rounded-full"
          />
          <div>
            <span className="font-medium">{coin.name}</span>
            <span className="text-xs text-muted-foreground ml-2 uppercase">{coin.symbol}</span>
          </div>
        </div>
      </td>
      <td className="py-3 px-4 text-right font-medium">
        ${coin.current_price.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 8
        })}
      </td>
      <td className="py-3 px-4 text-right">
        <span className={cn(
          "inline-block text-sm font-medium rounded-md px-2 py-1", 
          isPositive ? "bg-green-950/30 text-crypto-positive" : "bg-red-950/30 text-crypto-negative"
        )}>
          {priceChangePercent 
            ? `${isPositive ? '+' : ''}${priceChangePercent.toFixed(2)}%` 
            : 'N/A'}
        </span>
      </td>
    </tr>
  );
}
