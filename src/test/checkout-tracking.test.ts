import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { handleCheckoutClick, trackCheckoutStart } from "@/routes/index";

const CHECKOUT = "https://pay.cakto.com.br/uio4pcd_1304273";

function clickEvent(init: Partial<React.MouseEvent<HTMLAnchorElement>> = {}) {
  const preventDefault = vi.fn();
  return {
    event: {
      defaultPrevented: false,
      button: 0,
      metaKey: false,
      ctrlKey: false,
      shiftKey: false,
      altKey: false,
      preventDefault,
      ...init,
    } as unknown as React.MouseEvent<HTMLAnchorElement>,
    preventDefault,
  };
}

describe("Checkout tracking", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    window.fbq = vi.fn();
    // jsdom's real location can't be assigned; swap in a writable stand-in.
    Object.defineProperty(window, "location", {
      configurable: true,
      writable: true,
      value: { href: "" },
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    delete window.fbq;
  });

  it("sends InitiateCheckout with the R$29,90 offer price when a buy button is clicked", () => {
    const { event, preventDefault } = clickEvent();

    handleCheckoutClick(event);

    expect(window.fbq).toHaveBeenCalledWith("track", "InitiateCheckout", {
      value: 29.9,
      currency: "BRL",
      content_name: "Caderninho de Receitas da Vovó Dita para Air Fryer",
      content_type: "product",
      num_items: 1,
    });
    expect(preventDefault).toHaveBeenCalled();
    expect(window.location.href).toBe("");
  });

  it("opens the Cakto checkout only after the event has been sent", () => {
    const { event } = clickEvent();

    handleCheckoutClick(event);
    expect(window.location.href).toBe("");

    vi.advanceTimersByTime(250);
    expect(window.location.href).toBe(CHECKOUT);
  });

  it("keeps the purchase working when the pixel is missing", () => {
    delete window.fbq;
    const { event } = clickEvent();

    expect(() => trackCheckoutStart()).not.toThrow();
    handleCheckoutClick(event);
    vi.advanceTimersByTime(250);

    expect(window.location.href).toBe(CHECKOUT);
  });

  it("does not hijack ctrl+click so the buyer can open checkout in a new tab", () => {
    const { event, preventDefault } = clickEvent({ ctrlKey: true });

    handleCheckoutClick(event);

    expect(window.fbq).toHaveBeenCalledWith("track", "InitiateCheckout", expect.objectContaining({ value: 29.9, currency: "BRL" }));
    expect(preventDefault).not.toHaveBeenCalled();
    expect(window.location.href).toBe("");
  });
});
