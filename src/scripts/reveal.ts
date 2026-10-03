// Aparición suave de las secciones al hacer scroll.
// Mejora progresiva: sin JS, o con prefers-reduced-motion, todo se ve normal.
const SELECTOR = [
  "main > section:not(:first-of-type) .grid > *",
  "main > section:not(:first-of-type) .text-center.mb-12",
].join(", ");

const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

if (!reduceMotion && "IntersectionObserver" in window) {
  const items = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));
  const siblingIndex = new Map<Element, number>();
  items.forEach((el) => {
    const i = siblingIndex.get(el.parentElement!) ?? 0;
    siblingIndex.set(el.parentElement!, i + 1);
    el.style.transitionDelay = `${Math.min(i, 5) * 70}ms`;
    el.classList.add("reveal");
  });

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        el.classList.add("is-visible");
        observer.unobserve(el);
        // Al terminar, se quitan las clases para no pisar los hover/transition propios de cada tarjeta.
        window.setTimeout(() => {
          el.classList.remove("reveal", "is-visible");
          el.style.transitionDelay = "";
        }, 1200);
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
  );
  items.forEach((el) => observer.observe(el));
}
