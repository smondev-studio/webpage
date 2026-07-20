# SDD: Sistema de Menú por Planes

## 1. Visión General

Este documento describe el diseño del sistema de navegación y menú del panel de administración de SmonDev Studio, donde las opciones disponibles varían según el plan contratado por el cliente (Starter, Commerce, Enterprise).

## 2. Objetivos

- Mostrar/ocultar elementos del menú según el plan del usuario
- Guiar al usuario hacia features disponibles en su plan
- Facilitar upgrades mostrando features bloqueadas con indicadores claros
- Mantener una experiencia de usuario consistente entre planes

## 3. Planes y Límites

| Característica | Starter | Commerce | Enterprise |
|---------------|---------|----------|------------|
| **Precio mensual** | $50.000 | $70.000 | A consultar |
| **Límite de productos** | 100 | 1.000 | Ilimitado |
| **Carga de productos** | Manual (uno por uno) | Manual + CSV/Excel | Manual + CSV/Excel |
| **Estado** | ✅ Activo | ⏳ Próximamente | ✅ Activo |

## 4. Estructura del Menú

### 4.1 Menú Principal (Sidebar)

#### Starter Plan
```
📊 Dashboard
 Productos
   ├── Listado (máx. 100)
   ├── Agregar producto
   └── Variantes
🛒 Pedidos
 Clientes
⚙️ Configuración
   ├── Datos de la tienda
   ├── Mercado Pago
   └── Dominio (subdominio temporal)
👤 Mi cuenta
```

#### Commerce Plan (Próximamente)
```
📊 Dashboard
📦 Productos
   ├── Listado (máx. 1.000)
   ├── Agregar producto
   ├── Variantes
   ── 📥 Importar CSV/Excel
🛒 Pedidos
👥 Clientes
💬 WhatsApp
   ├── Configuración
   └── Plantillas
 Reportes
   ├── Ventas mensuales
   └── Exportar datos
 SEO
   ├── Optimización
   ── Metadatos
⚙️ Configuración
   ├── Datos de la tienda
   ├── Mercado Pago
   ├── Dominio propio
   └── WhatsApp
👤 Mi cuenta
```

#### Enterprise Plan
```
📊 Dashboard
📦 Productos
   ├── Listado (ilimitado)
   ├── Agregar producto
   ├── Variantes
   └── 📥 Importar CSV/Excel
🛒 Pedidos
👥 Clientes
 WhatsApp
   ├── Configuración
   └── Plantillas
📈 Reportes
   ├── Ventas mensuales
   ├── Exportar datos
   └── 📊 Analytics avanzado
 SEO
   ├── Optimización
   ── Metadatos
🏪 Multi-sucursal
   ├── Sucursales
   └── Stock por ubicación
 Marketplaces
   ├── Mercado Libre
   └── Redes sociales
🎨 White-label
   ├── Personalización
   └── Branding
⚙️ Configuración
   ├── Datos de la tienda
   ├── Mercado Pago
   ├── Dominio propio
   ├── WhatsApp
   └── Integraciones
👤 Mi cuenta
🎧 Soporte prioritario
```

### 4.2 Menú Superior (Top Bar)

Común a todos los planes:
```
[Logo]  [Notificaciones]  [Usuario ▼]
                              ├── Mi cuenta
                              ├── Configuración
                              ├── Cambiar plan
                              └── Cerrar sesión
```

## 5. Implementación Técnica

### 5.1 Estructura de Datos

```typescript
interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  requiredPlan: 'starter' | 'commerce' | 'enterprise';
  children?: MenuItem[];
  badge?: {
    text: string;
    type: 'new' | 'beta' | 'locked';
  };
}

interface PlanConfig {
  name: string;
  maxProducts: number;
  features: string[];
  menuItems: MenuItem[];
}
```

### 5.2 Configuración de Planes

