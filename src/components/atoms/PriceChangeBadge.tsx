import React, { useEffect, useRef, useState } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface PriceChangeBadgeProps {
  value: number;
  type?: "price" | "percent";
  className?: string;
}

export const PriceChangeBadge = ({ value, type = "price", className }: PriceChangeBadgeProps) => {
  const [trend, setTrend] = useState<"up" | "down" | "neutral">("neutral");
  const prevValueRef = useRef<number>(value);

  useEffect(() => {
    // If value is the same, do nothing
    if (value === prevValueRef.current) return;

    // Determine direction
    const direction = value > prevValueRef.current ? "up" : "down";
    setTrend(direction);
    
    // Update ref
    prevValueRef.current = value;

    // Reset to neutral after 1 second (simulating the "flash" cooling down)
    const timer = setTimeout(() => {
      setTrend("neutral");
    }, 1000);

    return () => clearTimeout(timer);
  }, [value]);

  // Formatting logic
  const formattedValue = type === "price" 
    ? `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}`
    : `${value > 0 ? "+" : ""}${value.toFixed(2)}%`;

  // Dynamic Color Classes
  const colorClass = cn(
    "flex items-center gap-1 font-medium transition-colors duration-300 px-2 py-0.5 rounded",
    {
      // Green flash
      "text-green-400 bg-green-400/10": trend === "up",
      // Red flash
      "text-red-400 bg-red-400/10": trend === "down",
      // Neutral (default state depends on if it's +ve/-ve percentage, or just white for price)
      "text-green-500": trend === "neutral" && type === "percent" && value > 0,
      "text-red-500": trend === "neutral" && type === "percent" && value < 0,
      "text-foreground": trend === "neutral" && type === "price",
    },
    className
  );

  return (
    <div className={colorClass}>
      {/* Show arrow only for percentage views */}
      {type === "percent" && value > 0 && <ArrowUp className="h-3 w-3" />}
      {type === "percent" && value < 0 && <ArrowDown className="h-3 w-3" />}
      <span>{formattedValue}</span>
    </div>
  );
};