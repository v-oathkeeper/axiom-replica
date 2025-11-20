// src/hooks/useTokenSocket.ts
import { useEffect, useState } from "react";
import { Token } from "@/types";

export const useTokenSocket = (initialData: Token[]) => {
  const [tokens, setTokens] = useState<Token[]>(initialData);

  useEffect(() => {
    // Simulate WebSocket connection opening
    const intervalId = setInterval(() => {
      setTokens((currentTokens) => {
        // Create a shallow copy to preserve immutability
        const newTokens = [...currentTokens];

        // Pick a random token index to update
        const randomIndex = Math.floor(Math.random() * newTokens.length);
        const token = newTokens[randomIndex];

        // Simulate random price movement (+/- 2%)
        const percentChange = (Math.random() * 4 - 2) / 100; 
        const newPrice = token.price * (1 + percentChange);

        // Update the token
        newTokens[randomIndex] = {
          ...token,
          price: newPrice,
          //  update the 1h change slightly to match movement
          priceChange1h: token.priceChange1h + (percentChange * 100),
        };

        return newTokens;
      });
    }, 2000); // Update every 2000ms 

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return tokens;
};