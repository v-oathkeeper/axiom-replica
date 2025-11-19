import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface TokenAvatarProps {
  src: string;
  alt: string;
  fallback: string; // Usually the token symbol like "BTC"
  className?: string;
}

export const TokenAvatar = ({ src, alt, fallback, className }: TokenAvatarProps) => {
  return (
    <Avatar className={cn("h-8 w-8 border border-border/50", className)}>
      <AvatarImage src={src} alt={alt} className="object-cover" />
      {/* If image fails, show fallback with a subtle color */}
      <AvatarFallback className="bg-secondary text-[10px] font-bold text-secondary-foreground">
        {fallback.slice(0, 2).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};