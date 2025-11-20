import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell
} from "@/components/ui/table";
import { TokenRow } from "@/components/molecules/TokenRow";
import { TableSkeletonRow } from "@/components/molecules/TableSkeletonRow";
import { Token } from "@/types";

interface TokenTableProps {
  data: Token[];
  isLoading: boolean;
  onTokenClick?: (token: Token) => void;
}

export const TokenTable = ({ data, isLoading, onTokenClick }: TokenTableProps) => {
  return (
    <div className="rounded-md border border-border bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-border/50">
            <TableHead className="w-[250px]">Token</TableHead>
            <TableHead className="text-right cursor-pointer hover:text-primary transition-colors">Price</TableHead>
            <TableHead className="text-right">1h %</TableHead>
            <TableHead className="hidden md:table-cell text-right">6h %</TableHead>
            <TableHead className="hidden md:table-cell text-right">Volume</TableHead>
            <TableHead className="hidden lg:table-cell text-right">Liquidity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            // Render 5 skeleton rows while loading
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
            // Empty State
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