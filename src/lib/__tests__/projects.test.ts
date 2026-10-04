import { describe, it, expect } from "vitest";
import { mapStore, getRawStoreImage } from "../projects";

const base = {
  id: "s1",
  name: "Tienda",
  url: "https://t.example",
  logo: null,
  heroImage: null,
  description: null,
};

describe("mapStore (imágenes de las tiendas)", () => {
  it("un logo base64 NO se incrusta: se sirve como archivo /stores/<id>.webp", () => {
    const dataUri = "data:image/png;base64,iVBORw0KGgo=";
    const store = mapStore({ ...base, id: "a1", logo: dataUri });
    expect(store.image).toBe("/stores/a1.webp");
    expect(store.image).not.toContain("base64");
    expect(getRawStoreImage("a1")).toBe(dataUri); // el original queda para el endpoint que lo optimiza
  });

  it("un logo remoto (URL) también se sirve desde el propio sitio", () => {
    const store = mapStore({
      ...base,
      id: "b2",
      logo: "https://encrypted-tbn0.gstatic.com/x.jpg",
    });
    expect(store.image).toBe("/stores/b2.webp");
    expect(getRawStoreImage("b2")).toBe(
      "https://encrypted-tbn0.gstatic.com/x.jpg",
    );
  });

  it("sin logo usa heroImage; sin ninguna imagen, la ilustración del estudio", () => {
    expect(
      mapStore({ ...base, id: "c3", heroImage: "https://cdn.example/h.jpg" })
        .image,
    ).toBe("/stores/c3.webp");
    const none = mapStore({ ...base, id: "d4" });
    expect(none.image).toBe("/images/hero-light.webp");
    expect(getRawStoreImage("d4")).toBeUndefined();
  });
});
