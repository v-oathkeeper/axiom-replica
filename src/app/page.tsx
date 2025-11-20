"use client";

import React, { useEffect, useState, useMemo } from "react";
import { TokenTable } from "@/components/organisms/TokenTable";
import { FilterBar } from "@/components/molecules/FilterBar"; 
import { useTokenSocket } from "@/hooks/useTokenSocket";
import { generateMockTokens } from "@/lib/mockData";
import { Token } from "@/types";
import { Activity } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useDispatch } from "react-redux"; 
import { setSort } from "@/lib/features/filterSlice"; 
import { TokenDetailModal } from "@/components/organisms/TokenDetailModal";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [initialData, setInitialData] = useState<Token[]>([]);

  const [selectedToken, setSelectedToken] = useState<Token | null>(null);

  const dispatch = useDispatch(); // Initialize dispatch

  // Redux State
  const { category, sortKey, sortDirection } = useSelector((state: RootState) => state.filter);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialData(generateMockTokens());
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  

  const liveTokens = useTokenSocket(initialData);

  // MEMOIZED FILTERING & SORTING
  // This ensures we only re-calculate when data or filters change
  const processedTokens = useMemo(() => {
    let data = [...liveTokens];

    // Filter by Category
    if (category !== 'all') {
      data = data.filter((t) => t.category === category);
    }

    //  Sort
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
        
        {/* Header */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-primary">
            <Activity className="h-6 w-6 animate-pulse" />
            <span className="text-sm font-mono tracking-wider uppercase">Live Market Data</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Token Discovery
            <span className="text-primary">.</span>
          </h1>
        </div>

        {/* Controls */}
        <FilterBar />

        {/* Table */}
        <div className="border border-border/40 rounded-xl overflow-hidden bg-card/50 backdrop-blur-sm">
          <TokenTable 
            data={processedTokens} 
            isLoading={isLoading} 
            onTokenClick={(token) => setSelectedToken(token)}
            
            // Pass Sorting Props
            sortKey={sortKey}
            sortDirection={sortDirection}
            onSort={(key) => dispatch(setSort(key))}
          />
        </div>

      </div>

      <TokenDetailModal 
  token={selectedToken} 
  isOpen={!!selectedToken} 
  onClose={() => setSelectedToken(null)} 
      />
      
    </main>
  );
}