```typescript
const PLAN_CONFIGS: Record<string, PlanConfig> = {
  starter: {
    name: 'Starter',
    maxProducts: 100,
    features: ['basic_catalog', 'mp_checkout', 'manual_upload'],
    menuItems: [
      { id: 'dashboard', label: 'Dashboard', icon: 'chart', path: '/dashboard', requiredPlan: 'starter' },
      { id: 'products', label: 'Productos', icon: 'package', path: '/products', requiredPlan: 'starter' },
      { id: 'orders', label: 'Pedidos', icon: 'shopping-cart', path: '/orders', requiredPlan: 'starter' },
      { id: 'customers', label: 'Clientes', icon: 'users', path: '/customers', requiredPlan: 'starter' },
      { id: 'settings', label: 'Configuración', icon: 'settings', path: '/settings', requiredPlan: 'starter' },
    ],
  },
  commerce: {
    name: 'Commerce',
    maxProducts: 1000,
    features: ['basic_catalog', 'mp_checkout', 'csv_import', 'whatsapp', 'reports', 'seo'],
    menuItems: [
      // ... todos los de starter +
      { id: 'bulk-import', label: 'Importar CSV', icon: 'upload', path: '/products/import', requiredPlan: 'commerce' },
      { id: 'whatsapp', label: 'WhatsApp', icon: 'message-circle', path: '/whatsapp', requiredPlan: 'commerce' },
      { id: 'reports', label: 'Reportes', icon: 'bar-chart', path: '/reports', requiredPlan: 'commerce' },
      { id: 'seo', label: 'SEO', icon: 'search', path: '/seo', requiredPlan: 'commerce' },
    ],
  },
  enterprise: {
    name: 'Enterprise',
    maxProducts: -1, // ilimitado
    features: ['basic_catalog', 'mp_checkout', 'csv_import', 'whatsapp', 'reports', 'seo', 'multi_location', 'analytics', 'marketplaces', 'white_label'],
    menuItems: [
      // ... todos los de commerce +
      { id: 'multi-location', label: 'Multi-sucursal', icon: 'map-pin', path: '/locations', requiredPlan: 'enterprise' },
      { id: 'analytics', label: 'Analytics', icon: 'trending-up', path: '/analytics', requiredPlan: 'enterprise' },
      { id: 'marketplaces', label: 'Marketplaces', icon: 'globe', path: '/marketplaces', requiredPlan: 'enterprise' },
      { id: 'white-label', label: 'White-label', icon: 'palette', path: '/branding', requiredPlan: 'enterprise' },
    ],
  },
};
```

### 5.3 Componente de Menú

```typescript
// MenuSidebar.tsx
interface MenuSidebarProps {
  userPlan: 'starter' | 'commerce' | 'enterprise';
  currentPath: string;
}

function MenuSidebar({ userPlan, currentPath }: MenuSidebarProps) {
  const config = PLAN_CONFIGS[userPlan];
  const availableItems = config.menuItems.filter(item => 
    isPlanAllowed(item.requiredPlan, userPlan)
  );

  return (
    <nav>
      {availableItems.map(item => (
        <MenuItem 
          key={item.id}
          item={item}
          isActive={currentPath === item.path}
        />
      ))}
    </nav>
  );
}

function isPlanAllowed(requiredPlan: string, userPlan: string): boolean {
  const planOrder = ['starter', 'commerce', 'enterprise'];
  return planOrder.indexOf(userPlan) >= planOrder.indexOf(requiredPlan);
}
```

### 5.4 Indicadores de Features Bloqueadas

Para guiar al usuario hacia upgrades, mostrar features de planes superiores con indicador visual:

```typescript
interface LockedFeature {
  label: string;
  icon: string;
  requiredPlan: string;
  upgradePath: string;
}

function LockedFeatureBadge({ feature }: { feature: LockedFeature }) {
  return (
    <div class="opacity-50 cursor-pointer hover:opacity-100 transition-opacity"
         onclick={() => navigateToUpgrade(feature.requiredPlan)}>
      <Icon name={feature.icon} />
      <span>{feature.label}</span>
      <Badge type="locked">🔒 {feature.requiredPlan}</Badge>
    </div>
  );
}
```

## 6. Flujo de Usuario

### 6.1 Usuario Starter intenta acceder a feature Commerce

1. Usuario ve el ítem en el menú con indicador 🔒
2. Al hacer clic, se muestra modal:
   ```
   "Esta función está disponible en el plan Commerce"
   [Ver planes] [Cerrar]
   ```
3. Si hace clic en "Ver planes", va a la página de pricing

### 6.2 Usuario alcanza límite de productos

1. Sistema detecta que el usuario llegó al 90% del límite
2. Muestra notificación:
   ```
   "Llegaste al 90% de tu límite de productos (90/100)"
   [Ver planes para ampliar]
   ```
3. Al llegar al 100%, deshabilita botón "Agregar producto" y muestra:
   ```
   "Alcanzaste el límite de tu plan"
   [Ampliar plan]
   ```

## 7. Consideraciones Futuras

### 7.1 Add-ons
- Permitir compra de módulos adicionales sin cambiar de plan
- Ej: "Agregar WhatsApp" por $X/mes en plan Starter

### 7.2 Períodos de prueba
- Trial de 7 días de Commerce para usuarios Starter
- Acceso temporal a features premium

### 7.3 Personalización
- Menú configurable por el admin de la tienda
- Ocultar/mostrar secciones según uso

## 8. Métricas a Tracking

- Clicks en features bloqueadas (indicator de demanda)
- Tasa de conversión de upgrades
- Tiempo hasta alcanzar límite de productos
- Features más usadas por plan

## 9. Dependencias

- Sistema de autenticación y roles
- Base de datos de planes y suscripciones
- API de límites y quotas
- Sistema de notificaciones

## 10. Timeline Estimado

| Fase | Descripción | Duración |
|------|-------------|----------|
| 1 | Estructura base de menú por plan | 1 semana |
| 2 | Implementación de indicadores visuales | 3 días |
| 3 | Sistema de límites y notificaciones | 1 semana |
| 4 | Modales de upgrade y tracking | 4 días |
| 5 | Testing y ajustes | 3 días |

**Total estimado: 3-4 semanas**
