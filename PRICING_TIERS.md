# Pricing de Store — SmonDev Studio

Fuente de verdad del pricing público. **Los tres repos deben coincidir con este
archivo**: la landing (`src/lib/pricing.ts` + `src/components/Pricing.astro`), el backend
(`smondev-backend/src/store/plan.constants.ts` + tabla `store_plans`) y el
frontend (`smondev-frontend/src/lib/services/api/stores.ts` + `requiredPlan`
en `routes/admin/+layout.svelte`).

Los precios viven **solo acá y en la landing**. El backend no guarda precios.

> **Alcance:** estos precios son **solo de Store** (la plataforma de tiendas
> online). El desarrollo de software a medida del estudio **no tiene precio de
> lista**: se cotiza según el proyecto. La landing lo aclara bajo los planes.

## Planes y códigos

| Plan público | Código (backend/frontend) | Mensual (ARS) | Alta inicial / setup único (ARS) | Productos | Estado                                |
| ------------ | ------------------------- | ------------- | -------------------------------- | --------- | ------------------------------------- |
| Starter      | `STARTER`                 | 50.000        | 35.000                           | 100       | Activo                                |
| **Commerce** | `COMMERCE`                | 80.000        | 60.000                           | 1.000     | Activo — **el plan al que apuntamos** |
| Enterprise   | `ENTERPRISE`              | A consultar   | —                                | Ilimitado | Próximamente (inactivo en la base)    |
| —            | `FREE`                    | —             | —                                | 25        | Interno: demo / fallback. No se vende |

Starter es un plan real pero deliberadamente acotado: funciona de ancla para
que Commerce sea la opción obvia (por 30.000/mes más: 10x productos y casi
todas las herramientas de venta).

### Qué incluye el alta de Commerce

- Crear la tienda con logo y colores, conectar Mercado Pago, configurar el
  dominio y acompañar el lanzamiento.
- Carga de hasta 500 productos a partir del listado del cliente (Excel o
  exportación de su sistema). Más de 500 productos, o buscar imágenes, se
  cotiza aparte.
- El dominio lo registra y paga el cliente, a su nombre.

## Qué incluye cada plan

Solo se listan funciones que la plataforma tiene hoy.

| Función                                                                                                                 | Starter | Commerce          |
| ----------------------------------------------------------------------------------------------------------------------- | ------- | ----------------- |
| Catálogo con variantes de talla/color y fotos                                                                           | ✅      | ✅                |
| Carga manual de productos                                                                                               | ✅      | ✅                |
| Cobro con Mercado Pago, transferencia o efectivo (recargo/descuento configurable por método)                            | ✅      | ✅                |
| Actualización masiva de precios (por categoría, marca o todo el catálogo; % o monto, redondeo, vista previa y deshacer) | ✅      | ✅                |
| Filtro del catálogo por marca                                                                                           | ✅      | ✅                |
| Productos en borrador                                                                                                   | ✅      | ✅                |
| Promociones: packs y combos a precio fijo                                                                               | —       | ✅                |
| Subdominio en smondevstudio.com                                                                                         | ✅      | ✅                |
| Panel: productos, pedidos, clientes                                                                                     | ✅      | ✅                |
| Dashboard con KPIs del mes                                                                                              | ✅      | ✅                |
| Usuarios                                                                                                                | 1       | Varios, con roles |
| Soporte por mensaje                                                                                                     | 48 h    | < 24 h            |
| Importación masiva desde Excel                                                                                          | —       | ✅                |
| Dominio propio + configuración DNS                                                                                      | —       | ✅                |
| Gift codes (códigos de descuento)                                                                                       | —       | ✅                |
| Analytics, ventas por día, top productos, clientes                                                                      | —       | ✅                |
| Log de emails                                                                                                           | —       | ✅                |
| Facturación electrónica AFIP                                                                                            | —       | ✅ **beta**       |

**Facturación electrónica es beta**: existe en la plataforma pero no está
validada contra una cuenta real de producción. Siempre mostrarla como beta.

**Enterprise (próximamente):** todo lo de Commerce + multi-sucursal, analytics
avanzado (cohortes, funnels), soporte prioritario, integración con
marketplaces y redes, white-label.

### Quitado de la oferta hasta que exista

WhatsApp integrado, reportes mensuales, exportación/backup mensual y "SEO
avanzado" estaban en el plan Commerce de la landing pero no están construidos.
Volver a listarlos solo cuando existan.

## Gating en el código

El acceso por plan se decide por `plan.code`, en orden
`FREE < STARTER < COMMERCE < ENTERPRISE`:

- Frontend: `requiredPlan: 'COMMERCE'` en el menú del admin (Analytics,
  Facturas, Facturación, Gift Codes, Promociones, Importar, Emails, Equipo de tienda) y
  `isCommerce` en el dashboard.
- Backend: `hasPlanAccess(code, 'COMMERCE')` en `analytics.controller.ts`.

Hoy **no se aplica por código**: el límite de productos (solo genera una
alerta al 90%) ni el dominio propio. Los flags `enableCustomDomain`,
`enableInvoice` y `maxUsers` de `store_plans` tampoco se leen en ningún lado.

## Modelo de cobro (manual por ahora)

- Abono mensual + alta inicial (pago único). Pago mensual por adelantado
  (períodos de 30 días), por transferencia bancaria o en efectivo.
- Sin contratos forzados; plazo mínimo sugerido de 3 meses.
- Cobro manual: marcar como pagado a mano.
- El abono mensual se actualiza cada 3 meses según la variación acumulada del
  IPC (INDEC), con aviso por escrito 15 días antes. El alta es un pago único.

## Al cambiar un plan, un precio o una función

1. Editar este archivo.
2. Backend: `plan.constants.ts`, `prisma/seed.ts` y una migración si cambia un código.
3. Frontend: `StorePlan` en `stores.ts` y los `requiredPlan` del admin.
4. Landing: `src/lib/pricing.ts` (los tiers; `Pricing.astro` los importa).
