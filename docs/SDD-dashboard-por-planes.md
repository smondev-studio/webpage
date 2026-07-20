# SDD: Dashboard Personalizado por Plan

## 1. Visión General

Este documento describe el diseño del dashboard del panel de administración de SmonDev Studio, donde las métricas, widgets y funcionalidades visibles varían según el plan contratado por el cliente (Starter, Commerce, Enterprise).

## 2. Objetivos

- Mostrar métricas relevantes según el plan del usuario
- Guiar al usuario hacia features disponibles en su plan
- Incentivar upgrades mostrando datos limitados con indicadores de expansión
- Proporcionar una experiencia de usuario progresiva y escalable
- Mantener performance óptimo cargando solo los datos necesarios

## 3. Filosofía de Diseño

### 3.1 Principios

1. **Progresivo**: El dashboard crece en complejidad con el plan
2. **Acción-orientado**: Cada widget debe llevar a una acción concreta
3. **Contextual**: Mostrar datos relevantes al momento del negocio
4. **Transparente**: Indicar claramente qué está disponible y qué no

### 3.2 Jerarquía Visual

```
┌─────────────────────────────────────────┐
│  Header: Bienvenida + Acciones rápidas  │
├─────────────────────────────────────────┤
│  KPIs principales (siempre visibles)    │
├─────────────────────────────────────────┤
│  Gráficos y métricas detalladas         │
│  (varían según plan)                    │
├─────────────────────────────────────────┤
│  Alertas y notificaciones               │
├─────────────────────────────────────────┤
│  Widgets de features premium            │
│  (bloqueadas con CTA de upgrade)        │
└─────────────────────────────────────────┘
```

## 4. Dashboard por Plan

### 4.1 Starter Plan

**Enfoque**: Operación básica, control de productos y pedidos

```
┌─────────────────────────────────────────────────────────┐
│  👋 Hola, [Nombre]                                      │
│  [Agregar producto] [Ver pedidos pendientes]            │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  📊 KPIs principales                                    │
│  ┌─────────────┬─────────────┬─────────────┐           │
│  │ Productos   │ Pedidos     │ Ingresos    │           │
│  │ 45/100      │ 12 este mes │ $125.000    │           │
│  │             │             │             │           │
│  └─────────────┴─────────────┴─────────────┘           │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   Pedidos recientes (últimos 5)                       │
│  ┌─────────────────────────────────────────────────┐   │
│  │ #1234 - Juan Pérez - $15.000 - Pendiente       │   │
│  │ #1233 - María López - $8.500 - Enviado         │   │
│  │ ...                                             │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ️ Alertas                                             │
│  • Stock bajo: 3 productos                              │
│  • Productos sin foto: 2                                │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Widgets disponibles:**
- ✅ KPIs básicos (productos, pedidos, ingresos)
- ✅ Lista de pedidos recientes
- ✅ Alertas de stock y productos incompletos
- ✅ Acciones rápidas (agregar producto, ver pedidos)
- ❌ Gráficos de tendencias
- ❌ Análisis de clientes
- ❌ Reportes exportables

### 4.2 Commerce Plan (Próximamente)

**Enfoque**: Crecimiento, análisis de ventas, marketing

```
┌─────────────────────────────────────────────────────────┐
│  👋 Hola, [Nombre]                                      │
│  [Agregar producto] [Importar CSV] [Ver reportes]       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  📊 KPIs principales                                    │
│  ┌─────────────┬─────────────┬─────────────┬─────────┐ │
│  │ Productos   │ Pedidos     │ Ingresos    │ Clientes│ │
│  │ 245/1000    │ 48 este mes │ $580.000    │ 156     │ │
│  │ +12% vs mes │ +23% vs mes │ +18% vs mes │ +34     │ │
│  │ anterior    │ anterior    │ anterior    │ nuevos  │ │
│  └──────────────────────────┴─────────────┴─────────┘ │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  📈 Ventas de los últimos 30 días                       │
│  ┌─────────────────────────────────────────────────┐   │
│  │ [Gráfico de línea con tendencia]                │   │
│  │                                                 │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  🛒 Pedidos recientes      │  👥 Clientes nuevos       │
│  ┌────────────────────    │  ┌────────────────────┐   │
│  │ #1234 - $15.000    │    │  │ 12 esta semana     │   │
│  │ #1233 - $8.500     │    │  │ +5 vs semana ant.  │   │
│  │ ...                │    │  │                    │   │
│  └────────────────────┘    │  └────────────────────┘   │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   WhatsApp (Próximamente)                             │
│  ┌─────────────────────────────────────────────────┐   │
│  │ 🔒 Disponible en plan Commerce                   │   │
│  │ [Conocer más]                                    │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ⚠️ Alertas y recomendaciones                           │
│  • Stock bajo: 8 productos                              │
│  • 15 productos sin SEO optimizado                      │
│  • 3 pedidos pendientes de envío                        │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Widgets disponibles:**
- ✅ Todos los de Starter
- ✅ KPIs con comparativas (vs mes anterior)
- ✅ Gráfico de ventas (30 días)
- ✅ Widget de clientes nuevos
- ✅ Alertas de SEO
- ✅ Importación CSV (acción rápida)
- ❌ Analytics avanzado
- ❌ Multi-sucursal
- ❌ Marketplaces

