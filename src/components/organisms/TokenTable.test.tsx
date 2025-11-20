import { render, screen } from "@testing-library/react";
import { TokenTable } from "./TokenTable";
import { describe, it, expect } from "vitest";
import { Token } from "@/types";

const mockTokens: Token[] = [
  {
    id: "1",
    name: "Test Token",
    symbol: "TST",
    imageUrl: "",
    price: 1,
    priceChange5m: 0,
    priceChange1h: 0,
    priceChange6h: 0,
    volume24h: 0,
    liquidity: 0,
    marketCap: 0,
    txns: 0,
    buys: 0,
    sells: 0,
    createdAt: "",
    category: "new",
  }
];

describe("TokenTable Organism", () => {
  it("renders skeleton rows when loading", () => {
    const { container } = render(<TokenTable data={[]} isLoading={true} />);
    // check for the skeleton class logic or simply check that no "No tokens" text exists
    expect(screen.queryByText("No tokens found.")).not.toBeInTheDocument();
    // Expect multiple rows
    const rows = container.querySelectorAll("tr");
    // 1 header row + 5 skeleton rows = 6
    expect(rows.length).toBe(6);
  });

  it("renders data rows when loaded", () => {
    render(<TokenTable data={mockTokens} isLoading={false} />);
    expect(screen.getByText("Test Token")).toBeInTheDocument();
  });

  it("renders empty state message", () => {
    render(<TokenTable data={[]} isLoading={false} />);
    expect(screen.getByText("No tokens found.")).toBeInTheDocument();
  });
});