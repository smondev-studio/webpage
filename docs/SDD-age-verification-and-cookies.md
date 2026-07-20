# SDD: Verificación de Edad y Gestión de Cookies

## 1. Visión General

Este documento describe el diseño del sistema de verificación de edad (18+) y gestión de consentimiento de cookies para las tiendas de la plataforma SmonDev Studio. Estas funcionalidades son requerimientos legales y de compliance para ciertos tipos de negocios (sexshops, growshops, venta de alcohol, etc.) y para cumplimiento de normativas de privacidad (GDPR, Ley de Protección de Datos Argentina).

## 2. Objetivos

- Implementar verificación de edad para tiendas que venden productos restringidos
- Gestionar consentimiento de cookies según normativas internacionales
- Proporcionar configuración flexible por tienda
- Mantener experiencia de usuario fluida y no intrusiva
- Cumplir con regulaciones legales (GDPR, Ley 25.326 Argentina)

## 3. Casos de Uso

### 3.1 Verificación de Edad

**Escenario 1: Sexshop**
- Cliente: "Adultos Ya"
- Productos: Juguetes sexuales, lencería, lubricantes
- Requerimiento: Verificar que el visitante sea mayor de 18 años antes de mostrar el catálogo

**Escenario 2: Growshop**
- Cliente: "Green Garden"
- Productos: Semillas, equipos de cultivo, accesorios
- Requerimiento: Verificación de edad (18+) según legislación local

**Escenario 3: Tienda de alcohol**
- Cliente: "Vinos Premium"
- Productos: Vinos, cervezas artesanales, licores
- Requerimiento: Verificación de edad (18+ o 21+ según país)

### 3.2 Gestión de Cookies

**Escenario 1: Tienda con Google Analytics**
- Cliente: "Fashion Store"
- Cookies: Analytics, Facebook Pixel, Google Ads
- Requerimiento: Consentimiento explícito antes de cargar scripts de tracking

**Escenario 2: Tienda con Mercado Pago**
- Cliente: "Tech Store"
- Cookies: MP cookies de sesión, analytics propio
- Requerimiento: Informar sobre cookies técnicas y de terceros

**Escenario 3: Tienda sin cookies de terceros**
- Cliente: "Artesanías"
- Cookies: Solo cookies técnicas (sesión, carrito)
- Requerimiento: Banner informativo (no requiere consentimiento explícito)

## 4. Arquitectura del Sistema

### 4.1 Componentes

```
┌─────────────────────────────────────────────────────────┐
│                    Tienda Online                         │
├─────────────────────────────────────────────────────────┤
│  ┌───────────────────┐  ┌───────────────────────────┐  │
│  │ Age Verification  │  │ Cookie Consent Manager    │  │
│  │ Modal/Overlay     │  │ Banner + Preferences      │  │
│  └───────────────────┘  └───────────────────────────┘  │
├─────────────────────────────────────────────────────────┤
│  ─────────────────────────────────────────────────┐   │
│  │ Configuration Panel (Admin)                     │   │
│  │ - Enable age verification                       │   │
│  │ - Age threshold (18, 21)                        │   │
│  │ - Cookie categories                             │   │
│  │ - Custom messages                               │   │
│  ─────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────
│  ┌─────────────────────────────────────────────────┐   │
│  │ Storage Layer                                   │   │
│  │ - localStorage (age verified)                   │   │
│  │ - localStorage (cookie consent)                 │   │
│  │ - Database (store configuration)                │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### 4.2 Flujo de Verificación de Edad

```
Usuario llega a la tienda
         │
         ▼
┌─────────────────────┐
│ ¿Age verification   │
│ habilitada?         │
└─────────────────────┘
         │
    ┌────┴────┐
    │         │
   Sí        No
    │         │
    ▼         ▼
┌────────┐  ┌──────────┐
│ ¿Ya    │  │ Mostrar  │
│verifi- │  │ tienda   │
│ cado?  │  │ normal   │
└────────┘  └──────────┘
    │
┌───┴───┐
│       │
Sí      No
│       │
▼       ▼
┌─────┐ ┌──────────────┐
│Show │ │ Show Age     │
│store│ │ Verification │
└─────┘ │ Modal        │
        └──────────────┘
               │
               ▼
        ┌──────────────┐
        │ Usuario      │
        │ ingresa edad │
        └──────────────┘
               │
        ┌──────┴──────┐
        │             │
      ≥18           <18
        │             │
        ▼             ▼
   ┌────────┐   ┌──────────┐
   │ Guardar│   │ Mostrar  │
   │ en     │   │ mensaje  │
   │ localStorage│ de     │
   │ y mostrar│ │ rechazo  │
   │ tienda   │ └──────────┘
   ────────┘
```

### 4.3 Flujo de Gestión de Cookies

```
Usuario llega a la tienda
         │
         ▼
┌─────────────────────┐
│ ¿Cookie consent     │
│ habilitado?         │
└─────────────────────┘
         │
    ┌────┴────┐
    │         │
   Sí        No
    │         │
    ▼         ▼
┌────────┐  ┌──────────┐
│ ¿Ya    │  │ Cargar   │
│consen- │  │ todos    │
│ tido?  │  │ scripts  │
────────┘  └──────────┘
    │
