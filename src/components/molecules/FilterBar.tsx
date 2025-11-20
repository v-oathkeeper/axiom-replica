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
        <TabsList className="grid w-full grid-cols-4 md:w-auto bg-muted/50 border border-border/50">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="new">New Pairs</TabsTrigger>
          <TabsTrigger value="final-stretch">Final Stretch</TabsTrigger>
          <TabsTrigger value="migrated">Migrated</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {/* add a search bar or other controls here later */}
    </div>
  );
};