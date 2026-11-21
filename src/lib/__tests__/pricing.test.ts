import { describe, it, expect } from "vitest";
import { pricingTiers, parsePrice } from "../pricing";

const tier = (name: string) => pricingTiers.find((t) => t.name === name)!;

describe("Pricing Tiers", () => {
  it("debe tener 3 tiers de precios", () => {
    expect(pricingTiers).toHaveLength(3);
  });

  it("Commerce es el único tier popular", () => {
    const popular = pricingTiers.filter((t) => t.popular);
    expect(popular).toHaveLength(1);
    expect(popular[0].name).toBe("Commerce");
  });

  it("precios vigentes de Starter y Commerce (ver PRICING_TIERS.md)", () => {
    expect(tier("Starter").price).toBe("50.000");
    expect(tier("Starter").setup).toBe("35.000");
    expect(tier("Commerce").price).toBe("80.000");
    expect(tier("Commerce").setup).toBe("60.000");
  });

  it("Commerce cuesta 30.000/mes más que Starter", () => {
    expect(
      parsePrice(tier("Commerce").price) - parsePrice(tier("Starter").price),
    ).toBe(30000);
  });

  it("Enterprise es a consultar y no está a la venta", () => {
    const e = tier("Enterprise");
    expect(e.priced).toBe(false);
    expect(e.comingSoon).toBe(true);
    expect(e.excluded).toHaveLength(0);
  });

  it("el alta de Commerce detalla qué incluye", () => {
    const text = tier("Commerce").setupIncludes?.join(" ") ?? "";
    expect(text).toContain("500 productos");
    expect(text).toContain("dominio");
  });

  it("la facturación AFIP siempre se muestra como beta", () => {
    for (const t of pricingTiers) {
      for (const f of t.features) {
        if (/AFIP/i.test(f)) expect(f).toMatch(/beta/i);
      }
    }
  });

  it("Promociones es solo de Commerce", () => {
    expect(tier("Commerce").features.join()).toMatch(/Promociones/);
    expect(tier("Starter").features.join()).not.toMatch(/Promociones/);
    expect(tier("Starter").excluded.join()).toMatch(/Promociones/);
  });

  it("cada tier tiene nombre, precio, setup, descripción y features", () => {
    for (const t of pricingTiers) {
      expect(t.name && t.price && t.description).toBeTruthy();
      expect(t.setup).toBeDefined();
      expect(t.features.length).toBeGreaterThan(0);
    }
  });
});