┌───┴───┐
│       │
Sí      No
│       │
▼       ▼
┌─────┐ ┌──────────────┐
│Load │ │ Show Cookie  │
│scripts│ │ Banner     │
│según │ └──────────────┘
│consent│        │
└─────┘        ▼
        ┌──────────────┐
        │ Usuario elige│
        │ opciones     │
        └──────────────┘
               │
        ┌────────────┐
        │             │
   Aceptar todo   Personalizar
        │             │
        ▼             ▼
   ┌────────   ┌──────────┐
   │ Guardar│   │ Mostrar  │
   │ consent│   │ panel de │
   │ y cargar│  │ opciones │
   │ scripts│   └──────────┘
   └────────┘        │
               ┌─────┴─────┐
               │           │
          Aceptar     Rechazar
               │           │
               ▼           ▼
          ┌────────┐  ┌──────────┐
          │ Guardar│  │ Guardar  │
          │ y      │  │ solo     │
          │ cargar │  │ técnicas │
          │ todos  │  ──────────┘
          └────────┘
```

## 5. Implementación Técnica

### 5.1 Configuración de Tienda

```typescript
// types/store-config.ts
interface StoreConfig {
  id: string;
  name: string;
  domain: string;
  
  // Verificación de edad
  ageVerification: {
    enabled: boolean;
    minimumAge: 18 | 21;
    message?: string; // mensaje personalizado
    rejectionMessage?: string; // mensaje si es menor
  };
  
  // Gestión de cookies
  cookieConsent: {
    enabled: boolean;
    required: boolean; // true si usa cookies de terceros
    categories: CookieCategory[];
    bannerMessage?: string;
    privacyPolicyUrl?: string;
  };
}

interface CookieCategory {
  id: string;
  name: string;
  description: string;
  required: boolean; // cookies técnicas (siempre activas)
  scripts: string[]; // IDs de scripts a cargar
}
```

### 5.2 Configuración por Defecto

```typescript
// config/default-store-config.ts
export const DEFAULT_STORE_CONFIG: StoreConfig = {
  id: '',
  name: '',
  domain: '',
  ageVerification: {
    enabled: false,
    minimumAge: 18,
    message: 'Este sitio contiene productos para adultos. ¿Eres mayor de 18 años?',
    rejectionMessage: 'Debes ser mayor de 18 años para acceder a este sitio.',
  },
  cookieConsent: {
    enabled: true,
    required: false,
    categories: [
      {
        id: 'technical',
        name: 'Cookies técnicas',
        description: 'Necesarias para el funcionamiento del sitio (sesión, carrito)',
        required: true,
        scripts: [],
      },
      {
        id: 'analytics',
        name: 'Cookies de análisis',
        description: 'Nos ayudan a entender cómo usas el sitio (Google Analytics)',
        required: false,
        scripts: ['google-analytics', 'facebook-pixel'],
      },
      {
        id: 'marketing',
        name: 'Cookies de marketing',
        description: 'Para mostrarte anuncios relevantes (Google Ads, Meta)',
        required: false,
        scripts: ['google-ads', 'meta-pixel'],
      },
    ],
    bannerMessage: 'Usamos cookies para mejorar tu experiencia. Puedes aceptar todas o personalizar tus preferencias.',
    privacyPolicyUrl: '/privacidad',
  },
};
```

### 5.3 Componente de Verificación de Edad (SvelteKit)

```svelte
<!-- src/lib/components/AgeVerificationModal.svelte -->
<script lang="ts">
  import type { StoreConfig } from '$lib/types/store-config';
  
  interface Props {
    storeConfig: StoreConfig;
    onVerified: () => void;
    onRejected: () => void;
  }
  
  let { storeConfig, onVerified, onRejected }: Props = $props();
  
  let birthDate: string = $state('');
  let error: string = $state('');
  
  const config = storeConfig.ageVerification;
  
  function handleSubmit(e: Event) {
    e.preventDefault();
    
    if (!birthDate) {
      error = 'Por favor ingresa tu fecha de nacimiento';
      return;
    }
    
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    if (age >= config.minimumAge) {
      // Guardar en localStorage
      localStorage.setItem('age_verified', 'true');
      localStorage.setItem('age_verified_date', new Date().toISOString());
      onVerified();
    } else {
      onRejected();
    }
  }
</script>

