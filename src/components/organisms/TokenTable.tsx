import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { TokenRow } from "@/components/molecules/TokenRow";
import { TableSkeletonRow } from "@/components/molecules/TableSkeletonRow";
import { Token } from "@/types";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface TokenTableProps {
  data: Token[];
  isLoading: boolean;
  onTokenClick?: (token: Token) => void;
  // New Props for Sorting
  sortKey?: keyof Token;
  sortDirection?: "asc" | "desc";
  onSort?: (key: keyof Token) => void;
}

export const TokenTable = ({ 
  data, 
  isLoading, 
  onTokenClick,
  sortKey,
  sortDirection,
  onSort
}: TokenTableProps) => {

  // Helper to render a clickable header with icon
  const SortableHeader = ({ label, resultKey, className }: { label: string, resultKey: keyof Token, className?: string }) => {
    const isActive = sortKey === resultKey;
    
    return (
      <TableHead 
        className={cn("cursor-pointer hover:text-primary transition-colors select-none group", className)}
        onClick={() => onSort?.(resultKey)}
      >
        <div className={cn("flex items-center gap-1", className?.includes("text-right") && "justify-end")}>
          {label}
          {isActive ? (
            sortDirection === "asc" ? (
              <ArrowUp className="h-3 w-3 text-primary" />
            ) : (
              <ArrowDown className="h-3 w-3 text-primary" />
            )
          ) : (
            <ArrowUpDown className="h-3 w-3 opacity-0 group-hover:opacity-50 transition-opacity" />
          )}
        </div>
      </TableHead>
    );
  };

  return (
    <div className="rounded-md border border-border bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-border/50">
            {/* use helper component for each sortable column */}
            <TableHead className="w-[250px]">Token</TableHead> 
            
            <SortableHeader label="Price" resultKey="price" className="text-right" />
            <SortableHeader label="1h %" resultKey="priceChange1h" className="text-right" />
            <SortableHeader label="6h %" resultKey="priceChange6h" className="hidden md:table-cell text-right" />
            <SortableHeader label="Volume" resultKey="volume24h" className="hidden md:table-cell text-right" />
            <SortableHeader label="Liquidity" resultKey="liquidity" className="hidden lg:table-cell text-right" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <TableSkeletonRow key={i} />
            ))
          ) : data.length > 0 ? (
            data.map((token) => (
              <TokenRow 
                key={token.id} 
                token={token} 
                onClick={onTokenClick}
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                No tokens found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};