import { render, screen, fireEvent } from "@testing-library/react";
import { TokenRow } from "./TokenRow";
import { describe, it, expect, vi } from "vitest";
import { Token } from "@/types";

// Mock data
const mockToken: Token = {
  id: "1",
  name: "Bitcoin",
  symbol: "BTC",
  imageUrl: "https://example.com/btc.png",
  price: 65000.50,
  priceChange5m: 0.1,
  priceChange1h: 1.5, // Positive
  priceChange6h: -0.5, // Negative
  volume24h: 1000000000,
  liquidity: 50000000,
  marketCap: 1200000000000,
  txns: 5000,
  buys: 2500,
  sells: 2500,
  createdAt: new Date().toISOString(),
  category: "new",
};

describe("TokenRow Component", () => {
  it("renders token information correctly", () => {
    render(
      <table>
        <tbody>
          <TokenRow token={mockToken} />
        </tbody>
      </table>
    );

    expect(screen.getByText("Bitcoin")).toBeInTheDocument();
    expect(screen.getByText("BTC")).toBeInTheDocument();
    // Check if price formatted correctly
    expect(screen.getByText("$65,000.50")).toBeInTheDocument();
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = vi.fn();
    render(
      <table>
        <tbody>
          <TokenRow token={mockToken} onClick={handleClick} />
        </tbody>
      </table>
    );

    const row = screen.getByRole("row");
    fireEvent.click(row);
    expect(handleClick).toHaveBeenCalledWith(mockToken);
  });
});