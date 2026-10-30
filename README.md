# SmonDev Studio — Landing

Sitio de [smondevstudio.com](https://smondevstudio.com): la presentación de **SmonDev Studio**, un estudio de desarrollo de **software a medida** (Cipolletti, Río Negro, Argentina) que además tiene **Store**, una plataforma propia de tiendas online.

La página presenta primero al estudio y, como bloque aparte, a Store (qué incluye, cómo funciona, planes y tiendas hechas con ella). El objetivo principal es que alguien con una necesidad de software complete el formulario de contacto.

> El posicionamiento, el público y las reglas de contenido están en [`PRODUCT.md`](PRODUCT.md). Los precios de Store, en [`PRICING_TIERS.md`](PRICING_TIERS.md).

## Stack

- **Astro 6** (sitio estático) + **TypeScript**
- **Tailwind CSS v4** y variables CSS propias para el tema (`src/styles/global.css`)
- **Tipografía:** Bricolage Grotesque (títulos) y Figtree (texto), vía Google Fonts
- **Íconos:** `@lucide/astro`
- **Imágenes:** `sharp` optimiza los logos de las tiendas durante el build
- **Tests:** Vitest (unitarios) y Playwright (e2e)
- **Calidad:** ESLint + Prettier, con Husky y lint-staged en cada commit
- **Gestor de paquetes:** pnpm

## Estructura

```text
/
├── public/                  # Estáticos: imágenes (WebP), favicon, robots.txt, CNAME
├── src/
│   ├── components/          # Navbar, Hero, About, StoreIntro, Features,
│   │                        # HowItWorks, Pricing, Portfolio, Contact, Footer, Analytics
│   ├── layouts/Layout.astro # <head>: SEO, Open Graph, datos estructurados, tema
│   ├── lib/
│   │   ├── contact.ts       # Envío del formulario de contacto
│   │   ├── projects.ts      # Tiendas del portfolio (API pública del backend)
│   │   └── __tests__/       # Tests unitarios
│   ├── pages/
│   │   ├── index.astro      # Portada (una sola página)
│   │   ├── 404.astro        # Página no encontrada
│   │   ├── 500.astro        # Página de mantenimiento
│   │   ├── sitemap.xml.ts   # Sitemap generado en cada build
│   │   └── stores/[id].webp.ts  # Logos de las tiendas, optimizados
│   ├── scripts/reveal.ts    # Aparición suave de secciones al hacer scroll
│   └── styles/global.css    # Tema claro/oscuro, fondo de cielo, animaciones
├── docs/                    # Documentos de diseño (SDD-*.md)
├── e2e/                     # Tests de Playwright
├── .github/workflows/       # CI y despliegue
├── PRODUCT.md               # Posicionamiento y reglas de contenido
└── PRICING_TIERS.md         # Planes y precios de Store
```

Orden de las secciones: Hero → Sobre mí → Store → Qué incluye → Cómo funciona → Planes → Tiendas → Contacto.

## Puesta en marcha

Requiere Node 22 o superior y [pnpm](https://pnpm.io).

```bash
pnpm install
cp .env.example .env.local   # y completar las variables (ver abajo)
pnpm dev                     # http://localhost:4321
```

### Variables de entorno

| Variable                  | Para qué                                                                                                                                                                      | Obligatoria |
| :------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------- |
| `PUBLIC_API_URL`          | API del backend: lista de tiendas (en el build) y `POST /api/landing-contact` (en el navegador). Local: `http://localhost:3001` · Producción: `https://api.smondevstudio.com` | Sí          |
| `PUBLIC_GA_ID`            | ID de Google Analytics (`G-XXXXXXXXXX`)                                                                                                                                       | No          |
| `PUBLIC_GSC_VERIFICATION` | Código de verificación de Search Console (etiqueta HTML)                                                                                                                      | No          |

Sin `PUBLIC_API_URL` el sitio compila igual, pero sin tiendas y con el formulario de contacto sin conexión.

## Comandos

| Comando                       | Acción                           |
| :---------------------------- | :------------------------------- |
| `pnpm dev`                    | Servidor de desarrollo           |
| `pnpm build`                  | Build de producción en `./dist/` |
| `pnpm preview`                | Sirve el build localmente        |
| `pnpm test`                   | Tests unitarios (Vitest)         |
| `pnpm test:e2e`               | Tests de navegador (Playwright)  |
| `pnpm lint` / `pnpm lint:fix` | ESLint                           |

## Cómo funciona

- **Formulario de contacto:** `src/lib/contact.ts` hace `POST {PUBLIC_API_URL}/api/landing-contact`. El backend guarda el mensaje y avisa por email. Tiene un campo oculto anti-spam (honeypot) y un límite de envíos por visitante. El sitio no consulta servicios de geolocalización.
- **Tiendas del portfolio:** en el build se leen de `GET /api/stores/public`. Los logos (que llegan como base64) se convierten en archivos WebP en `/stores/<id>.webp` para no inflar el HTML. Si la API falla o no responde, `Portfolio.astro` muestra una tarjeta fija de ejemplo ("Quina"), que **no** refleja una tienda real terminada: es un pendiente conocido.
- **Tema claro/oscuro:** el script del `<head>` aplica la clase `light` antes del primer render. Las imágenes del hero cambian por CSS, sin parpadeo.
- **Movimiento:** las animaciones se desactivan con `prefers-reduced-motion`.
- **SEO:** título, descripción, Open Graph, datos estructurados (JSON-LD), sitemap con fecha del último commit, `robots.txt` y página 404.

## Despliegue

El sitio se publica en **GitHub Pages** con el dominio `smondevstudio.com` (DNS en Cloudflare, sin proxy).

- **Se despliega solo** con cada push a `main` (`.github/workflows/deploy.yml`).
- **CI:** `.github/workflows/ci.yml` corre lint, tests y build en cada push y pull request.
- **Secretos del repositorio** (Settings → Secrets and variables → Actions): `PUBLIC_API_URL`, `PUBLIC_GA_ID` y `PUBLIC_GSC_VERIFICATION`.

Como cada merge a `main` publica el sitio, conviene trabajar en una rama y abrir un pull request.

## Contribuir

- Una rama por cambio y un pull request hacia `main`.
- El hook de commit corre ESLint y Prettier sobre los archivos modificados.
- Los precios y las funciones de Store deben coincidir con los planes del backend (`STARTER` / `COMMERCE` / `ENTERPRISE`); ver `PRICING_TIERS.md`.

## Documentación

- [`PRODUCT.md`](PRODUCT.md): a quién se le habla, qué se promete y qué no.
- [`PRICING_TIERS.md`](PRICING_TIERS.md): planes y precios de Store, y su relación con el backend.
- [`docs/`](docs): documentos de diseño de funciones.
- [`CLAUDE.md`](CLAUDE.md): contexto para asistentes de código.
