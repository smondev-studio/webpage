# webpage — smondev-studio landing

Landing/marketing de **SmonDev Studio** (smondevstudio.com), el servicio de
desarrollo de e-commerce multi-tenant. Sitio estático que usa solo la API
**pública** del backend (`../smondev-backend`, vía `PUBLIC_API_URL`):
`POST /api/landing-contact` (formulario de contacto, guarda el mensaje y avisa por
email) y `GET /api/stores/public` (tiendas del portfolio). No usa nada
autenticado ni multi-tenant.

## Stack

- Astro 6 + TypeScript, TailwindCSS v4
- Testing: Vitest (unit, `src/lib/__tests__/`), Playwright (`e2e/`)
- Lint/format: ESLint + Prettier via Husky pre-commit
- Package manager: pnpm

## Comandos

```bash
pnpm dev        # localhost:4321
pnpm build      # dist/
pnpm test       # vitest run
pnpm test:e2e   # playwright test
pnpm lint
```

## Estructura

- `src/components/` — Hero, Features, Pricing, etc. (componentes Astro)
- `src/lib/contact.ts` — form de contacto → `POST {PUBLIC_API_URL}/api/landing-contact`
- `src/lib/projects.ts` — portfolio dinámico (`GET /api/stores/public`)
- `docs/SDD-*.md` — spec docs: edad/cookies, SEO/accesibilidad, dashboard y
  menú por planes
- `PRICING_TIERS.md` — planes y modelo de negocio (fuente de verdad de
  pricing público)

## Repos hermanos

Parte de **smondev-studio**. Repos relacionados, en el mismo nivel (`../`):

- **`../smondev-backend`** — NestJS + Prisma, la API real del SaaS. Este sitio
  usa solo sus endpoints públicos (contacto y tiendas).
- **`../smondev-frontend`** — SvelteKit 5, la app multi-tenant que este
  landing promociona y vende.

Cambios en `PRICING_TIERS.md` deben mantenerse consistentes con los planes
definidos en el backend (`Store.plan`: `STARTER`/`COMMERCE`/`ENTERPRISE`, más
`FREE` interno) y su UI en el frontend. Para tareas que cruzan los 3 repos, usar la skill
`/smondev-context`.
