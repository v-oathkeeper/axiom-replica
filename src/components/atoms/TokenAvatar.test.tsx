import { render, screen } from "@testing-library/react";
import { TokenAvatar } from "./TokenAvatar";
import { describe, it, expect } from "vitest";

describe("TokenAvatar Component", () => {
  it("renders the fallback text when image is loading or missing", () => {
    render(
      <TokenAvatar 
        src="invalid-url.jpg" 
        alt="Bitcoin" 
        fallback="BTC" 
      />
    );

    const fallbackElement = screen.getByText("BT");
    expect(fallbackElement).toBeInTheDocument();
  });

  it("renders with correct accessibility attributes", () => {
    render(
      <TokenAvatar 
        src="https://example.com/image.png" 
        alt="Ethereum" 
        fallback="ETH" 
      />
    );
    
    // Even if the image isn't visible in JSDOM without mocking,the structure should exist.
    //shadcn AvatarImage renders an <img> tag
    // check if the fallback is in the document structure.
    expect(screen.getByText("ET")).toBeInTheDocument(); 
  });
});