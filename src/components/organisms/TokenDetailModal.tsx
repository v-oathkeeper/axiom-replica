import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Token } from "@/types";
import { TokenAvatar } from "@/components/atoms/TokenAvatar";
import { PriceChangeBadge } from "@/components/atoms/PriceChangeBadge";
// import { formatDistanceToNow } from "date-fns";

interface TokenDetailModalProps {
  token: Token | null;
  isOpen: boolean;
  onClose: () => void;
}

export const TokenDetailModal = ({ token, isOpen, onClose }: TokenDetailModalProps) => {
  if (!token) return null;

  // Helper for currency
  const formatMoney = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  // Helper for numbers
  const formatNumber = (val: number) => 
    new Intl.NumberFormat('en-US').format(val);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px] bg-card border-border">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <TokenAvatar 
              src={token.imageUrl} 
              alt={token.name} 
              fallback={token.symbol} 
              className="h-12 w-12"
            />
            <div>
              <DialogTitle className="text-xl">{token.name}</DialogTitle>
              <DialogDescription className="text-muted-foreground font-mono">
                {token.symbol}
              </DialogDescription>
            </div>
            <div className="ml-auto text-right">
              <div className="text-lg font-bold text-foreground">
                ${token.price.toLocaleString()}
              </div>
              <PriceChangeBadge value={token.priceChange1h} type="percent" />
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-4">
          <DetailItem label="Market Cap" value={formatMoney(token.marketCap)} />
          <DetailItem label="Liquidity" value={formatMoney(token.liquidity)} />
          <DetailItem label="24h Volume" value={formatMoney(token.volume24h)} />
          <DetailItem label="Transactions" value={formatNumber(token.txns)} />
          <DetailItem label="Buys" value={formatNumber(token.buys)} className="text-green-500" />
          <DetailItem label="Sells" value={formatNumber(token.sells)} className="text-red-500" />
        </div>

        <div className="bg-muted/30 p-3 rounded-md border border-border/50">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Created</span>
            <span className="font-mono text-foreground">
              {/* Fallback if date-fns isn't installed yet */}
               {new Date(token.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="flex justify-between text-sm mt-2">
             <span className="text-muted-foreground">Contract Status</span>
             <span className="text-primary font-medium">Verified & Renounced</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Small helper sub-component
const DetailItem = ({ label, value, className }: { label: string, value: string, className?: string }) => (
  <div className="flex flex-col">
    <span className="text-xs text-muted-foreground uppercase tracking-wider">{label}</span>
    <span className={`font-medium text-lg ${className}`}>{value}</span>
  </div>
);