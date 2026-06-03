# Pricing tiers — SmonDev Studio

Este documento define tres tiers iniciales pensados para negocios locales en Argentina, con precios recomendados, setup fee y listado de funcionalidades. Incluye ampliaciones sugeridas (analytics) y extras para la suscripción mayor.

---

## Resumen rápido

- Starter (Básico)
  - Mensual: ARS 18.000
  - Setup (único): ARS 20.000
  - Ideal para: comercios pequeños que quieren presencia online rápida

- Commerce (Comercio / Pro)
  - Mensual: ARS 38.000
  - Setup (único): ARS 35.000
  - Ideal para: comercios con facturación mensual media, integraciones de ventas (WhatsApp, MP)

- Enterprise (Full)
  - Mensual: ARS 75.000
  - Setup (único): ARS 50.000
  - Ideal para: cadenas, multi-sucursal, integración avanzada y soporte prioritario

---

## Qué incluye cada tier (detallado)

### Starter (ARS 18.000 / mes)
- Catalogo básico (productos, variantes, fotos)
- Checkout con Mercado Pago (preferencias básicas)
- Subdominio temporal / dominio propio (opcional con costo extra)
- Panel admin básico: productos, pedidos, clientes
- Soporte por mensaje (tiempo de respuesta 48h)
- Importación CSV básica (puede requerir asistencia)

### Commerce (ARS 38.000 / mes)
Incluye todo Starter, más:
- Dominio propio y configuración DNS
- WhatsApp integrado (botón de contacto + plantillas de mensaje)
- Métodos de pago adicionales y configuración avanzada de back_urls
- Reportes mensuales básicos (ventas, artículos más vendidos)
- Mejora de SEO y optimización de producto
- SLA de soporte (respuesta <24h)
- Exportación/backup mensual de catálogo

### Enterprise (ARS 75.000 / mes)
Incluye todo Commerce, más:
- Multi-sucursal / multi-ubicación (gestión por tienda)
- Integraciones con POS o sincronización de stock por sucursal
- Analytics avanzado (dashboards, cohortes, funnels)
- Prioridad 1 soporte (telefono / reunión semanal)
- Integración con marketplaces y redes sociales
- Opciones de white-label (marca del cliente en emails/pedidos)

---

## Analítica — qué falta y cómo implementarla

Actualmente no está implementada. Recomendación de etapas:
1. Telemetría básica (evento: visita, vista producto, add-to-cart, checkout start, order placed) → almacenar en DB o usar Postgres/Timescale.
2. Dashboard simple (per store): ventas diarias, productos top, tasa conversión (visitas→orders).
3. Analítica avanzada para Enterprise: cohortes, retention, LTV estimado, funnels y export CSV/Google Data Studio.

Tecnologías sugeridas: Postgres (ya en el stack), ClickHouse o Supabase + Metabase/Redash para dashboards, o integración con GA4/Server-side tracking.

---

## Extras y servicios a ofrecer en la suscripción mayor

- Onboarding presencial / remoto (cobro por hora o incluido como X horas en el setup)
- Campañas de lanzamiento (configuración de Ads, Facebook/Instagram) — servicio profesional adicional
- Integración contable (exportador de ventas, conciliación diaria)
- PoS / terminales (integración con hardware local)
- Personalización UI/UX y tema premium
- Formación y documentación personalizada

---

## Modelo de cobro y gestión (manual por ahora)

- Mantener fee mensual + setup único.
- Para cobro manual: crear facturas/invoices en el panel admin con un link de pago (Mercado Pago preference o link). Marcar manualmente como "pagado" y cambiar estado de suscripción a activo.
- Registrar pagos en la DB para calcular MRR automáticamente.

---

## Ejemplo de proyección simple

Supongamos: 5 Starter, 4 Commerce, 1 Enterprise:
- MRR = 5*18.000 + 4*38.000 + 1*75.000 = ARS 317.000
- ARR = 317.000 * 12 = ARS 3.804.000
- Setups únicos (si todos nuevos): 10*20.000 + 5*35.000 + 2*50.000 = variable (no recurrente)

---

## Contratos y condiciones recomendadas

- Ciclo: pago mensual por adelantado (30 días)
- Plazo mínimo: 3 meses recomendado para reducir churn de implementación
- Reajuste: cláusula anual indexada al IPC o al dólar mayorista
- Soporte incluido: definir cantidad de horas mensuales y tarifa por hora extra

---

## Próximos pasos sugeridos

1. Confirmar precios finales y mensajes de venta (web copy).
2. Diseñar la tabla `billing/invoices` y el flujo manual de marcado de pago.
3. Priorizar implementación de analítica básica (eventos + dashboard) para tier Commerce.
4. Crear material comercial (demo preconfigurada para comercios locales).

---

Archivo creado por: SmonDev Studio — propuesta inicial. Ajustable según feedback.