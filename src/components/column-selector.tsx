
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { ColumnVisibility } from "@/types/coin";

interface ColumnSelectorProps {
  visibility: ColumnVisibility;
  onVisibilityChange: (visibility: ColumnVisibility) => void;
}

export function ColumnSelector({ visibility, onVisibilityChange }: ColumnSelectorProps) {
  const toggleColumn = (column: keyof ColumnVisibility) => {
    onVisibilityChange({
      ...visibility,
      [column]: !visibility[column],
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuCheckboxItem
          checked={visibility.price}
          onCheckedChange={() => toggleColumn('price')}
        >
          Current Price
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={visibility['24h']}
          onCheckedChange={() => toggleColumn('24h')}
        >
          24h Change
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={visibility['7d']}
          onCheckedChange={() => toggleColumn('7d')}
        >
          7d Change
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={visibility['30d']}
          onCheckedChange={() => toggleColumn('30d')}
        >
          30d Change
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={visibility['1y']}
          onCheckedChange={() => toggleColumn('1y')}
        >
          1y Change
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={visibility.ath}
          onCheckedChange={() => toggleColumn('ath')}
        >
          ATH Change
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={visibility.atl}
          onCheckedChange={() => toggleColumn('atl')}
        >
          ATL Change
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