### 4.3 Enterprise Plan

**Enfoque**: Control total, análisis profundo, expansión

```
─────────────────────────────────────────────────────────┐
│  👋 Hola, [Nombre] - Enterprise                         │
│  [Agregar producto] [Importar CSV] [Ver analytics]      │
│  [Ver todas las sucursales]                             │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   KPIs principales (todas las sucursales)             │
│  ┌─────────────┬─────────────┬─────────────┬─────────┐ │
│  │ Productos   │ Pedidos     │ Ingresos    │ Clientes│ │
│  │ 2.847       │ 342         │ $4.2M       │ 1.2K    │ │
│  │ ilimitados  │ +45% vs mes │ +38% vs mes │ +156    │ │
│  │             │ anterior    │ anterior    │ nuevos  │ │
│  └──────────────────────────┴─────────────┴─────────┘ │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  📈 Ventas y tendencias                                 │
│  ┌─────────────────────────────────────────────────┐   │
│  │ [Gráfico comparativo: este mes vs mes anterior] │   │
│  │ [Gráfico de barras por sucursal]                │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  🏪 Rendimiento por sucursal                            │
│  ┌─────────────────────────────────────────────────┐   │
│  │ Sucursal Centro: $1.8M (43%)                    │   │
│  │ Sucursal Norte: $1.2M (29%)                     │   │
│  │ Sucursal Sur: $1.2M (28%)                       │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  🛒 Pedidos recientes      │  📊 Analytics rápido      │
│  ┌────────────────────┐    │  ────────────────────┐   │
│  │ #5678 - $45.000    │    │  │ Tasa conversión:   │   │
│  │ #5677 - $23.000    │    │  │ 3.2% (+0.5%)       │   │
│  │ ...                │    │  │ Ticket promedio:   │   │
│  ────────────────────┘    │  │ $12.300            │   │
│                            │  └────────────────────┘   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  🌐 Marketplaces (conectados)                           │
│  ┌─────────────────────────────────────────────────┐   │
│  │ Mercado Libre: 45 productos sincronizados       │   │
│  │ Instagram Shopping: Activo                       │   │
│  │ [Gestionar integraciones]                        │   │
│  └─────────────────────────────────────────────────   │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ⚠️ Alertas inteligentes                                │
│  • Stock bajo en 3 sucursales: 12 productos             │
│  • Oportunidad: 5 productos con alta demanda            │
│  • 8 pedidos pendientes de envío                        │
│  • Reporte mensual listo para descargar                 │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Widgets disponibles:**
- ✅ Todos los de Commerce
- ✅ KPIs consolidados (todas las sucursales)
- ✅ Gráficos comparativos
- ✅ Rendimiento por sucursal
- ✅ Analytics rápido (conversión, ticket promedio)
- ✅ Estado de marketplaces conectados
- ✅ Alertas inteligentes con recomendaciones
- ✅ Reportes exportables

## 5. Implementación Técnica

### 5.1 Arquitectura de Componentes

```typescript
// src/lib/types/dashboard.ts
import type { Component } from 'svelte';

