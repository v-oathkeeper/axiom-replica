import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { setCategory } from "@/lib/features/filterSlice";
import { TokenCategory } from "@/types";

export const FilterBar = () => {
  const dispatch = useDispatch();
  const currentCategory = useSelector((state: RootState) => state.filter.category);

  return (
    <div className="flex items-center justify-between pb-4">
      <Tabs 
        defaultValue="all" 
        value={currentCategory} 
        onValueChange={(val) => dispatch(setCategory(val as TokenCategory | 'all'))}
        className="w-full md:w-auto"
      >
        {/*justify-start and shrink-0 to triggers to prevent crushing */}
        <TabsList className="flex w-full justify-start overflow-x-auto md:grid md:grid-cols-4 md:w-auto bg-muted/50 border border-border/50 h-auto p-1 gap-1 no-scrollbar">
          <TabsTrigger value="all" className="shrink-0 min-w-[60px]">
            All
          </TabsTrigger>
          <TabsTrigger value="new" className="shrink-0 min-w-[90px]">
            New Pairs
          </TabsTrigger>
          <TabsTrigger value="final-stretch" className="shrink-0 min-w-[110px]">
            Final Stretch
          </TabsTrigger>
          <TabsTrigger value="migrated" className="shrink-0 min-w-[80px]">
            Migrated
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};