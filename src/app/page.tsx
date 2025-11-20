"use client";

import React, { useEffect, useState, useMemo } from "react";
import { TokenTable } from "@/components/organisms/TokenTable";
import { FilterBar } from "@/components/molecules/FilterBar";
import { TokenDetailModal } from "@/components/organisms/TokenDetailModal";
import { MarketStatus } from "@/components/molecules/MarketStatus"; 
import { useTokenSocket } from "@/hooks/useTokenSocket";
import { generateMockTokens } from "@/lib/mockData";
import { Token } from "@/types";
import { Activity } from "lucide-react";
import { useSelector, useDispatch } from "react-redux"; 
import { RootState } from "@/lib/store";
import { setSort } from "@/lib/features/filterSlice"; 

export default function Home() {
  //  Local State
  const [isLoading, setIsLoading] = useState(true);
  const [initialData, setInitialData] = useState<Token[]>([]);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);

  //  Redux State & Dispatch
  const dispatch = useDispatch(); 
  const { category, sortKey, sortDirection } = useSelector((state: RootState) => state.filter);

  //Simulate Initial Fetch
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialData(generateMockTokens());
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Connect Real-time Socket Hook
  const liveTokens = useTokenSocket(initialData);

  // memoized Filtering & Sorting Logic
  const processedTokens = useMemo(() => {
    let data = [...liveTokens];

    // Filter by Category
    if (category !== 'all') {
      data = data.filter((t) => t.category === category);
    }

    // Sort Data
    data.sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return data;
  }, [liveTokens, category, sortKey, sortDirection]);

  return (
    <main className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Section */}
        {/* Flex container to hold Title (Left) and Market Status (Right) */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-primary">
              <Activity className="h-6 w-6 animate-pulse" />
              <span className="text-sm font-mono tracking-wider uppercase">Live Market Data</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Token Discovery
              <span className="text-primary">.</span>
            </h1>
            <p className="text-muted-foreground max-w-xl text-sm md:text-base hidden md:block">
              Real-time analysis of new pairs, final stretch tokens, and migrated assets.
            </p>
          </div>
          
          {/* Market Status Popover Button */}
          <MarketStatus />
        </div>

        {/* Filter Control Tabs */}
        <FilterBar />

        {/* Main Data Table */}
        <div className="border border-border/40 rounded-xl overflow-x-auto bg-card/50 backdrop-blur-sm">
          <TokenTable 
            data={processedTokens} 
            isLoading={isLoading} 
            onTokenClick={(token) => setSelectedToken(token)}
            
            // Pass Sorting Props to Table
            sortKey={sortKey}
            sortDirection={sortDirection}
            onSort={(key) => dispatch(setSort(key))}
          />
        </div>

      </div>

      {/* Detail Modal (Hidden until a token is selected) */}
      <TokenDetailModal 
        token={selectedToken} 
        isOpen={!!selectedToken} 
        onClose={() => setSelectedToken(null)} 
      />
      
    </main>
  );
}