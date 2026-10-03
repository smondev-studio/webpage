---
target: "landing main + PR #8 (localhost:4321)"
total_score: 24
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 1
target_identity: "file:/home/smondev/smondev-studio/webpage/src/pages/index.astro"
target_fingerprint: "sha256:8e2e8527da0a0554142a10c4b949d8dd11fa278ac167182ca86ad7545450c475"
target_path: /home/smondev/smondev-studio/webpage/src/pages/index.astro
timestamp: 2026-10-03T23-27-10Z
slug: src-pages-index-astro
---

⚠️ DEGRADED: single-context (sub-agentes no lanzados: solo se usan cuando el usuario los pide)

# Crítica de la landing (src/pages/index.astro), 2ª corrida

Evaluado: main + PR #8 (tipografía y cortes). Score: 24/32 (75 %, Bueno). Antes 21/32. Heurísticas 7 y 10 n/a (Persuade).

## Problemas prioritarios

- [P1] Texto tenue ilegible: --text-faint da 2,42:1 (claro) y 2,03:1 (oscuro); se usa en etiquetas de métricas del hero y en "Setup único". Fix: subir a >=4,5:1. Comando: polish.
- [P2] Estructura monótona: cinco secciones con el mismo patrón (H2 centrado + subtítulo + grilla). Comando: layout.
- [P2] "Sobre mí" escasa e imagen chica con vacío; faltan datos concretos del usuario. Comando: clarify, layout.
- [P2] Planes: 8-9 viñetas por plan y jerga. Comando: distill.
- [P2] "Clientes" afirma más de lo que hay (Test con el logo del estudio, Quina sin cargar). Decisión del usuario de dejarlo; alternativa barata: retitular. Comando: clarify.

## Detector

0 hallazgos (antes: Inter y bounce).

## Mejoró desde 21/32

Contraste del naranja (4,7:1), precios en una línea, voz en primera persona, hero móvil, imágenes WebP, indicador de scroll visible, formulario funcional y accesible, tipografía propia y cortes suaves.

## Observaciones menores

- Líneas conectoras de "Cómo funciona" cruzan detrás de los íconos.
- El menú no marca la sección activa.
- Punto pulsante del badge del hero.
- Estrellas del modo oscuro muy tenues.
