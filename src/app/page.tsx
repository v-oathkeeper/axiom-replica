"use client";

import React, { useEffect, useState } from "react";
import { TokenTable } from "@/components/organisms/TokenTable";
import { useTokenSocket } from "@/hooks/useTokenSocket";
import { generateMockTokens } from "@/lib/mockData";
import { Token } from "@/types";
import { Activity } from "lucide-react";

export default function Home() {
  //  State for loading and data
  const [isLoading, setIsLoading] = useState(true);
  const [initialData, setInitialData] = useState<Token[]>([]);

  //  Simulate Initial Data Fetching
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialData(generateMockTokens());
      setIsLoading(false);
    }, 1500); // 1.5 second delay to show off the skeleton

    return () => clearTimeout(timer);
  }, []);

  //  Hook up the "WebSocket" feed
  // pass initialData. If it's empty, the hook handles it gracefully.
  const liveTokens = useTokenSocket(initialData);

  return (
    <main className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-primary">
            <Activity className="h-6 w-6 animate-pulse" />
            <span className="text-sm font-mono tracking-wider uppercase">Live Market Data</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Token Discovery
            <span className="text-primary">.</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Real-time analysis of new pairs, final stretch tokens, and migrated assets.
            Monitor price action, volume, and liquidity with sub-second updates.
          </p>
        </div>

        {/* Main Table Section */}
        <div className="border border-border/40 rounded-xl overflow-hidden bg-card/50 backdrop-blur-sm">
           {/* pass 'liveTokens' (which updates) instead of 'initialData' */}
          <TokenTable 
            data={liveTokens} 
            isLoading={isLoading} 
            onTokenClick={(token) => console.log("Clicked:", token.name)} 
          />
        </div>

      </div>
    </main>
  );
}