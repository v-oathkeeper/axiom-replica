import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Activity, Zap, BarChart3 } from "lucide-react";

export const MarketStatus = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 text-xs h-8 border-border/50 bg-card/50">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          Systems Normal
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-60 bg-card border-border p-0" align="end">
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none text-sm text-muted-foreground">Network Status</h4>
            <p className="text-xs text-muted-foreground">
              Real-time metrics for the Ethereum Mainnet.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-500" />
                <span>Gas Price</span>
              </div>
              <span className="font-mono">12 Gwei</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-primary" />
                <span>TPS</span>
              </div>
              <span className="font-mono">14.2</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-blue-500" />
                <span>Volume (24h)</span>
              </div>
              <span className="font-mono">$1.2B</span>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};