interface DashboardWidget {
  id: string;
  type: 'kpi' | 'chart' | 'list' | 'alert' | 'action' | 'locked';
  title: string;
  requiredPlan: 'starter' | 'commerce' | 'enterprise';
  component: Component<any>;
  props?: Record<string, any>;
  order: number;
  size: 'small' | 'medium' | 'large' | 'full';
}

interface DashboardConfig {
  widgets: DashboardWidget[];
  layout: 'single-column' | 'two-column' | 'grid';
}

interface UserContext {
  plan: 'starter' | 'commerce' | 'enterprise';
  storeId: string;
  locations?: string[]; // para enterprise
}
```

### 5.2 Configuración de Widgets por Plan

```typescript
// config/dashboard-widgets.ts
export const DASHBOARD_WIDGETS: DashboardWidget[] = [
  // KPIs Básicos (todos los planes)
  {
    id: 'kpi-products',
    type: 'kpi',
    title: 'Productos',
    requiredPlan: 'starter',
    component: KPIWidget,
    props: { metric: 'products', showLimit: true },
    order: 1,
    size: 'small',
  },
  {
    id: 'kpi-orders',
    type: 'kpi',
    title: 'Pedidos',
    requiredPlan: 'starter',
    component: KPIWidget,
    props: { metric: 'orders', period: 'month' },
    order: 2,
    size: 'small',
  },
  {
    id: 'kpi-revenue',
    type: 'kpi',
    title: 'Ingresos',
    requiredPlan: 'starter',
    component: KPIWidget,
    props: { metric: 'revenue', period: 'month' },
    order: 3,
    size: 'small',
  },
  
  // KPIs Avanzados (Commerce+)
  {
    id: 'kpi-customers',
    type: 'kpi',
    title: 'Clientes',
    requiredPlan: 'commerce',
    component: KPIWidget,
    props: { metric: 'customers', period: 'month', showGrowth: true },
    order: 4,
    size: 'small',
  },
  
  // Gráfico de ventas (Commerce+)
  {
    id: 'chart-sales',
    type: 'chart',
    title: 'Ventas últimos 30 días',
    requiredPlan: 'commerce',
    component: SalesChartWidget,
    props: { period: '30d', showComparison: false },
    order: 5,
    size: 'large',
  },
  
  // Lista de pedidos (todos)
  {
    id: 'list-recent-orders',
    type: 'list',
    title: 'Pedidos recientes',
    requiredPlan: 'starter',
    component: RecentOrdersWidget,
    props: { limit: 5 },
    order: 6,
    size: 'medium',
  },
  
  // Clientes nuevos (Commerce+)
  {
    id: 'widget-new-customers',
    type: 'widget',
    title: 'Clientes nuevos',
    requiredPlan: 'commerce',
    component: NewCustomersWidget,
    props: { period: 'week' },
    order: 7,
    size: 'medium',
  },
  
  // WhatsApp (Commerce+ - Próximamente)
  {
    id: 'widget-whatsapp',
    type: 'locked',
    title: 'WhatsApp',
    requiredPlan: 'commerce',
    component: LockedFeatureWidget,
    props: { feature: 'WhatsApp', upgradePlan: 'commerce' },
    order: 8,
    size: 'medium',
  },
  
  // Rendimiento por sucursal (Enterprise)
  {
    id: 'chart-locations',
    type: 'chart',
    title: 'Rendimiento por sucursal',
    requiredPlan: 'enterprise',
    component: LocationPerformanceWidget,
    props: { chartType: 'bar' },
    order: 9,
    size: 'large',
  },
  
  // Analytics rápido (Enterprise)
  {
    id: 'widget-analytics',
    type: 'widget',
    title: 'Analytics rápido',
    requiredPlan: 'enterprise',
    component: QuickAnalyticsWidget,
    props: { metrics: ['conversion', 'avg_ticket'] },
    order: 10,
    size: 'medium',
  },
  
  // Marketplaces (Enterprise)
  {
    id: 'widget-marketplaces',
    type: 'widget',
    title: 'Marketplaces',
    requiredPlan: 'enterprise',
    component: MarketplacesWidget,
    props: {},
    order: 11,
    size: 'full',
  },
];