<div class="age-verification-overlay">
  <div class="age-verification-modal">
    <div class="modal-header">
      <h2>Verificación de Edad</h2>
    </div>
    
    <div class="modal-body">
      <p>{config.message || 'Este sitio contiene productos para adultos. ¿Eres mayor de 18 años?'}</p>
      
      <form on:submit={handleSubmit}>
        <label for="birthDate">Fecha de nacimiento:</label>
        <input
          type="date"
          id="birthDate"
          bind:value={birthDate}
          max={new Date().toISOString().split('T')[0]}
          required
        />
        
        {#if error}
          <p class="error-message">{error}</p>
        {/if}
        
        <div class="modal-actions">
          <button type="submit" class="btn-primary">
            Verificar
          </button>
        </div>
      </form>
      
      <p class="modal-footer-text">
        Al ingresar confirmas que eres mayor de {config.minimumAge} años
      </p>
    </div>
  </div>
</div>
```

```svelte
<!-- src/lib/components/AgeRejectionMessage.svelte -->
<script lang="ts">
  interface Props {
    message: string;
  }
  
  let { message }: Props = $props();
</script>

<div class="age-rejection-page">
  <div class="rejection-content">
    <h1>Acceso Restringido</h1>
    <p>{message || 'Debes ser mayor de 18 años para acceder a este sitio.'}</p>
    <a href="https://www.google.com" class="btn-secondary">
      Volver a Google
    </a>
  </div>
</div>
```

### 5.4 Componente de Consentimiento de Cookies (SvelteKit)

```svelte
<!-- src/lib/components/CookieConsentBanner.svelte -->
<script lang="ts">
  import type { StoreConfig } from '$lib/types/store-config';
  
  interface Props {
    storeConfig: StoreConfig;
    onAccept: (categories: string[]) => void;
    onReject: () => void;
  }
  
  let { storeConfig, onAccept, onReject }: Props = $props();
  
  let showPreferences: boolean = $state(false);
  let selectedCategories: string[] = $state(['technical']);
  
  const config = storeConfig.cookieConsent;
  
  function handleAcceptAll() {
    const allCategories = config.categories.map(c => c.id);
    saveConsent(allCategories);
    onAccept(allCategories);
  }
  
  function handleRejectAll() {
    const requiredCategories = config.categories
      .filter(c => c.required)
      .map(c => c.id);
    saveConsent(requiredCategories);
    onReject();
  }
  
  function handleSavePreferences() {
    saveConsent(selectedCategories);
    onAccept(selectedCategories);
  }
  
  function saveConsent(categories: string[]) {
    const consent = {
      categories,
      timestamp: new Date().toISOString(),
      version: '1.0',
    };
    localStorage.setItem('cookie_consent', JSON.stringify(consent));
  }
  
  function toggleCategory(categoryId: string) {
    const category = config.categories.find(c => c.id === categoryId);
    if (category?.required) return; // No se puede desactivar cookies técnicas
    
    if (selectedCategories.includes(categoryId)) {
      selectedCategories = selectedCategories.filter(id => id !== categoryId);
    } else {
      selectedCategories = [...selectedCategories, categoryId];
    }
  }
</script>

<div class="cookie-consent-banner">
  {#if !showPreferences}
    <!-- Banner simple -->
    <div class="banner-content">
      <p>{config.bannerMessage || 'Usamos cookies para mejorar tu experiencia.'}</p>
      <div class="banner-actions">
        <button on:click={handleAcceptAll} class="btn-primary">
          Aceptar todas
        </button>
        <button on:click={() => showPreferences = true} class="btn-secondary">
          Personalizar
        </button>
        <button on:click={handleRejectAll} class="btn-text">
          Rechazar
        </button>
      </div>
      {#if config.privacyPolicyUrl}
        <a href={config.privacyPolicyUrl} class="privacy-link">
          Política de privacidad
        </a>
      {/if}
    </div>
  {:else}
    <!-- Panel de preferencias -->
    <div class="preferences-panel">
      <h3>Preferencias de Cookies</h3>
      <p class="preferences-description">
        Selecciona qué cookies aceptas. Las cookies técnicas son necesarias para el funcionamiento del sitio.
      </p>
      
      <div class="categories-list">
        {#each config.categories as category}
          <div class="category-item">
            <div class="category-header">
              <label class="category-toggle">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.id)}
                  on:change={() => toggleCategory(category.id)}
                  disabled={category.required}
                />
                <span class="toggle-slider"></span>
              </label>
              <div class="category-info">
                <h4>{category.name}</h4>
                {#if category.required}
                  <span class="required-badge">Requerida</span>
                {/if}
              </div>
            </div>
            <p class="category-description">{category.description}</p>
          </div>
        {/each}
      </div>
      
      <div class="preferences-actions">
        <button on:click={handleSavePreferences} class="btn-primary">
          Guardar preferencias
        </button>
        <button on:click={() => showPreferences = false} class="btn-secondary">
          Volver
        </button>
      </div>
    </div>
  {/if}
</div>
```

### 5.5 Store de Verificación de Edad (SvelteKit)

```typescript
// src/lib/stores/ageVerification.ts
import type { StoreConfig } from '$lib/types/store-config';

interface UseAgeVerificationReturn {
  isVerified: boolean;
  isRejected: boolean;
  verify: () => void;
  reject: () => void;
}

export function useAgeVerification(storeConfig: StoreConfig): UseAgeVerificationReturn {
  let isVerified = $state(false);
  let isRejected = $state(false);
  
  $effect(() => {
    if (!storeConfig.ageVerification.enabled) {
      isVerified = true;
      return;
    }
    
    // Verificar si ya está verificado en localStorage
    const verified = localStorage.getItem('age_verified');
    const verifiedDate = localStorage.getItem('age_verified_date');
    
    if (verified === 'true' && verifiedDate) {
      // Verificar si la verificación no expiró (30 días)
      const daysSinceVerification = 
        (Date.now() - new Date(verifiedDate).getTime()) / (1000 * 60 * 60 * 24);
      
      if (daysSinceVerification < 30) {
        isVerified = true;
        return;
      }
    }
    
    // No verificado, mostrar modal
    isVerified = false;
  });
  
  function verify() {
    isVerified = true;
    isRejected = false;
  }
  
  function reject() {
    isRejected = true;
  }
  
  return { isVerified, isRejected, verify, reject };
}
```

### 5.6 Store de Consentimiento de Cookies (SvelteKit)

```typescript
// src/lib/stores/cookieConsent.ts
import type { StoreConfig } from '$lib/types/store-config';

interface CookieConsent {
  categories: string[];
  timestamp: string;
  version: string;
}

interface UseCookieConsentReturn {
  consent: CookieConsent | null;
  showBanner: boolean;
  acceptCookies: (categories: string[]) => void;
  rejectCookies: () => void;
  hasConsent: (categoryId: string) => boolean;
}

export function useCookieConsent(storeConfig: StoreConfig): UseCookieConsentReturn {
  let consent = $state<CookieConsent | null>(null);
  let showBanner = $state(false);
  
  $effect(() => {
    if (!storeConfig.cookieConsent.enabled) {
      showBanner = false;
      return;
    }
    
    // Verificar si ya hay consentimiento
    const savedConsent = localStorage.getItem('cookie_consent');
    
    if (savedConsent) {
      try {
        const parsed = JSON.parse(savedConsent) as CookieConsent;
        consent = parsed;
        showBanner = false;
        
        // Cargar scripts según consentimiento
        loadScriptsByConsent(parsed.categories, storeConfig);
      } catch (error) {
        console.error('Error parsing cookie consent:', error);
        showBanner = true;
      }
    } else {
      showBanner = true;
    }
  });
  
  function acceptCookies(categories: string[]) {
    const newConsent: CookieConsent = {
      categories,
      timestamp: new Date().toISOString(),
      version: '1.0',
    };
    
    consent = newConsent;
    showBanner = false;
    loadScriptsByConsent(categories, storeConfig);
  }
  
  function rejectCookies() {
    const requiredCategories = storeConfig.cookieConsent.categories
      .filter(c => c.required)
      .map(c => c.id);
    
    acceptCookies(requiredCategories);
  }
  
  function hasConsent(categoryId: string): boolean {
    if (!consent) return false;
    return consent.categories.includes(categoryId);
  }
  
  function loadScriptsByConsent(categories: string[], config: StoreConfig) {
    config.cookieConsent.categories.forEach(category => {
      if (categories.includes(category.id)) {
        category.scripts.forEach(scriptId => {
          loadScript(scriptId);
        });
      }
    });
  }
  
  function loadScript(scriptId: string) {
    // Evitar cargar scripts duplicados
    if (document.getElementById(`script-${scriptId}`)) return;
    
    const scriptConfig = getScriptConfig(scriptId);
    if (!scriptConfig) return;
    
    const script = document.createElement('script');
    script.id = `script-${scriptId}`;
    script.src = scriptConfig.src;
    script.async = scriptConfig.async || false;
    
    if (scriptConfig.onload) {
      script.onload = scriptConfig.onload;
    }
    
    document.head.appendChild(script);
  }
  
  return {
    consent,
    showBanner,
    acceptCookies,
    rejectCookies,
    hasConsent,
  };
}

// Configuración de scripts
interface ScriptConfig {
  src: string;
  async?: boolean;
  onload?: () => void;
}

function getScriptConfig(scriptId: string): ScriptConfig | null {
  const scripts: Record<string, ScriptConfig> = {
    'google-analytics': {
      src: 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID',
      async: true,
      onload: () => {
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', 'GA_MEASUREMENT_ID');
      },
    },
    'facebook-pixel': {
      src: 'https://connect.facebook.net/en_US/fbevents.js',
      async: true,
      onload: () => {
        fbq('init', 'PIXEL_ID');
        fbq('track', 'PageView');
      },
    },
    'google-ads': {
      src: 'https://www.googletagmanager.com/gtag/js?id=AW-CONVERSION_ID',
      async: true,
    },
    'meta-pixel': {
      src: 'https://connect.facebook.net/en_US/fbevents.js',
      async: true,
    },
  };
  
  return scripts[scriptId] || null;
}
```

### 5.7 Componente Principal de la Tienda (SvelteKit)

```svelte
<!-- src/lib/components/Storefront.svelte -->
<script lang="ts">
  import type { StoreConfig } from '$lib/types/store-config';
  import { useAgeVerification } from '$lib/stores/ageVerification';
  import { useCookieConsent } from '$lib/stores/cookieConsent';
  import AgeVerificationModal from './AgeVerificationModal.svelte';
  import AgeRejectionMessage from './AgeRejectionMessage.svelte';
  import CookieConsentBanner from './CookieConsentBanner.svelte';
  import CookiePreferencesButton from './CookiePreferencesButton.svelte';
  
  interface Props {
    storeConfig: StoreConfig;
  }
  
  let { storeConfig, children }: Props = $props();
  
  const { isVerified, isRejected, verify, reject } = useAgeVerification(storeConfig);
  const { showBanner, acceptCookies, rejectCookies, hasConsent } = useCookieConsent(storeConfig);
  
  let showBannerManually = $state(false);
</script>

{#if !isVerified && !isRejected}
  <!-- Si no está verificado, mostrar modal -->
  <AgeVerificationModal
    {storeConfig}
    onVerified={verify}
    onRejected={reject}
  />
{:else if isRejected}
  <!-- Si fue rechazado, mostrar mensaje -->
  <AgeRejectionMessage 
    message={storeConfig.ageVerification.rejectionMessage}
  />
{:else}
  <!-- Contenido de la tienda -->
  {@render children()}
  
  <!-- Banner de cookies -->
  {#if showBanner || showBannerManually}
    <CookieConsentBanner
      {storeConfig}
      onAccept={(categories) => {
        acceptCookies(categories);
        showBannerManually = false;
      }}
      onReject={() => {
        rejectCookies();
        showBannerManually = false;
      }}
    />
  {/if}
  
  <!-- Botón flotante para cambiar preferencias de cookies -->
  {#if hasConsent('technical')}
    <CookiePreferencesButton 
      on:click={() => showBannerManually = true}
    />
  {/if}
{/if}
```

## 6. Panel de Administración

### 6.1 Configuración de Verificación de Edad (SvelteKit)

```svelte
<!-- src/lib/components/admin/AgeVerificationSettings.svelte -->
<script lang="ts">
  import type { StoreConfig } from '$lib/types/store-config';
  
  interface Props {
    storeConfig: StoreConfig;
    onSave: (config: StoreConfig) => void;
  }
  
  let { storeConfig, onSave }: Props = $props();
  
  let enabled: boolean = $state(storeConfig.ageVerification.enabled);
  let minimumAge: 18 | 21 = $state(storeConfig.ageVerification.minimumAge);
  let message: string = $state(storeConfig.ageVerification.message || '');
  let rejectionMessage: string = $state(storeConfig.ageVerification.rejectionMessage || '');
  
  function handleSave() {
    const newConfig: StoreConfig = {
      ...storeConfig,
      ageVerification: {
        enabled,
        minimumAge,
        message,
        rejectionMessage,
      },
    };
    onSave(newConfig);
  }
</script>

<div class="settings-section">
  <h3>Verificación de Edad</h3>
  
  <div class="setting-item">
    <label class="toggle-label">
      <input
        type="checkbox"
        bind:checked={enabled}
      />
      <span class="toggle-slider"></span>
      <span>Habilitar verificación de edad</span>
    </label>
    <p class="setting-description">
      Requiere que los visitantes confirmen su edad antes de acceder a la tienda
    </p>
  </div>
  
  {#if enabled}
    <div class="setting-item">
      <label>Edad mínima:</label>
      <select bind:value={minimumAge}>
        <option value={18}>18 años</option>
        <option value={21}>21 años</option>
      </select>
    </div>
    
    <div class="setting-item">
      <label>Mensaje de verificación:</label>
      <textarea
        bind:value={message}
        placeholder="Este sitio contiene productos para adultos. ¿Eres mayor de 18 años?"
        rows={3}
      />
    </div>
    
    <div class="setting-item">
      <label>Mensaje de rechazo:</label>
      <textarea
        bind:value={rejectionMessage}
        placeholder="Debes ser mayor de 18 años para acceder a este sitio."
        rows={3}
      />
    </div>
  {/if}
  
  <button on:click={handleSave} class="btn-primary">
    Guardar cambios
  </button>
</div>
```

### 6.2 Configuración de Cookies (SvelteKit)

```svelte
<!-- src/lib/components/admin/CookieConsentSettings.svelte -->
<script lang="ts">
  import type { StoreConfig, CookieCategory } from '$lib/types/store-config';
  
  interface Props {
    storeConfig: StoreConfig;
    onSave: (config: StoreConfig) => void;
  }
  
  let { storeConfig, onSave }: Props = $props();
  
  let enabled: boolean = $state(storeConfig.cookieConsent.enabled);
  let bannerMessage: string = $state(storeConfig.cookieConsent.bannerMessage || '');
  let privacyPolicyUrl: string = $state(storeConfig.cookieConsent.privacyPolicyUrl || '');
  let categories: CookieCategory[] = $state(storeConfig.cookieConsent.categories);
  
  function handleSave() {
    const newConfig: StoreConfig = {
      ...storeConfig,
      cookieConsent: {
        enabled,
        required: categories.some(c => !c.required && c.scripts.length > 0),
        categories,
        bannerMessage,
        privacyPolicyUrl,
      },
    };
    onSave(newConfig);
  }
  
  function toggleCategory(categoryId: string) {
    categories = categories.map(cat =>
      cat.id === categoryId && !cat.required
        ? { ...cat, enabled: !cat.enabled }
        : cat
    );
  }
</script>

<div class="settings-section">
  <h3>Gestión de Cookies</h3>
  
  <div class="setting-item">
    <label class="toggle-label">
      <input
        type="checkbox"
        bind:checked={enabled}
      />
      <span class="toggle-slider"></span>
      <span>Habilitar banner de cookies</span>
    </label>
    <p class="setting-description">
      Muestra un banner para que los usuarios acepten o rechacen cookies
    </p>
  </div>
  
  {#if enabled}
    <div class="setting-item">
      <label>Mensaje del banner:</label>
      <textarea
        bind:value={bannerMessage}
        placeholder="Usamos cookies para mejorar tu experiencia..."
        rows={3}
      />
    </div>
    
    <div class="setting-item">
      <label>URL de política de privacidad:</label>
      <input
        type="text"
        bind:value={privacyPolicyUrl}
        placeholder="/privacidad"
      />
    </div>
    
    <div class="setting-item">
      <label>Categorías de cookies:</label>
      <div class="categories-config">
        {#each categories as category}
          <div class="category-config-item">
            <label class="toggle-label">
              <input
                type="checkbox"
                checked={category.enabled || category.required}
                on:change={() => toggleCategory(category.id)}
                disabled={category.required}
              />
              <span class="toggle-slider"></span>
              <span>{category.name}</span>
              {#if category.required}
                <span class="required-badge">Requerida</span>
              {/if}
            </label>
            <p class="category-description">{category.description}</p>
          </div>
        {/each}
      </div>
    </div>
  {/if}
  
  <button on:click={handleSave} class="btn-primary">
    Guardar cambios
  </button>
</div>
```

## 7. Estilos CSS

```css
/* styles/age-verification.css */
.age-verification-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.age-verification-modal {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-header h2 {
  margin: 0 0 1rem 0;
  color: #333;
  font-size: 1.5rem;
}

.modal-body p {
  color: #666;
  margin-bottom: 1.5rem;
}

.modal-body form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.modal-body label {
  font-weight: 600;
  color: #333;
}

.modal-body input[type="date"] {
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}

.btn-primary {
  background: #f97316;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-primary:hover {
  background: #ea580c;
}

.error-message {
  color: #ef4444;
  font-size: 0.875rem;
  margin: 0;
}

.modal-footer-text {
  font-size: 0.75rem;
  color: #999;
  text-align: center;
  margin-top: 1rem;
}

.age-rejection-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f9fafb;
  padding: 2rem;
}

.rejection-content {
  text-align: center;
  max-width: 500px;
}

.rejection-content h1 {
  color: #1f2937;
  margin-bottom: 1rem;
}

.rejection-content p {
  color: #6b7280;
  margin-bottom: 2rem;
}

.btn-secondary {
  background: #6b7280;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  display: inline-block;
}

/* styles/cookie-consent.css */
.cookie-consent-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  z-index: 9998;
  border-top: 1px solid #e5e7eb;
}

.banner-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.banner-content p {
  margin: 0;
  color: #374151;
  flex: 1;
  min-width: 300px;
}

.banner-actions {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.btn-text {
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  font-size: 0.875rem;
  text-decoration: underline;
}

.privacy-link {
  font-size: 0.75rem;
  color: #9ca3af;
  text-decoration: underline;
}

.preferences-panel {
  max-width: 800px;
  margin: 0 auto;
}

.preferences-panel h3 {
  margin: 0 0 1rem 0;
  color: #1f2937;
}

.preferences-description {
  color: #6b7280;
  margin-bottom: 1.5rem;
}

.categories-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.category-item {
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.category-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.category-toggle {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 26px;
}

.category-toggle input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 26px;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .toggle-slider {
  background-color: #f97316;
}

input:checked + .toggle-slider:before {
  transform: translateX(24px);
}

input:disabled + .toggle-slider {
  opacity: 0.5;
  cursor: not-allowed;
}

.category-info h4 {
  margin: 0;
  color: #1f2937;
  font-size: 1rem;
}

.required-badge {
  background: #dbeafe;
  color: #1e40af;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
}

.category-description {
  margin: 0;
  color: #6b7280;
  font-size: 0.875rem;
}

.preferences-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
}

/* Responsive */
@media (max-width: 768px) {
  .banner-content {
    flex-direction: column;
    align-items: stretch;
  }
  
  .banner-actions {
    flex-direction: column;
    width: 100%;
  }
  
  .banner-actions button {
    width: 100%;
  }
}
```

## 8. Base de Datos

### 8.1 Tabla de Configuración de Tiendas

```sql
-- stores_config.sql
CREATE TABLE stores_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  
  -- Verificación de edad
  age_verification_enabled BOOLEAN DEFAULT FALSE,
  age_verification_minimum_age INTEGER DEFAULT 18 CHECK (minimum_age IN (18, 21)),
  age_verification_message TEXT,
  age_verification_rejection_message TEXT,
  
  -- Gestión de cookies
  cookie_consent_enabled BOOLEAN DEFAULT TRUE,
  cookie_consent_banner_message TEXT,
  cookie_consent_privacy_policy_url TEXT,
  
  -- Configuración de categorías de cookies (JSON)
  cookie_categories JSONB DEFAULT '[]'::jsonb,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índice para búsquedas rápidas
CREATE INDEX idx_stores_config_store_id ON stores_config(store_id);

-- Trigger para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_stores_config_updated_at
  BEFORE UPDATE ON stores_config
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

### 8.2 Ejemplo de Datos

```sql
-- Sexshop con verificación de edad
INSERT INTO stores_config (
  store_id,
  age_verification_enabled,
  age_verification_minimum_age,
  age_verification_message,
  cookie_consent_enabled,
  cookie_consent_banner_message
) VALUES (
  'uuid-del-sexshop',
  TRUE,
  18,
  'Este sitio contiene productos para adultos. ¿Eres mayor de 18 años?',
  TRUE,
  'Usamos cookies para mejorar tu experiencia. Puedes aceptar todas o personalizar tus preferencias.'
);

-- Growshop con verificación de edad y cookies de analytics
INSERT INTO stores_config (
  store_id,
  age_verification_enabled,
  age_verification_minimum_age,
  cookie_consent_enabled,
  cookie_categories
) VALUES (
  'uuid-del-growshop',
  TRUE,
  18,
  TRUE,
  '[
    {
      "id": "technical",
      "name": "Cookies técnicas",
      "description": "Necesarias para el funcionamiento del sitio",
      "required": true,
      "scripts": [],
      "enabled": true
    },
    {
      "id": "analytics",
      "name": "Cookies de análisis",
      "description": "Google Analytics para entender el uso del sitio",
      "required": false,
      "scripts": ["google-analytics"],
      "enabled": true
    }
  ]'::jsonb
);
```

## 9. Testing

### 9.1 Test Cases (Vitest + @testing-library/svelte)

```typescript
// src/lib/__tests__/age-verification.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/svelte';
import Storefront from '$lib/components/Storefront.svelte';
import { DEFAULT_STORE_CONFIG } from '$lib/config/default-store-config';

describe('Age Verification', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should show modal when age verification is enabled', () => {
    const config = {
      ...DEFAULT_STORE_CONFIG,
      ageVerification: { enabled: true, minimumAge: 18 },
    };
    
    render(Storefront, { 
      props: { storeConfig: config },
      slots: { default: '<div>Store</div>' }
    });
    
    expect(screen.getByText('Verificación de Edad')).toBeInTheDocument();
  });
  
  it('should not show modal when age verification is disabled', () => {
    const config = {
      ...DEFAULT_STORE_CONFIG,
      ageVerification: { enabled: false, minimumAge: 18 },
    };
    
    render(Storefront, { 
      props: { storeConfig: config },
      slots: { default: '<div>Store</div>' }
    });
    
    expect(screen.queryByText('Verificación de Edad')).not.toBeInTheDocument();
  });
  
  it('should verify age correctly', async () => {
    const config = {
      ...DEFAULT_STORE_CONFIG,
      ageVerification: { enabled: true, minimumAge: 18 },
    };
    
    render(Storefront, { 
      props: { storeConfig: config },
      slots: { default: '<div>Store</div>' }
    });
    
    // Ingresar fecha de nacimiento (25 años)
    const birthDateInput = screen.getByLabelText('Fecha de nacimiento:');
    await fireEvent.input(birthDateInput, {
      target: { value: '1999-01-01' },
    });
    
    await fireEvent.click(screen.getByText('Verificar'));
    
    expect(screen.getByText('Store')).toBeInTheDocument();
  });
  
  it('should reject underage users', async () => {
    const config = {
      ...DEFAULT_STORE_CONFIG,
      ageVerification: { enabled: true, minimumAge: 18 },
    };
    
    render(Storefront, { 
      props: { storeConfig: config },
      slots: { default: '<div>Store</div>' }
    });
    
    // Ingresar fecha de nacimiento (15 años)
    const birthDateInput = screen.getByLabelText('Fecha de nacimiento:');
    await fireEvent.input(birthDateInput, {
      target: { value: '2009-01-01' },
    });
    
    await fireEvent.click(screen.getByText('Verificar'));
    
    expect(screen.getByText('Acceso Restringido')).toBeInTheDocument();
  });
  
  it('should remember verification in localStorage', () => {
    localStorage.setItem('age_verified', 'true');
    localStorage.setItem('age_verified_date', new Date().toISOString());
    
    const config = {
      ...DEFAULT_STORE_CONFIG,
      ageVerification: { enabled: true, minimumAge: 18 },
    };
    
    render(Storefront, { 
      props: { storeConfig: config },
      slots: { default: '<div>Store</div>' }
    });
    
    expect(screen.queryByText('Verificación de Edad')).not.toBeInTheDocument();
  });
});

describe('Cookie Consent', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should show banner when consent is required', () => {
    const config = {
      ...DEFAULT_STORE_CONFIG,
      cookieConsent: { enabled: true, required: true },
    };
    
    render(Storefront, { 
      props: { storeConfig: config },
      slots: { default: '<div>Store</div>' }
    });
    
    expect(screen.getByText(/cookies/i)).toBeInTheDocument();
  });
  
  it('should not show banner when consent is not required', () => {
    const config = {
      ...DEFAULT_STORE_CONFIG,
      cookieConsent: { enabled: false, required: false },
    };
    
    render(Storefront, { 
      props: { storeConfig: config },
      slots: { default: '<div>Store</div>' }
    });
    
    expect(screen.queryByText(/cookies/i)).not.toBeInTheDocument();
  });
  
  it('should save consent to localStorage', async () => {
    const config = {
      ...DEFAULT_STORE_CONFIG,
      cookieConsent: { enabled: true, required: true },
    };
    
    render(Storefront, { 
      props: { storeConfig: config },
      slots: { default: '<div>Store</div>' }
    });
    
    await fireEvent.click(screen.getByText('Aceptar todas'));
    
    const consent = JSON.parse(localStorage.getItem('cookie_consent') || '{}');
    expect(consent.categories).toContain('technical');
    expect(consent.categories).toContain('analytics');
  });
  
  it('should load scripts based on consent', async () => {
    const config = {
      ...DEFAULT_STORE_CONFIG,
      cookieConsent: {
        enabled: true,
        required: true,
        categories: [
          { id: 'technical', name: 'Técnicas', required: true, scripts: [] },
          { id: 'analytics', name: 'Analytics', required: false, scripts: ['google-analytics'] },
        ],
      },
    };
    
    render(Storefront, { 
      props: { storeConfig: config },
      slots: { default: '<div>Store</div>' }
    });
    
    await fireEvent.click(screen.getByText('Aceptar todas'));
    
    // Verificar que el script de Google Analytics se cargó
    const gaScript = document.getElementById('script-google-analytics');
    expect(gaScript).toBeInTheDocument();
  });
});
```

## 10. Consideraciones Legales

### 10.1 Argentina - Ley 25.326

- **Protección de Datos Personales**: Requiere consentimiento explícito para tratamiento de datos
- **Cookies**: No hay regulación específica, pero se recomienda seguir mejores prácticas internacionales
- **Verificación de edad**: Requerida para venta de alcohol, tabaco y productos para adultos

### 10.2 GDPR (Europa)

- **Consentimiento explícito**: Requerido antes de cargar cookies no técnicas
- **Derecho a retirar consentimiento**: Usuario debe poder cambiar preferencias en cualquier momento
- **Información clara**: Describir qué cookies se usan y para qué
- **Registro de consentimiento**: Guardar timestamp y versión del consentimiento

### 10.3 Mejores Prácticas

1. **No condicionar el acceso**: El sitio debe funcionar (al menos básicamente) si el usuario rechaza cookies no esenciales
2. **Renovación periódica**: Pedir consentimiento nuevamente cada 6-12 meses
3. **Documentación**: Mantener registro de consentimientos para auditorías
4. **Transparencia**: Política de privacidad clara y accesible

## 11. Métricas y Analytics

### 11.1 Tracking de Interacción

```typescript
interface ComplianceAnalytics {
  event: 'age_verified' | 'age_rejected' | 'cookie_consent_given' | 'cookie_consent_rejected';
  storeId: string;
  timestamp: Date;
  metadata?: {
    age?: number;
    cookieCategories?: string[];
  };
}

function trackComplianceEvent(event: ComplianceAnalytics) {
  analytics.track(event.event, {
    store_id: event.storeId,
    age: event.metadata?.age,
    cookie_categories: event.metadata?.cookieCategories,
  });
}
```

### 11.2 KPIs de Compliance

- **Tasa de verificación de edad**: % de usuarios que completan la verificación
- **Tasa de rechazo de edad**: % de usuarios menores que intentan acceder
- **Tasa de aceptación de cookies**: % de usuarios que aceptan todas las cookies
- **Tasa de personalización**: % de usuarios que personalizan sus preferencias
- **Tasa de rechazo de cookies**: % de usuarios que rechazan cookies no esenciales

## 12. Timeline Estimado

| Fase | Descripción | Duración |
|------|-------------|----------|
| 1 | Estructura base y tipos | 2 días |
| 2 | Componente de verificación de edad | 3 días |
| 3 | Componente de consentimiento de cookies | 4 días |
| 4 | Panel de administración | 3 días |
| 5 | Integración con base de datos | 2 días |
| 6 | Testing y optimización | 3 días |
| 7 | Documentación legal y políticas | 2 días |

**Total estimado: 3 semanas**

## 13. Dependencias

- Sistema de configuración de tiendas (NestJS)
- Base de datos (Supabase/PostgreSQL)
- Sistema de autenticación (para panel admin)
- Google Analytics / herramientas de tracking
- Componentes UI (botones, modales, toggles)
- Svelte 5, SvelteKit
- Vitest, @testing-library/svelte

## 14. Riesgos y Mitigaciones

| Riesgo | Impacto | Mitigación |
|--------|---------|------------|
| Usuarios abandonan por verificación de edad | Alto | UX clara, mensaje amigable, proceso rápido |
| Cookies bloqueadas afectan funcionalidad | Medio | Graceful degradation, fallbacks |
| Cambios en regulaciones legales | Alto | Configuración flexible, actualizaciones frecuentes |
| Performance por carga condicional de scripts | Bajo | Lazy loading, caching |

## 15. Éxito del Proyecto

### Métricas de éxito:
- 95% de usuarios completan verificación de edad (si aplica)
- 80% de usuarios aceptan al menos cookies técnicas
- 60% de usuarios aceptan cookies de analytics
- 0 violaciones de compliance legal
- < 1% de tasa de abandono por verificación de edad

### KPIs de negocio:
- Reducción de 90% en riesgo legal por venta a menores
- Cumplimiento 100% con GDPR para tiendas europeas
- Aumento de 15% en confianza del usuario (encuestas)
