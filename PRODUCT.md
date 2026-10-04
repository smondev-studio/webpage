# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Dueños/gerentes de pequeños y medianos negocios en Argentina que necesitan
**software a medida** y están evaluando contratar a un desarrollador/estudio
(público principal). Dentro de ese grupo, comerciantes (indumentaria, sex
shop, growshop, etc.) que quieren una tienda online propia en vez de una
plataforma genérica no-code (Tiendanube, Shopify y similares): a ellos se
les ofrece **Store**. Llegan a esta landing para decidir si contactan a
SmonDev Studio.

## Product Purpose

`webpage` es la landing de marketing de **SmonDev Studio**, un estudio de
desarrollo de software con base en Cipolletti, Río Negro, Argentina. La
empresa hace **desarrollo de software a medida**; **"Store"** es uno de sus
productos: una plataforma de e-commerce multi-tenant (repos hermanos
`smondev-backend` + `smondev-frontend`) que SmonDev construye y opera para
sus clientes. La página presenta primero al estudio y, como bloque propio,
a Store (Características, Planes y Tiendas son todos de Store).
Objetivo **principal**: que alguien con una necesidad de software complete el
formulario de contacto para conversar sobre su proyecto. Objetivo
secundario: que un comerciante contrate Store.

## Positioning

SmonDev Studio no es "una tienda online": es un desarrollador de software a
medida (una sola persona, hablás con quien programa) que además tiene un
producto, Store, que construye y opera a medida para cada cliente. El
diferencial de Store frente a
plataformas genéricas: cada tienda tiene su propio panel de administración,
colores/logo/tipografía personalizables, subdominio (o dominio propio), e
integración de pagos con Mercado Pago ya resuelta — sin que el comerciante
tenga que armar nada por su cuenta ni depender de una plantilla compartida.

## Operating Context

- Landing de una sola página (Astro), sin backend propio salvo el
  formulario de contacto (hace `POST /api/landing-contact` (vía el frontend de la plataforma) a smondev-backend, que guarda
  el mensaje y avisa por email).
- Consume `GET /stores/public` de `smondev-backend` (opcional, con
  fallback) para listar tiendas reales en la sección "Clientes" — ver
  `src/lib/projects.ts`.
- El producto que se vende (Store) es un SaaS multi-tenant real, en
  producción, con clientes reales usando el panel de administración.

## Capabilities and Constraints

- Precios reales y publicados **de Store** (Starter ARS 50.000/mes + setup
  35.000, Commerce ARS 70.000/mes + setup 50.000, Enterprise a
  consultar/próximamente) — no cambiar estas cifras sin instrucción explícita
  del usuario. El **desarrollo a medida no tiene precio de lista**: se cotiza
  según el proyecto. Nunca mostrar los precios de Store como si fueran del
  estudio en general.
- Facturación electrónica (AFIP/TusFacturas) existe en la plataforma Store
  pero **no está validada contra una cuenta real de producción todavía** —
  no presentarla como algo probado end-to-end.
- Stack de esta landing: Astro + TailwindCSS v4 + TypeScript — proyecto
  existente, no greenfield.

## Brand Commitments

- Nombre: SmonDev Studio. Ubicación real: Cipolletti, Río Negro, Argentina.
- Color de marca ya establecido: naranja (`#f97316` en el sitio actual) como
  acento/CTA principal — no es negociable sin que el usuario lo pida.
- Tono personal/cercano en el copy actual ("Me contás tu negocio", primera
  persona) — el estudio se presenta como un desarrollador/founder cercano,
  no como una corporación.

## Evidence on Hand

**No hay todavía ningún caso de cliente real y completo para mostrar.**
Específicamente:

- **"Quina"** aparece en el código actual (`Portfolio.astro`, fallback)
  como si fuera un caso "en producción" con catálogo completo — **esto no
  es cierto**. Quina es la tienda de una amiga que ayudó a probar la
  plataforma pero **nunca completó el onboarding** (nunca terminó de
  cargar su tienda). No usar a Quina como evidencia real de un cliente sin
  que el usuario lo confirme explícitamente; el copy actual sobre ella es
  aspiracional, no un hecho.
- Otras tiendas que existen en el sistema (`Test`, `Ceramica`,
  `TRIBAMCO CO`) son cuentas de prueba o gestionadas por staff/conocidos,
  no necesariamente clientes reales pagos — no asumir que ninguna es
  evidencia de cliente sin confirmarlo primero.
- Un sex shop es, a la fecha, un **cliente potencial** (todavía no
  confirmado/firmado), no un caso de éxito.
- Conclusión práctica: cualquier sección de "clientes"/casos de éxito debe
  tratarse como aspiracional/placeholder hasta que haya un cliente real y
  completo, y debe decirlo así en vez de simular un caso terminado.

## Product Principles

1. La landing presenta primero a SmonDev Studio como desarrollador de
   software a medida; Store es un producto del estudio con su propia sección
   (y sus propios precios), nunca "la empresa entera".
2. Nunca presentar una tienda de prueba o incompleta como un caso de
   cliente real terminado.
3. Los precios y la información de facturación electrónica deben
   reflejar el estado real (validado vs. no validado) del producto.
4. El tono cercano/personal (primera persona, founder-led) es una decisión
   de marca a preservar, no un accidente a "corporativizar".