export function getDashboardConfig(userPlan: string): DashboardConfig {
  const planOrder = ['starter', 'commerce', 'enterprise'];
  const userPlanIndex = planOrder.indexOf(userPlan);
  
  const availableWidgets = DASHBOARD_WIDGETS.filter(widget => {
    const widgetPlanIndex = planOrder.indexOf(widget.requiredPlan);
    return widgetPlanIndex <= userPlanIndex;
  });
  
  // Ordenar por order
  availableWidgets.sort((a, b) => a.order - b.order);
  
  // Determinar layout según cantidad de widgets
  let layout: 'single-column' | 'two-column' | 'grid' = 'single-column';
  if (userPlan === 'commerce') layout = 'two-column';
  if (userPlan === 'enterprise') layout = 'grid';
  
  return {
    widgets: availableWidgets,
    layout,
  };
}
```

### 5.3 Componente Principal del Dashboard (SvelteKit)

```svelte
<!-- src/lib/components/Dashboard.svelte -->
<script lang="ts">
  import { getDashboardConfig, type DashboardWidget } from '$lib/config/dashboard-widgets';
  import { loadWidgetData } from '$lib/services/dashboard-api';
  import DashboardHeader from './DashboardHeader.svelte';
  import DashboardWidgetRenderer from './DashboardWidgetRenderer.svelte';
  
  interface Props {
    userPlan: 'starter' | 'commerce' | 'enterprise';
    storeId: string;
  }
  
  let { userPlan, storeId }: Props = $props();
  
  const config = getDashboardConfig(userPlan);
  let widgets: DashboardWidget[] = $state(config.widgets);
  
  // Cargar datos de widgets en paralelo
  async function loadAllData() {
    const promises = widgets.map(widget => 
      loadWidgetData(widget, storeId)
    );
    const results = await Promise.all(promises);
    // Actualizar widgets con datos
  }
  
  $effect(() => {
    loadAllData();
  });
</script>

