---
target: "landing actual (localhost:4321, feat/fondos-y-azul)"
total_score: 21
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 3
target_identity: "file:/home/smondev/smondev-studio/webpage/src/pages/index.astro"
target_fingerprint: "sha256:3c47b9d9faab38047b2b17b046ca8b39430913864a522f60be1e45a68c57ecf9"
target_path: /home/smondev/smondev-studio/webpage/src/pages/index.astro
timestamp: 2026-10-03T01-26-48Z
slug: src-pages-index-astro
---

⚠️ DEGRADED: single-context (sub-agentes no lanzados: solo se usan cuando el usuario los pide; A hecha antes que B)

# Crítica de la landing (src/pages/index.astro)

Score: 21/32 (66 %, Aceptable). Heurísticas 7 y 10 n/a (Persuade).

## Problemas prioritarios

- [P1] Contraste del naranja sobre fondo claro (~2,5:1 en texto; ~2,8:1 texto blanco sobre botón). Fix: naranja oscuro para texto en modo claro. Comando: colorize.
- [P1] Tarjeta de precios: el precio a 5xl se parte en dos líneas; Enterprise dice "ARS Consultar /mes"; 8–9 viñetas por plan. Comando: layout, distill.
- [P1] Voz inconsistente: "Sobre mí" en plural/"startup" vs. primera persona del resto. Comando: clarify.
- [P2] Fondo aurora genérico; aprovechar el día/noche de las ilustraciones (cielo de día / noche estrellada); cambiar Inter. Comando: bolder.
- [P2] Móvil: imagen del hero empuja título y CTA; sin WhatsApp (falta número); se cargan ambas imágenes del hero (~2 MB c/u) y logo.png pesa 943 KB. Comando: adapt, optimize.

## Detector

- bounce-easing: Hero.astro:136 (animate-bounce)
- overused-font: Layout.astro:40 (Inter)

## Observaciones menores

- Indicador de scroll invisible: SVG con path inválido (falta la M).
- Badge naranja se ve marrón sobre azul en modo claro.
- Cortes horizontales marcados entre secciones.
- Punto pulsante del badge del hero (tic de IA).
- "Clientes": decisión del usuario de dejarlo; riesgo de credibilidad anotado.
