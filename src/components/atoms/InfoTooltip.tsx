import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface InfoTooltipProps {
  content: string;
}

export const InfoTooltip = ({ content }: InfoTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <Info className="h-3 w-3 text-muted-foreground hover:text-primary cursor-help transition-colors" />
        </TooltipTrigger>
        <TooltipContent className="bg-popover border-border text-popover-foreground">
          <p className="text-xs max-w-[200px]">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};