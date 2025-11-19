import { render, screen } from "@testing-library/react";
import { PriceChangeBadge } from "./PriceChangeBadge";
import { describe, it, expect } from "vitest";

describe("PriceChangeBadge Component", () => {
  it("formats price correctly", () => {
    render(<PriceChangeBadge value={1234.5678} type="price" />);
    // Expect currency formatting
    expect(screen.getByText("$1,234.5678")).toBeInTheDocument();
  });

  it("formats percentage correctly with positive sign", () => {
    render(<PriceChangeBadge value={5.2} type="percent" />);
    expect(screen.getByText("+5.20%")).toBeInTheDocument();
  });

  it("formats percentage correctly with negative sign", () => {
    render(<PriceChangeBadge value={-2.1} type="percent" />);
    expect(screen.getByText("-2.10%")).toBeInTheDocument();
  });
});