<div class="dashboard dashboard-{config.layout}">
  <DashboardHeader {userPlan} />
  
  <div class="dashboard-grid">
    {#each widgets as widget}
      <DashboardWidgetRenderer {widget} {storeId} />
    {/each}
  </div>
</div>
```

```svelte
<!-- src/lib/components/DashboardWidgetRenderer.svelte -->
<script lang="ts">
  import { loadWidgetData, type DashboardWidget } from '$lib/services/dashboard-api';
  import LockedFeatureCard from './LockedFeatureCard.svelte';
  import WidgetSkeleton from './WidgetSkeleton.svelte';
  import WidgetHeader from './WidgetHeader.svelte';
  
  interface Props {
    widget: DashboardWidget;
    storeId: string;
  }
  
  let { widget, storeId }: Props = $props();
  let data: any = $state(null);
  let loading: boolean = $state(true);
  
  $effect(() => {
    loadWidgetData(widget, storeId).then(result => {
      data = result;
      loading = false;
    });
  });
  
  if (widget.type === 'locked') {
    // Svelte no permite retornar condicionalmente, usar {#if}
  }
</script>

{#if widget.type === 'locked'}
  <LockedFeatureCard 
    feature={widget.title}
    requiredPlan={widget.requiredPlan}
    upgradePath={`/pricing?plan=${widget.requiredPlan}`}
  />
{:else if loading}
  <WidgetSkeleton size={widget.size} />
{:else}
  <div class="widget widget-{widget.size}">
    <WidgetHeader title={widget.title} />
    <svelte:component this={widget.component} {...widget.props} {data} />
  </div>
{/if}
```

### 5.4 Sistema de Layouts

```css
/* styles/dashboard.css */
.dashboard-single-column {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.dashboard-two-column {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.dashboard-two-column .widget-large {
  grid-column: span 2;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.dashboard-grid .widget-large {
  grid-column: span 2;
}

.dashboard-grid .widget-full {
  grid-column: span 3;
}

.widget-small {
  grid-column: span 1;
}

.widget-medium {
  grid-column: span 1;
}

@media (max-width: 768px) {
  .dashboard-two-column,
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
  
  .widget-large,
  .widget-full {
    grid-column: span 1;
  }
}
```

### 5.5 API de Datos (NestJS)

```typescript
// src/dashboard/services/dashboard-api.service.ts (Frontend - SvelteKit)
import type { DashboardWidget } from '$lib/types/dashboard';

interface WidgetDataRequest {
  widgetId: string;
  storeId: string;
  period?: string;
  locationId?: string;
}

export async function loadWidgetData(
  widget: DashboardWidget, 
  storeId: string
): Promise<any> {
  const endpoint = `/api/dashboard/widgets/${widget.id}`;
  
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      storeId,
      period: widget.props?.period || '30d',
      locationId: widget.props?.locationId,
    }),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to load widget ${widget.id}`);
  }
  
  return response.json();
}
```

```typescript
// src/dashboard/dashboard.controller.ts (Backend - NestJS)
import { Controller, Post, Body, Param, ForbiddenException } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

interface WidgetDataRequest {
  storeId: string;
  period?: string;
  locationId?: string;
}

@Controller('dashboard/widgets')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Post(':widgetId')
  async getWidgetData(
    @Param('widgetId') widgetId: string,
    @Body() body: WidgetDataRequest,
  ) {
    const { storeId, period, locationId } = body;
    
    // Verificar permisos según plan
    const store = await this.dashboardService.getStore(storeId);
    const widget = this.dashboardService.getWidget(widgetId);
    
    if (!this.dashboardService.isPlanAllowed(widget.requiredPlan, store.plan)) {
      throw new ForbiddenException('Plan not allowed');
    }
    
    // Cargar datos según tipo de widget
    const data = await this.dashboardService.getWidgetData(
      widgetId, 
      storeId, 
      period, 
      locationId
    );
    
    return data;
  }
}
```

```typescript
// src/dashboard/dashboard.service.ts (Backend - NestJS)
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from '../stores/store.entity';
import { DASHBOARD_WIDGETS } from './dashboard-widgets.config';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Store)
    private storeRepository: Repository<Store>,
  ) {}

  async getStore(storeId: string): Promise<Store> {
    return this.storeRepository.findOne({ where: { id: storeId } });
  }

  getWidget(widgetId: string) {
    const widget = DASHBOARD_WIDGETS.find(w => w.id === widgetId);
    if (!widget) {
      throw new Error(`Widget ${widgetId} not found`);
    }
    return widget;
  }

  isPlanAllowed(requiredPlan: string, userPlan: string): boolean {
    const planOrder = ['starter', 'commerce', 'enterprise'];
    return planOrder.indexOf(userPlan) >= planOrder.indexOf(requiredPlan);
  }

  async getWidgetData(
    widgetId: string,
    storeId: string,
    period?: string,
    locationId?: string,
  ): Promise<any> {
    // Implementar lógica según tipo de widget
    // Ej: productos, pedidos, ventas, etc.
  }
}
```

## 6. Flujos de Usuario

### 6.1 Usuario Starter ve widget bloqueado

1. Usuario ve card gris con ícono de candado
2. Texto: "WhatsApp disponible en plan Commerce"
3. Botón: "Conocer más" → va a página de pricing
4. Tracking: evento `widget_locked_view` con `widget_id` y `required_plan`

### 6.2 Usuario alcanza límite de productos

1. Widget de KPI "Productos" muestra: "95/100"
2. Color cambia a naranja (90-99%) o rojo (100%)
3. Al hacer clic, modal:
   ```
   "Llegaste al 95% de tu límite"
   [Ver planes para ampliar] [Cerrar]
   ```
4. Si llega a 100%, botón "Agregar producto" se deshabilita

### 6.3 Usuario Commerce ve gráfico de ventas

1. Widget muestra gráfico de línea con últimos 30 días
2. Hover sobre punto muestra: fecha, cantidad de ventas, monto
3. Botón "Ver reportes" → va a página de reportes detallados
4. Opción de cambiar período: 7d, 30d, 90d

### 6.4 Usuario Enterprise ve multi-sucursal

1. Dashboard muestra KPIs consolidados de todas las sucursales
2. Widget de rendimiento por sucursal con gráfico de barras
3. Clic en sucursal → filtra todo el dashboard a esa sucursal
4. Botón "Ver todas las sucursales" → página de gestión de sucursales

## 7. Métricas y Analytics

### 7.1 Tracking de Interacción

```typescript
interface DashboardAnalytics {
  event: 'widget_view' | 'widget_click' | 'widget_locked_view' | 'upgrade_click';
  widgetId: string;
  userPlan: string;
  timestamp: Date;
  metadata?: {
    lockedFeature?: string;
    requiredPlan?: string;
    action?: string;
  };
}

// Ejemplo de tracking
function trackWidgetInteraction(event: DashboardAnalytics) {
  analytics.track(event.event, {
    widget_id: event.widgetId,
    user_plan: event.userPlan,
    locked_feature: event.metadata?.lockedFeature,
    required_plan: event.metadata?.requiredPlan,
  });
}
```

### 7.2 KPIs del Dashboard

- **Engagement**: Tiempo promedio en dashboard
- **Feature discovery**: % de usuarios que interactúan con cada widget
- **Upgrade conversion**: Clicks en widgets bloqueados → upgrades
- **Limit alerts**: Usuarios que reciben alerta de límite → upgrades

## 8. Consideraciones de Performance

### 8.1 Carga de Datos

- **Lazy loading**: Widgets se cargan a medida que aparecen en viewport
- **Parallel fetching**: Todos los widgets cargan en paralelo
- **Caching**: Datos de KPIs cacheados por 5 minutos
- **Skeleton screens**: Mostrar placeholders mientras carga

### 8.2 Optimizaciones

```svelte
<!-- Virtualización para listas largas (Svelte) -->
<script lang="ts">
  import { VirtualList } from 'svelte-virtual-list';
  import OrderRow from './OrderRow.svelte';
  
  interface Props {
    data: Order[];
  }
  
  let { data }: Props = $props();
</script>

<VirtualList
  height={400}
  itemCount={data.length}
  itemSize={60}
  let:index
  let:style
>
  <OrderRow order={data[index]} {style} />
</VirtualList>
```

```svelte
<!-- Memoización de gráficos (Svelte) -->
<script lang="ts">
  import { LineChart } from './charts/LineChart.svelte';
  
  interface Props {
    data: SalesData[];
  }
  
  let { data }: Props = $props();
  
  // Svelte 5: $derived para memoización
  $: chartData = data; // Se recalcula solo cuando data cambia
</script>

<LineChart data={chartData} />
```

## 9. Personalización Futura

### 9.1 Widgets Configurables

Permitir al usuario:
- Reordenar widgets (drag & drop)
- Ocultar widgets no relevantes
- Cambiar tamaño de widgets
- Guardar layout personalizado

```typescript
interface UserDashboardPreferences {
  userId: string;
  widgetOrder: string[];
  hiddenWidgets: string[];
  widgetSizes: Record<string, 'small' | 'medium' | 'large'>;
}
```

### 9.2 Dashboards Personalizados

- Crear múltiples dashboards (ej: "Ventas", "Inventario", "Marketing")
- Compartir dashboards entre usuarios del mismo equipo
- Templates de dashboard por industria

### 9.3 Alertas Personalizadas

- Configurar umbrales de alertas (ej: "avisar cuando stock < 10")
- Notificaciones por email/WhatsApp
- Reglas automáticas (ej: "si ventas bajan 20%, enviar alerta")

## 10. Testing

### 10.1 Test Cases (Vitest + @testing-library/svelte)

```typescript
// src/lib/__tests__/dashboard.test.ts
import { describe, it, expect, vi } from 'vitest';
import { render, waitFor } from '@testing-library/svelte';
import Dashboard from '$lib/components/Dashboard.svelte';
import { getDashboardConfig } from '$lib/config/dashboard-widgets';

describe('Dashboard', () => {
  it('should show only starter widgets for starter plan', () => {
    const config = getDashboardConfig('starter');
    expect(config.widgets).toHaveLength(4); // KPIs + pedidos
    expect(config.widgets.every(w => w.requiredPlan === 'starter')).toBe(true);
  });
  
  it('should show commerce widgets for commerce plan', () => {
    const config = getDashboardConfig('commerce');
    expect(config.widgets.some(w => w.id === 'chart-sales')).toBe(true);
    expect(config.widgets.some(w => w.id === 'kpi-customers')).toBe(true);
  });
  
  it('should show locked widget for unavailable feature', () => {
    const config = getDashboardConfig('starter');
    const whatsappWidget = config.widgets.find(w => w.id === 'widget-whatsapp');
    expect(whatsappWidget?.type).toBe('locked');
  });
  
  it('should load widget data in parallel', async () => {
    const mockFetch = vi.fn().mockResolvedValue({ data: [] });
    global.fetch = mockFetch;
    
    render(Dashboard, { 
      props: { userPlan: 'commerce', storeId: '123' } 
    });
    
    // Esperar a que todos los widgets carguen
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(6); // 6 widgets de commerce
    });
  });
});
```

## 11. Timeline Estimado

| Fase | Descripción | Duración |
|------|-------------|----------|
| 1 | Estructura base y configuración de widgets | 1 semana |
| 2 | Implementación de widgets Starter | 1 semana |
| 3 | Implementación de widgets Commerce | 1.5 semanas |
| 4 | Implementación de widgets Enterprise | 1.5 semanas |
| 5 | Sistema de locked features y CTAs | 3 días |
| 6 | Testing y optimización de performance | 1 semana |
| 7 | Analytics y tracking | 2 días |

**Total estimado: 6-7 semanas**

## 12. Dependencias

- Sistema de autenticación y planes
- API de métricas y reportes (NestJS)
- Base de datos de pedidos, productos, clientes
- Sistema de notificaciones
- Google Analytics / herramientas de tracking
- Componentes de gráficos (Chart.js, svelte-chartjs, etc.)
- Svelte 5, SvelteKit
- Vitest, @testing-library/svelte

## 13. Riesgos y Mitigaciones

| Riesgo | Impacto | Mitigación |
|--------|---------|------------|
| Carga lenta con muchos widgets | Alto | Lazy loading, caching, parallel fetching |
| Complejidad de mantenimiento | Medio | Configuración declarativa, tests |
| Usuarios confundidos con features bloqueadas | Medio | UX clara, CTAs prominentes |
| Performance en mobile | Alto | Responsive design, virtualización |

## 14. Éxito del Proyecto

### Métricas de éxito:
- 80% de usuarios interactúan con al menos 3 widgets por sesión
- 15% de usuarios que ven widgets bloqueados hacen upgrade en 30 días
- Tiempo de carga del dashboard < 2 segundos
- 90% de usuarios no reportan confusión sobre features disponibles

### KPIs de negocio:
- Aumento de 20% en upgrades desde Starter a Commerce
- Reducción de 30% en tickets de soporte sobre "cómo hacer X"
- Aumento de 25% en engagement (sesiones por semana)
