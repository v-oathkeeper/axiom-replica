import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { TokenAvatar } from "@/components/atoms/TokenAvatar";
import { PriceChangeBadge } from "@/components/atoms/PriceChangeBadge";
import { Token } from "@/types";

interface TokenRowProps {
  token: Token;
  onClick?: (token: Token) => void;
}

export const TokenRow = ({ token, onClick }: TokenRowProps) => {
  // Helper for large numbers (eg. Market Cap)
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(val);
  };

  return (
    <TableRow 
      className="cursor-pointer hover:bg-muted/50 transition-colors border-b border-border/40"
      onClick={() => onClick?.(token)}
    >
      {/* Token Info Column */}
      <TableCell className="font-medium">
        <div className="flex items-center gap-3">
          <TokenAvatar 
            src={token.imageUrl} 
            alt={token.name} 
            fallback={token.symbol} 
          />
          <div className="flex flex-col">
            <span className="text-sm font-bold text-foreground">
              {token.name}
            </span>
            <span className="text-xs text-muted-foreground">
              {token.symbol}
            </span>
          </div>
        </div>
      </TableCell>

      {/* Price Column */}
      <TableCell className="text-right">
        <PriceChangeBadge value={token.price} type="price" />
      </TableCell>

      {/* 1h Change */}
      <TableCell className="text-right">
        <PriceChangeBadge value={token.priceChange1h} type="percent" />
      </TableCell>

      {/* 6h Change */}
      <TableCell className="text-right hidden md:table-cell">
        <PriceChangeBadge value={token.priceChange6h} type="percent" />
      </TableCell>

      {/* Volume */}
      <TableCell className="text-right hidden md:table-cell text-muted-foreground">
        {formatCurrency(token.volume24h)}
      </TableCell>

       {/* Liquidity */}
      <TableCell className="text-right hidden lg:table-cell text-muted-foreground">
        {formatCurrency(token.liquidity)}
      </TableCell>
    </TableRow>
  );
};