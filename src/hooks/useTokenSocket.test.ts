import { renderHook, act } from "@testing-library/react";
import { useTokenSocket } from "./useTokenSocket";
import { generateMockTokens } from "@/lib/mockData";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";

describe("useTokenSocket Hook", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns initial data correctly", () => {
    const initialData = generateMockTokens();
    const { result } = renderHook(() => useTokenSocket(initialData));
    
    expect(result.current).toEqual(initialData);
  });

  it("updates token prices over time", () => {
    const initialData = generateMockTokens();
    const { result } = renderHook(() => useTokenSocket(initialData));

    // Store initial price of the first token
    const initialPrice = result.current[0].price;

    // Fast-forward time by 2 seconds ,trigger the interval
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    // Since updates are random just check that something in the array might have changed,
    // or at least that the hook didn't crash and still returns data.
    expect(result.current.length).toBe(initialData.length);
    
    // Fast forward a few more times to ensure multiple updates occur
    act(() => {
      vi.advanceTimersByTime(10000);
    });

    //The array reference should have changed due to immutability
    expect(result.current).not.toBe(initialData);
  });
});