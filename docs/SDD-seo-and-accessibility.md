# SDD: SEO y Accesibilidad para Tiendas

## 1. Visión General

Este documento describe el diseño del sistema de SEO (Search Engine Optimization) y Accesibilidad (WCAG 2.1) para las tiendas de la plataforma SmonDev Studio. Estas funcionalidades son críticas para el posicionamiento en buscadores, la experiencia de usuario inclusiva, y el cumplimiento de estándares web internacionales.

## 2. Objetivos

- **SEO**: Maximizar la visibilidad de las tiendas en buscadores (Google, Bing)
- **Accesibilidad**: Cumplir con WCAG 2.1 nivel AA para inclusión de usuarios con discapacidades
- **Configuración flexible**: Permitir que cada tienda personalice su SEO y accesibilidad
- **Automatización**: Generar automáticamente meta tags, sitemaps, y structured data
- **Performance**: Mantener scores altos en Lighthouse (SEO + Accesibilidad > 90)

## 3. Casos de Uso

### 3.1 SEO

**Escenario 1: Tienda nueva sin configuración**
- Cliente: "Fashion Store" (nueva)
- Problema: No aparece en Google, no tiene meta tags
- Solución: Sistema genera meta tags automáticos basados en nombre y descripción de la tienda

**Escenario 2: Tienda con productos específicos**
- Cliente: "Tech Gadgets"
- Productos: Auriculares, smartphones, laptops
- Requerimiento: Cada producto debe tener meta tags únicos para aparecer en búsquedas específicas

**Escenario 3: Tienda multi-idioma**
- Cliente: "Libros Internacionales"
- Idiomas: Español, Inglés, Portugués
- Requerimiento: hreflang tags para SEO internacional

**Escenario 4: Tienda con blog**
- Cliente: "Recetas Saludables"
- Contenido: Blog con recetas
- Requerimiento: Sitemap dinámico que incluya productos y artículos de blog

### 3.2 Accesibilidad

**Escenario 1: Usuario con discapacidad visual**
- Usuario: Persona ciega que usa lector de pantalla (NVDA, JAWS)
- Necesidad: Navegar la tienda usando solo teclado y lector de pantalla
- Requerimiento: ARIA labels, estructura semántica, alt texts en imágenes

**Escenario 2: Usuario con discapacidad motriz**
- Usuario: Persona con movilidad reducida en manos
- Necesidad: Navegar usando solo teclado (sin mouse)
- Requerimiento: Focus visible, orden de tabulación lógico, atajos de teclado

**Escenario 3: Usuario con daltonismo**
- Usuario: Persona con dificultad para distinguir colores
- Necesidad: No depender solo del color para transmitir información
- Requerimiento: Contraste adecuado, iconos + texto, patrones además de colores

**Escenario 4: Usuario con discapacidad auditiva**
- Usuario: Persona sorda o con pérdida auditiva
- Necesidad: Contenido multimedia con alternativas textuales
- Requerimiento: Subtítulos en videos, transcripciones en audio

## 4. Arquitectura del Sistema

### 4.1 Componentes SEO

```
┌─────────────────────────────────────────────────────────
│                    Tienda Online                         │
─────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────┐  │
│  │ SEO Manager                                       │  │
│  │ - Meta tags (title, description, keywords)        │  │
│  │ - Open Graph (Facebook, LinkedIn)                 │  │
│  │ - Twitter Cards                                   │  │
│  │ - Canonical URLs                                  │  │
│  │ - Hreflang (multi-idioma)                         │  │
│  └──────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────┐  │
│  │ Structured Data (Schema.org)                      │  │
│  │ - Organization                                    │  │
│  │ - Product                                         │  │
│  │ - BreadcrumbList                                  │  │
│  │ - LocalBusiness                                   │  │
│  │ - FAQPage                                         │  │
│  ──────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────┐  │
│  │ Sitemap Generator                                 │  │
│  │ - /sitemap.xml (índice)                           │  │
│  │ - /sitemap-products.xml                           │  │
│  │ - /sitemap-categories.xml                         │  │
│  │ - /sitemap-blog.xml (si aplica)                   │  │
│  └──────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────┐  │
│  │ Robots.txt Manager                                │  │
│  │ - Allow/Deny rules                                │  │
│  │ - Sitemap reference                               │  │
│  │ - Crawl-delay                                     │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### 4.2 Componentes de Accesibilidad

```
┌─────────────────────────────────────────────────────────┐
│                    Tienda Online                         │
├─────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────┐  │
│  │ Accessibility Manager                             │  │
│  │ - ARIA labels y roles                             │  │
│  │ - Focus management                                │  │
│  │ - Skip links                                      │  │
│  │ - Live regions                                    │  │
│  └──────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────┐  │
│  │ Keyboard Navigation                               │  │
│  │ - Tab order lógico                                │  │
│  │ - Focus visible                                   │  │
│  │ - Atajos de teclado                               │  │
│  │ - Modal traps                                     │  │
│  └──────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────┐  │
│  │ Content Accessibility                             │  │
│  │ - Alt texts en imágenes                           │  │
│  │ - Headings jerárquicos (h1-h6)                    │  │
│  │ - Contraste de colores (WCAG AA)                  │  │
│  │ - Textos alternativos en multimedia               │  │
│  └──────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────┐  │
│  │ Accessibility Toolbar (opcional)                  │  │
│  │ - Aumentar/disminuir tamaño de texto              │  │
│  │ - Cambiar contraste                               │  │
│  │ - Resaltar enlaces                                │  │
│  │ - Modo lectura                                    │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

## 5. Implementación Técnica - SEO

### 5.1 Configuración de Tienda

```typescript
// types/seo-config.ts
interface SEOConfig {
  // Meta tags básicos
  title: string;
  description: string;
  keywords: string[];
  author: string;
  
  // Open Graph
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType: 'website' | 'product' | 'article';
  
  // Twitter Cards
  twitterCard: 'summary' | 'summary_large_image';
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  
  // URLs
  canonicalUrl: string;
  alternateUrls?: Array<{
    hreflang: string;
    url: string;
  }>;
  
  // Structured Data
  structuredData: StructuredData[];
  
  // Robots
  robots: {
    index: boolean;
    follow: boolean;
    noarchive?: boolean;
    nosnippet?: boolean;
  };
  
  // Sitemap
  sitemap: {
    enabled: boolean;
    includeProducts: boolean;
    includeCategories: boolean;
    includeBlog: boolean;
    changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    priority: number; // 0.0 - 1.0
  };
}

interface StructuredData {
  type: 'Organization' | 'Product' | 'BreadcrumbList' | 'LocalBusiness' | 'FAQPage';
  data: Record<string, any>;
}
```

### 5.2 Configuración por Defecto

```typescript
// config/default-seo-config.ts
export const DEFAULT_SEO_CONFIG: SEOConfig = {
  title: '',
  description: '',
  keywords: [],
  author: 'SmonDev Studio',
  ogTitle: '',
  ogDescription: '',
  ogImage: '/images/og-default.png',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: '',
  twitterDescription: '',
  twitterImage: '/images/og-default.png',
  canonicalUrl: '',
  robots: {
    index: true,
    follow: true,
  },
  sitemap: {
    enabled: true,
    includeProducts: true,
    includeCategories: true,
    includeBlog: false,
    changeFrequency: 'weekly',
    priority: 0.5,
  },
  structuredData: [],
};
```

### 5.3 Componente SEO Head Manager (SvelteKit)

En SvelteKit, el SEO se maneja usando `<svelte:head>` en las páginas o layouts.

```svelte
<!-- src/lib/components/SEOHead.svelte -->
<script lang="ts">
  import type { SEOConfig } from '$lib/types/seo-config';
  import { generateStructuredData } from '$lib/utils/structured-data';
  
  interface Props {
    config: SEOConfig;
    pageType: 'home' | 'product' | 'category' | 'blog';
    pageData?: Record<string, any>;
  }
  
  let { config, pageType, pageData }: Props = $props();
  
  // Generar título dinámico
  $: title = pageType === 'product' && pageData
    ? `${pageData.name} | ${config.title}`
    : config.title;
  
  // Generar descripción dinámica
  $: description = pageType === 'product' && pageData
    ? pageData.description || config.description
    : config.description;
  
  // Generar URL canónica
  $: canonicalUrl = pageType === 'product' && pageData
    ? `${config.canonicalUrl}/productos/${pageData.slug}`
    : config.canonicalUrl;
  
  // Generar structured data
  $: structuredData = generateStructuredData(pageType, pageData, config);
</script>

<svelte:head>
  <!-- Meta tags básicos -->
  <title>{title}</title>
  <meta name="description" content={description} />
  {#if config.keywords.length > 0}
    <meta name="keywords" content={config.keywords.join(', ')} />
  {/if}
  <meta name="author" content={config.author} />
  
  <!-- Robots -->
  <meta name="robots" content="
    {config.robots.index ? 'index' : 'noindex'},
    {config.robots.follow ? 'follow' : 'nofollow'}
    {config.robots.noarchive ? ', noarchive' : ''}
    {config.robots.nosnippet ? ', nosnippet' : ''}
  " />
  
  <!-- Canonical URL -->
  <link rel="canonical" href={canonicalUrl} />
  
  <!-- Hreflang (multi-idioma) -->
  {#each config.alternateUrls || [] as alt}
    <link
      rel="alternate"
      hreflang={alt.hreflang}
      href={alt.url}
    />
  {/each}
  
  <!-- Open Graph -->
  <meta property="og:type" content={config.ogType} />
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:title" content={config.ogTitle || title} />
  <meta property="og:description" content={config.ogDescription || description} />
  <meta property="og:image" content={config.ogImage} />
  <meta property="og:locale" content="es_AR" />
  <meta property="og:site_name" content={config.title} />
  
  <!-- Twitter Cards -->
  <meta name="twitter:card" content={config.twitterCard} />
  <meta name="twitter:url" content={canonicalUrl} />
  <meta name="twitter:title" content={config.twitterTitle || title} />
  <meta name="twitter:description" content={config.twitterDescription || description} />
  <meta name="twitter:image" content={config.twitterImage} />
  
  <!-- Structured Data -->
  {#each structuredData as data}
    <script type="application/ld+json">
      {JSON.stringify(data)}
    </script>
  {/each}
</svelte:head>
```

```typescript
// src/lib/utils/structured-data.ts
import type { SEOConfig } from '$lib/types/seo-config';

export function generateStructuredData(
  pageType: string,
  pageData: any,
  config: SEOConfig
): Record<string, any>[] {
  const structuredData: Record<string, any>[] = [];
  
  // Organization (todas las páginas)
  structuredData.push({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": config.title,
    "url": config.canonicalUrl,
    "logo": `${config.canonicalUrl}/images/logo.png`,
  });
  
  // Product (página de producto)
  if (pageType === 'product' && pageData) {
    structuredData.push({
      "@context": "https://schema.org",
      "@type": "Product",
      "name": pageData.name,
      "description": pageData.description,
      "image": pageData.images?.map((img: string) => `${config.canonicalUrl}${img}`),
      "offers": {
        "@type": "Offer",
        "priceCurrency": "ARS",
        "price": pageData.price,
        "availability": pageData.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
        "url": `${config.canonicalUrl}/productos/${pageData.slug}`,
      },
    });
  }
  
  // BreadcrumbList (todas las páginas excepto home)
  if (pageType !== 'home' && pageData?.breadcrumbs) {
    structuredData.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": pageData.breadcrumbs.map((crumb: any, index: number) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name,
        "item": `${config.canonicalUrl}${crumb.url}`,
      })),
    });
  }
  
  // LocalBusiness (página de contacto o about)
  if (pageType === 'contact' && pageData?.businessInfo) {
    structuredData.push({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": config.title,
      "image": `${config.canonicalUrl}/images/logo.png`,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": pageData.businessInfo.address,
        "addressLocality": pageData.businessInfo.city,
        "addressCountry": "AR",
      },
      "telephone": pageData.businessInfo.phone,
      "email": pageData.businessInfo.email,
    });
  }
  
  return structuredData;
}
```

**Ejemplo de uso en una página de producto:**

```svelte
<!-- src/routes/productos/[slug]/+page.svelte -->
<script lang="ts">
  import SEOHead from '$lib/components/SEOHead.svelte';
  import { DEFAULT_SEO_CONFIG } from '$lib/config/default-seo-config';
  
  interface PageData {
    name: string;
    description: string;
    price: number;
    stock: number;
    slug: string;
    images: string[];
  }
  
  let { data }: { data: PageData } = $props();
</script>

<SEOHead 
  config={DEFAULT_SEO_CONFIG} 
  pageType="product" 
  {data}
/>

<!-- Contenido de la página -->
<h1>{data.name}</h1>
<p>{data.description}</p>
```
      "offers": {
        "@type": "Offer",
        "priceCurrency": "ARS",
        "price": pageData.price,
        "availability": pageData.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
        "url": `${config.canonicalUrl}/productos/${pageData.slug}`,
      },
    });
  }
  
  // BreadcrumbList (todas las páginas excepto home)
  if (pageType !== 'home' && pageData?.breadcrumbs) {
    structuredData.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": pageData.breadcrumbs.map((crumb: any, index: number) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name,
        "item": `${config.canonicalUrl}${crumb.url}`,
      })),
    });
  }
  
  // LocalBusiness (página de contacto o about)
  if (pageType === 'contact' && pageData?.businessInfo) {
    structuredData.push({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": config.title,
      "image": `${config.canonicalUrl}/images/logo.png`,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": pageData.businessInfo.address,
        "addressLocality": pageData.businessInfo.city,
        "addressCountry": "AR",
      },
      "telephone": pageData.businessInfo.phone,
      "email": pageData.businessInfo.email,
    });
  }
  
  return structuredData;
}
```

### 5.4 Generador de Sitemap (NestJS)

```typescript
// src/seo/services/sitemap.service.ts (Backend - NestJS)
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../products/product.entity';
import { Category } from '../../categories/category.entity';
import { Store } from '../../stores/store.entity';

interface SitemapEntry {
  url: string;
  lastmod?: string;
  changefreq?: string;
  priority?: number;
}

interface SitemapConfig {
  baseUrl: string;
  includeProducts: boolean;
  includeCategories: boolean;
  includeBlog: boolean;
  changeFrequency: string;
  priority: number;
}

@Injectable()
export class SitemapService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Store)
    private storeRepository: Repository<Store>,
  ) {}

  async generateSitemap(config: SitemapConfig): Promise<string> {
    const entries: SitemapEntry[] = [];
    
    // Página principal
    entries.push({
      url: config.baseUrl,
      changefreq: 'daily',
      priority: 1.0,
    });
    
    // Páginas estáticas
    const staticPages = ['/about', '/contact', '/privacy', '/terms'];
    staticPages.forEach(page => {
      entries.push({
        url: `${config.baseUrl}${page}`,
        changefreq: 'monthly',
        priority: 0.5,
      });
    });
    
    // Productos
    if (config.includeProducts) {
      const products = await this.productRepository.find();
      products.forEach(product => {
        entries.push({
          url: `${config.baseUrl}/productos/${product.slug}`,
          lastmod: product.updatedAt?.toISOString(),
          changefreq: config.changeFrequency,
          priority: 0.8,
        });
      });
    }
    
    // Categorías
    if (config.includeCategories) {
      const categories = await this.categoryRepository.find();
      categories.forEach(category => {
        entries.push({
          url: `${config.baseUrl}/categorias/${category.slug}`,
          changefreq: 'weekly',
          priority: 0.7,
        });
      });
    }
    
    // Blog (si aplica)
    if (config.includeBlog) {
      // Implementar según necesidad
    }
    
    // Generar XML
    return this.generateSitemapXML(entries);
  }

  private generateSitemapXML(entries: SitemapEntry[]): string {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${entries.map(entry => `
  <url>
    <loc>${entry.url}</loc>
    ${entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : ''}
    ${entry.changefreq ? `<changefreq>${entry.changefreq}</changefreq>` : ''}
    ${entry.priority !== undefined ? `<priority>${entry.priority}</priority>` : ''}
  </url>
  `).join('')}
</urlset>`;
    
    return xml;
  }
}
```

```typescript
// src/seo/seo.controller.ts (Backend - NestJS)
import { Controller, Get, Req, Res, NotFoundException } from '@nestjs/common';
import { Request, Response } from 'express';
import { SitemapService } from './services/sitemap.service';
import { StoreService } from '../stores/store.service';

@Controller()
export class SeoController {
  constructor(
    private readonly sitemapService: SitemapService,
    private readonly storeService: StoreService,
  ) {}

  @Get('sitemap.xml')
  async getSitemap(@Req() req: Request, @Res() res: Response) {
    const store = await this.storeService.getStoreFromDomain(req.hostname);
    
    if (!store.seo.sitemap.enabled) {
      throw new NotFoundException('Sitemap not available');
    }
    
    const sitemap = await this.sitemapService.generateSitemap({
      baseUrl: `https://${req.hostname}`,
      includeProducts: store.seo.sitemap.includeProducts,
      includeCategories: store.seo.sitemap.includeCategories,
      includeBlog: store.seo.sitemap.includeBlog,
      changeFrequency: store.seo.sitemap.changeFrequency,
      priority: store.seo.sitemap.priority,
    });
    
    res.set('Content-Type', 'application/xml');
    res.send(sitemap);
  }
}
```

### 5.5 Generador de Robots.txt (NestJS)

```typescript
// src/seo/services/robots.service.ts (Backend - NestJS)
import { Injectable } from '@nestjs/common';

interface RobotsConfig {
  baseUrl: string;
  allowPaths: string[];
  disallowPaths: string[];
  sitemapUrl: string;
  crawlDelay?: number;
}

@Injectable()
export class RobotsService {
  generateRobotsTxt(config: RobotsConfig): string {
    let robots = `User-agent: *\n`;
    
    // Allow paths
    config.allowPaths.forEach(path => {
      robots += `Allow: ${path}\n`;
    });
    
    // Disallow paths
    config.disallowPaths.forEach(path => {
      robots += `Disallow: ${path}\n`;
    });
    
    // Crawl delay
    if (config.crawlDelay) {
      robots += `Crawl-delay: ${config.crawlDelay}\n`;
    }
    
    // Sitemap
    robots += `\nSitemap: ${config.sitemapUrl}\n`;
    
    return robots;
  }
}
```

```typescript
// src/seo/seo.controller.ts (Backend - NestJS) - agregar método
@Controller()
export class SeoController {
  constructor(
    private readonly sitemapService: SitemapService,
    private readonly storeService: StoreService,
    private readonly robotsService: RobotsService,
  ) {}

  // ... getSitemap method ...

  @Get('robots.txt')
  getRobotsTxt(@Req() req: Request, @Res() res: Response) {
    const robots = this.robotsService.generateRobotsTxt({
      baseUrl: `https://${req.hostname}`,
      allowPaths: ['/', '/productos', '/categorias'],
      disallowPaths: ['/admin', '/api', '/checkout', '/cart'],
      sitemapUrl: `https://${req.hostname}/sitemap.xml`,
      crawlDelay: 1,
    });
    
    res.set('Content-Type', 'text/plain');
    res.send(robots);
  }
}
```

## 6. Implementación Técnica - Accesibilidad

### 6.1 Configuración de Accesibilidad

```typescript
// types/accessibility-config.ts
interface AccessibilityConfig {
  // Navegación por teclado
  keyboardNavigation: {
    enabled: boolean;
    focusVisible: boolean;
    skipLinks: boolean;
    keyboardShortcuts: boolean;
  };
  
  // ARIA y estructura semántica
  ariaLabels: {
    enabled: boolean;
    liveRegions: boolean;
    roles: boolean;
  };
  
  // Contenido
  content: {
    altTexts: boolean;
    headingHierarchy: boolean;
    colorContrast: 'AA' | 'AAA';
    textAlternatives: boolean;
  };
  
  // Toolbar de accesibilidad (opcional)
  toolbar: {
    enabled: boolean;
    textSize: boolean;
    contrast: boolean;
    highlightLinks: boolean;
    readingMode: boolean;
  };
}

export const DEFAULT_ACCESSIBILITY_CONFIG: AccessibilityConfig = {
  keyboardNavigation: {
    enabled: true,
    focusVisible: true,
    skipLinks: true,
    keyboardShortcuts: true,
  },
  ariaLabels: {
    enabled: true,
    liveRegions: true,
    roles: true,
  },
  content: {
    altTexts: true,
    headingHierarchy: true,
    colorContrast: 'AA',
    textAlternatives: true,
  },
  toolbar: {
    enabled: false,
    textSize: true,
    contrast: true,
    highlightLinks: true,
    readingMode: true,
  },
};
```

### 6.2 Componente Skip Links (SvelteKit)

```svelte
<!-- src/lib/components/SkipLinks.svelte -->
<nav class="skip-links" aria-label="Navegación rápida">
  <a href="#main-content" class="skip-link">
    Saltar al contenido principal
  </a>
  <a href="#navigation" class="skip-link">
    Saltar a la navegación
  </a>
  <a href="#search" class="skip-link">
    Saltar a la búsqueda
  </a>
  <a href="#footer" class="skip-link">
    Saltar al pie de página
  </a>
</nav>

<style>
  .skip-links {
    position: absolute;
    top: -100%;
    left: 0;
    width: 100%;
    z-index: 10000;
  }

  .skip-link {
    position: absolute;
    top: 0;
    left: 0;
    background: #000;
    color: #fff;
    padding: 1rem 2rem;
    text-decoration: none;
    font-weight: 600;
  }

  .skip-link:focus {
    top: 0;
    outline: 3px solid #f97316;
  }
</style>
```

### 6.3 Store de Focus Management (SvelteKit)

```typescript
// src/lib/stores/focusManagement.ts
interface UseFocusManagementReturn {
  trapFocus: (container: HTMLElement) => void;
  releaseFocus: () => void;
}

export function useFocusManagement(): UseFocusManagementReturn {
  let previousFocus: HTMLElement | null = null;
  
  function trapFocus(container: HTMLElement) {
    previousFocus = document.activeElement as HTMLElement;
    
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    firstElement?.focus();
    
    function handleTabKey(e: KeyboardEvent) {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
      
      if (e.key === 'Escape') {
        releaseFocus();
      }
    }
    
    container.addEventListener('keydown', handleTabKey);
  }
  
  function releaseFocus() {
    previousFocus?.focus();
  }
  
  return { trapFocus, releaseFocus };
}
```

### 6.4 Componente de Navegación Accesible (SvelteKit)

```svelte
<!-- src/lib/components/AccessibleNavigation.svelte -->
<script lang="ts">
  interface NavItem {
    id: string;
    label: string;
    href: string;
    children?: Array<{
      id: string;
      label: string;
      href: string;
    }>;
  }
  
  interface Props {
    items: NavItem[];
    currentPath: string;
  }
  
  let { items, currentPath }: Props = $props();
  let expandedItems: string[] = $state([]);
  
  function toggleExpand(itemId: string) {
    if (expandedItems.includes(itemId)) {
      expandedItems = expandedItems.filter(id => id !== itemId);
    } else {
      expandedItems = [...expandedItems, itemId];
    }
  }
</script>

<nav id="navigation" aria-label="Navegación principal">
  <ul role="menubar">
    {#each items as item}
      <li role="none">
        {#if item.children}
          <button
            role="menuitem"
            aria-haspopup="true"
            aria-expanded={expandedItems.includes(item.id)}
            on:click={() => toggleExpand(item.id)}
            class={currentPath.startsWith(item.href) ? 'active' : ''}
          >
            {item.label}
            <span aria-hidden="true">▼</span>
          </button>
          <ul
            role="menu"
            aria-label="Submenú de {item.label}"
            class={expandedItems.includes(item.id) ? 'expanded' : 'collapsed'}
          >
            {#each item.children as child}
              <li role="none">
                <a
                  role="menuitem"
                  href={child.href}
                  class={currentPath === child.href ? 'active' : ''}
                  aria-current={currentPath === child.href ? 'page' : undefined}
                >
                  {child.label}
                </a>
              </li>
            {/each}
          </ul>
        {:else}
          <a
            role="menuitem"
            href={item.href}
            class={currentPath === item.href ? 'active' : ''}
            aria-current={currentPath === item.href ? 'page' : undefined}
          >
            {item.label}
          </a>
        {/if}
      </li>
    {/each}
  </ul>
</nav>
```

### 6.5 Componente de Imagen Accesible (SvelteKit)

```svelte
<!-- src/lib/components/AccessibleImage.svelte -->
<script lang="ts">
  interface Props {
    src: string;
    alt: string;
    decorative?: boolean;
    caption?: string;
  }
  
  let { src, alt, decorative = false, caption }: Props = $props();
</script>

<figure role="group" aria-labelledby={caption ? 'image-caption' : undefined}>
  <img
    {src}
    alt={decorative ? '' : alt}
    role={decorative ? 'presentation' : 'img'}
    loading="lazy"
  />
  {#if caption}
    <figcaption id="image-caption" class="image-caption">
      {caption}
    </figcaption>
  {/if}
</figure>
```

### 6.6 Toolbar de Accesibilidad (SvelteKit)

```svelte
<!-- src/lib/components/AccessibilityToolbar.svelte -->
<script lang="ts">
  import type { AccessibilityConfig } from '$lib/types/accessibility-config';
  
  interface Props {
    config: AccessibilityConfig;
  }
  
  let { config }: Props = $props();
  
  let textSize: number = $state(100);
  let highContrast: boolean = $state(false);
  let highlightLinks: boolean = $state(false);
  let readingMode: boolean = $state(false);
  
  function increaseTextSize() {
    textSize = Math.min(textSize + 10, 150);
    document.documentElement.style.fontSize = `${textSize}%`;
  }
  
  function decreaseTextSize() {
    textSize = Math.max(textSize - 10, 80);
    document.documentElement.style.fontSize = `${textSize}%`;
  }
  
  function resetTextSize() {
    textSize = 100;
    document.documentElement.style.fontSize = '100%';
  }
  
  function toggleHighContrast() {
    highContrast = !highContrast;
    document.documentElement.classList.toggle('high-contrast');
  }
  
  function toggleHighlightLinks() {
    highlightLinks = !highlightLinks;
    document.documentElement.classList.toggle('highlight-links');
  }
  
  function toggleReadingMode() {
    readingMode = !readingMode;
    document.documentElement.classList.toggle('reading-mode');
  }
  
  if (!config.toolbar.enabled) {
    // No renderizar nada
  }
</script>

{#if config.toolbar.enabled}
  <div class="accessibility-toolbar" role="toolbar" aria-label="Herramientas de accesibilidad">
    <button
      on:click={decreaseTextSize}
      aria-label="Disminuir tamaño de texto"
      title="Disminuir texto"
    >
      A-
    </button>
    
    <button
      on:click={resetTextSize}
      aria-label="Restablecer tamaño de texto"
      title="Texto normal"
    >
      A
    </button>
    
    <button
      on:click={increaseTextSize}
      aria-label="Aumentar tamaño de texto"
      title="Aumentar texto"
    >
      A+
    </button>
    
    <div class="toolbar-divider" role="separator"></div>
    
    <button
      on:click={toggleHighContrast}
      aria-label="Alternar alto contraste"
      aria-pressed={highContrast}
      title="Alto contraste"
    >
      🌓
    </button>
    
    <button
      on:click={toggleHighlightLinks}
      aria-label="Resaltar enlaces"
      aria-pressed={highlightLinks}
      title="Resaltar enlaces"
    >
      🔗
    </button>
    
    <button
      on:click={toggleReadingMode}
      aria-label="Modo lectura"
      aria-pressed={readingMode}
      title="Modo lectura"
    >
      
    </button>
  </div>
{/if}
```

### 6.7 Store de Atajos de Teclado (SvelteKit)

```typescript
// src/lib/stores/keyboardShortcuts.ts
interface KeyboardShortcut {
  key: string;
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
  action: () => void;
  description: string;
}

export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]) {
  $effect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      shortcuts.forEach(shortcut => {
        const keyMatch = e.key.toLowerCase() === shortcut.key.toLowerCase();
        const ctrlMatch = shortcut.ctrl ? e.ctrlKey || e.metaKey : !e.ctrlKey && !e.metaKey;
        const altMatch = shortcut.alt ? e.altKey : !e.altKey;
        const shiftMatch = shortcut.shift ? e.shiftKey : !e.shiftKey;
        
        if (keyMatch && ctrlMatch && altMatch && shiftMatch) {
          e.preventDefault();
          shortcut.action();
        }
      });
    }
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });
}

// Ejemplo de uso en un componente Svelte
// <script lang="ts">
//   import { useKeyboardShortcuts } from '$lib/stores/keyboardShortcuts';
//   import { navigate } from '$app/navigation';
//   
//   const shortcuts = [
//     {
//       key: 'k',
//       ctrl: true,
//       action: () => document.getElementById('search')?.focus(),
//       description: 'Buscar',
//     },
//     {
//       key: 'h',
//       alt: true,
//       action: () => navigate('/'),
//       description: 'Ir al inicio',
//     },
//   ];
//   
//   useKeyboardShortcuts(shortcuts);
// </script>
```

```css
/* styles/skip-links.css */
.skip-links {
  position: absolute;
  top: -100%;
  left: 0;
  width: 100%;
  z-index: 10000;
}

.skip-link {
  position: absolute;
  top: 0;
  left: 0;
  background: #000;
  color: #fff;
  padding: 1rem 2rem;
  text-decoration: none;
  font-weight: 600;
}

.skip-link:focus {
  top: 0;
  outline: 3px solid #f97316;
}
```

### 6.3 Hook de Focus Management

```typescript
// hooks/useFocusManagement.ts
interface UseFocusManagementReturn {
  focusRef: React.RefObject<HTMLElement>;
  trapFocus: (container: HTMLElement) => void;
  releaseFocus: () => void;
}

export function useFocusManagement(): UseFocusManagementReturn {
  const focusRef = useRef<HTMLElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  
  const trapFocus = (container: HTMLElement) => {
    previousFocus.current = document.activeElement as HTMLElement;
    
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    firstElement?.focus();
    
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
      
      if (e.key === 'Escape') {
        releaseFocus();
      }
    };
    
    container.addEventListener('keydown', handleTabKey);
  };
  
  const releaseFocus = () => {
    previousFocus.current?.focus();
  };
  
  useEffect(() => {
    return () => {
      releaseFocus();
    };
  }, []);
  
  return { focusRef, trapFocus, releaseFocus };
}
```

### 6.4 Componente de Navegación Accesible

```typescript
// components/AccessibleNavigation.tsx
interface AccessibleNavigationProps {
  items: Array<{
    id: string;
    label: string;
    href: string;
    children?: Array<{
      id: string;
      label: string;
      href: string;
    }>;
  }>;
  currentPath: string;
}

function AccessibleNavigation({ items, currentPath }: AccessibleNavigationProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  
  const toggleExpand = (itemId: string) => {
    setExpandedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };
  
  return (
    <nav id="navigation" aria-label="Navegación principal">
      <ul role="menubar">
        {items.map(item => (
          <li key={item.id} role="none">
            {item.children ? (
              <>
                <button
                  role="menuitem"
                  aria-haspopup="true"
                  aria-expanded={expandedItems.includes(item.id)}
                  onClick={() => toggleExpand(item.id)}
                  class={currentPath.startsWith(item.href) ? 'active' : ''}
                >
                  {item.label}
                  <span aria-hidden="true">▼</span>
                </button>
                <ul
                  role="menu"
                  aria-label={`Submenú de ${item.label}`}
                  class={expandedItems.includes(item.id) ? 'expanded' : 'collapsed'}
                >
                  {item.children.map(child => (
                    <li key={child.id} role="none">
                      <a
                        role="menuitem"
                        href={child.href}
                        class={currentPath === child.href ? 'active' : ''}
                        aria-current={currentPath === child.href ? 'page' : undefined}
                      >
                        {child.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <a
                role="menuitem"
                href={item.href}
                class={currentPath === item.href ? 'active' : ''}
                aria-current={currentPath === item.href ? 'page' : undefined}
              >
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
```

### 6.5 Componente de Imagen Accesible

```typescript
// components/AccessibleImage.tsx
interface AccessibleImageProps {
  src: string;
  alt: string;
  decorative?: boolean;
  caption?: string;
}

function AccessibleImage({ src, alt, decorative = false, caption }: AccessibleImageProps) {
  return (
    <figure role="group" aria-labelledby={caption ? 'image-caption' : undefined}>
      <img
        src={src}
        alt={decorative ? '' : alt}
        role={decorative ? 'presentation' : 'img'}
        loading="lazy"
      />
      {caption && (
        <figcaption id="image-caption" class="image-caption">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
```

### 6.6 Toolbar de Accesibilidad

```typescript
// components/AccessibilityToolbar.tsx
interface AccessibilityToolbarProps {
  config: AccessibilityConfig;
}

function AccessibilityToolbar({ config }: AccessibilityToolbarProps) {
  const [textSize, setTextSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const [highlightLinks, setHighlightLinks] = useState(false);
  const [readingMode, setReadingMode] = useState(false);
  
  const increaseTextSize = () => setTextSize(prev => Math.min(prev + 10, 150));
  const decreaseTextSize = () => setTextSize(prev => Math.max(prev - 10, 80));
  const resetTextSize = () => setTextSize(100);
  
  const toggleHighContrast = () => {
    setHighContrast(prev => !prev);
    document.documentElement.classList.toggle('high-contrast');
  };
  
  const toggleHighlightLinks = () => {
    setHighlightLinks(prev => !prev);
    document.documentElement.classList.toggle('highlight-links');
  };
  
  const toggleReadingMode = () => {
    setReadingMode(prev => !prev);
    document.documentElement.classList.toggle('reading-mode');
  };
  
  if (!config.toolbar.enabled) return null;
  
  return (
    <div class="accessibility-toolbar" role="toolbar" aria-label="Herramientas de accesibilidad">
      <button
        onClick={decreaseTextSize}
        aria-label="Disminuir tamaño de texto"
        title="Disminuir texto"
      >
        A-
      </button>
      
      <button
        onClick={resetTextSize}
        aria-label="Restablecer tamaño de texto"
        title="Texto normal"
      >
        A
      </button>
      
      <button
        onClick={increaseTextSize}
        aria-label="Aumentar tamaño de texto"
        title="Aumentar texto"
      >
        A+
      </button>
      
      <div class="toolbar-divider" role="separator"></div>
      
      <button
        onClick={toggleHighContrast}
        aria-label="Alternar alto contraste"
        aria-pressed={highContrast}
        title="Alto contraste"
      >
        🌓
      </button>
      
      <button
        onClick={toggleHighlightLinks}
        aria-label="Resaltar enlaces"
        aria-pressed={highlightLinks}
        title="Resaltar enlaces"
      >
        🔗
      </button>
      
      <button
        onClick={toggleReadingMode}
        aria-label="Modo lectura"
        aria-pressed={readingMode}
        title="Modo lectura"
      >
        
      </button>
    </div>
  );
}
```

```css
/* styles/accessibility-toolbar.css */
.accessibility-toolbar {
  position: fixed;
  bottom: 100px;
  right: 20px;
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 0.5rem;
  display: flex;
  gap: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 9997;
}

.accessibility-toolbar button {
  width: 40px;
  height: 40px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.accessibility-toolbar button:hover {
  background: #f3f4f6;
  border-color: #f97316;
}

.accessibility-toolbar button[aria-pressed="true"] {
  background: #f97316;
  color: white;
  border-color: #f97316;
}

.toolbar-divider {
  width: 2px;
  background: #e5e7eb;
  margin: 0 0.25rem;
}

/* High contrast mode */
.high-contrast {
  --bg-primary: #000;
  --bg-secondary: #111;
  --text-primary: #fff;
  --text-muted: #ddd;
  --border: #fff;
}

.high-contrast * {
  border-color: #fff !important;
}

/* Highlight links */
.highlight-links a {
  outline: 2px solid #f97316;
  outline-offset: 2px;
  background: rgba(249, 115, 22, 0.1);
}

/* Reading mode */
.reading-mode {
  font-size: 120%;
  line-height: 1.8;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.reading-mode img {
  max-width: 100%;
  height: auto;
}

/* Text size adjustments */
html[style*="font-size"] {
  /* Applied via JavaScript */
}
```

### 6.7 Hook de Atajos de Teclado

```typescript
// hooks/useKeyboardShortcuts.ts
interface KeyboardShortcut {
  key: string;
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
  action: () => void;
  description: string;
}

export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      shortcuts.forEach(shortcut => {
        const keyMatch = e.key.toLowerCase() === shortcut.key.toLowerCase();
        const ctrlMatch = shortcut.ctrl ? e.ctrlKey || e.metaKey : !e.ctrlKey && !e.metaKey;
        const altMatch = shortcut.alt ? e.altKey : !e.altKey;
        const shiftMatch = shortcut.shift ? e.shiftKey : !e.shiftKey;
        
        if (keyMatch && ctrlMatch && altMatch && shiftMatch) {
          e.preventDefault();
          shortcut.action();
        }
      });
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [shortcuts]);
}

// Ejemplo de uso
function Storefront() {
  const shortcuts: KeyboardShortcut[] = [
    {
      key: 'k',
      ctrl: true,
      action: () => document.getElementById('search')?.focus(),
      description: 'Buscar',
    },
    {
      key: 'h',
      alt: true,
      action: () => navigateTo('/'),
      description: 'Ir al inicio',
    },
    {
      key: 'c',
      alt: true,
      action: () => navigateTo('/cart'),
      description: 'Ver carrito',
    },
    {
      key: '?',
      shift: true,
      action: () => setShowShortcutsHelp(true),
      description: 'Mostrar ayuda de atajos',
    },
  ];
  
  useKeyboardShortcuts(shortcuts);
  
  return <div>...</div>;
}
```

## 7. Panel de Administración

### 7.1 Configuración de SEO (SvelteKit)

```svelte
<!-- src/lib/components/admin/SEOSettings.svelte -->
<script lang="ts">
  import type { SEOConfig } from '$lib/types/seo-config';
  
  interface Props {
    config: SEOConfig;
    onSave: (config: SEOConfig) => void;
  }
  
  let { config, onSave }: Props = $props();
  
  let title: string = $state(config.title);
  let description: string = $state(config.description);
  let keywords: string = $state(config.keywords.join(', '));
  let ogImage: string = $state(config.ogImage);
  let canonicalUrl: string = $state(config.canonicalUrl);
  let sitemapEnabled: boolean = $state(config.sitemap.enabled);
  
  function handleSave() {
    const newConfig: SEOConfig = {
      ...config,
      title,
      description,
      keywords: keywords.split(',').map(k => k.trim()).filter(k => k),
      ogImage,
      canonicalUrl,
      sitemap: {
        ...config.sitemap,
        enabled: sitemapEnabled,
      },
    };
    onSave(newConfig);
  }
</script>

<div class="settings-section">
  <h3>Configuración SEO</h3>
  
  <div class="setting-item">
    <label>Título del sitio:</label>
    <input
      type="text"
      bind:value={title}
      placeholder="Mi Tienda Online"
    />
    <p class="setting-description">
      Aparece en los resultados de búsqueda y pestañas del navegador
    </p>
  </div>
  
  <div class="setting-item">
    <label>Descripción:</label>
    <textarea
      bind:value={description}
      placeholder="Descripción breve de tu tienda (150-160 caracteres)"
      rows={3}
      maxLength={160}
    />
    <p class="setting-description">
      {description.length}/160 caracteres
    </p>
  </div>
  
  <div class="setting-item">
    <label>Palabras clave (separadas por coma):</label>
    <input
      type="text"
      bind:value={keywords}
      placeholder="tienda online, productos, Argentina"
    />
  </div>
  
  <div class="setting-item">
    <label>Imagen para redes sociales (Open Graph):</label>
    <input
      type="text"
      bind:value={ogImage}
      placeholder="/images/og-image.png"
    />
  </div>
  
  <div class="setting-item">
    <label>URL canónica:</label>
    <input
      type="text"
      bind:value={canonicalUrl}
      placeholder="https://mitienda.com"
    />
  </div>
  
  <div class="setting-item">
    <label class="toggle-label">
      <input
        type="checkbox"
        bind:checked={sitemapEnabled}
      />
      <span class="toggle-slider"></span>
      <span>Habilitar sitemap.xml</span>
    </label>
    <p class="setting-description">
      Genera automáticamente un sitemap para Google
    </p>
  </div>
  
  <button on:click={handleSave} class="btn-primary">
    Guardar cambios
  </button>
</div>
```

### 7.2 Configuración de Accesibilidad (SvelteKit)

```svelte
<!-- src/lib/components/admin/AccessibilitySettings.svelte -->
<script lang="ts">
  import type { AccessibilityConfig } from '$lib/types/accessibility-config';
  
  interface Props {
    config: AccessibilityConfig;
    onSave: (config: AccessibilityConfig) => void;
  }
  
  let { config, onSave }: Props = $props();
  
  let keyboardNav: boolean = $state(config.keyboardNavigation.enabled);
  let focusVisible: boolean = $state(config.keyboardNavigation.focusVisible);
  let skipLinks: boolean = $state(config.keyboardNavigation.skipLinks);
  let ariaLabels: boolean = $state(config.ariaLabels.enabled);
  let altTexts: boolean = $state(config.content.altTexts);
  let colorContrast: 'AA' | 'AAA' = $state(config.content.colorContrast);
  let toolbarEnabled: boolean = $state(config.toolbar.enabled);
  
  function handleSave() {
    const newConfig: AccessibilityConfig = {
      ...config,
      keyboardNavigation: {
        ...config.keyboardNavigation,
        enabled: keyboardNav,
        focusVisible,
        skipLinks,
      },
      ariaLabels: {
        ...config.ariaLabels,
        enabled: ariaLabels,
      },
      content: {
        ...config.content,
        altTexts,
        colorContrast,
      },
      toolbar: {
        ...config.toolbar,
        enabled: toolbarEnabled,
      },
    };
    onSave(newConfig);
  }
</script>

<div class="settings-section">
  <h3>Configuración de Accesibilidad</h3>
  
  <h4>Navegación por teclado</h4>
  
  <div class="setting-item">
    <label class="toggle-label">
      <input
        type="checkbox"
        bind:checked={keyboardNav}
      />
      <span class="toggle-slider"></span>
      <span>Habilitar navegación por teclado</span>
    </label>
  </div>
  
  <div class="setting-item">
    <label class="toggle-label">
      <input
        type="checkbox"
        bind:checked={focusVisible}
      />
      <span class="toggle-slider"></span>
      <span>Focus visible en elementos interactivos</span>
    </label>
  </div>
  
  <div class="setting-item">
    <label class="toggle-label">
      <input
        type="checkbox"
        bind:checked={skipLinks}
      />
      <span class="toggle-slider"></span>
      <span>Skip links (saltar al contenido)</span>
    </label>
  </div>
  
  <h4>ARIA y estructura</h4>
  
  <div class="setting-item">
    <label class="toggle-label">
      <input
        type="checkbox"
        bind:checked={ariaLabels}
      />
      <span class="toggle-slider"></span>
      <span>Labels ARIA y roles semánticos</span>
    </label>
  </div>
  
  <h4>Contenido</h4>
  
  <div class="setting-item">
    <label class="toggle-label">
      <input
        type="checkbox"
        bind:checked={altTexts}
      />
      <span class="toggle-slider"></span>
      <span>Textos alternativos en imágenes</span>
    </label>
  </div>
  
  <div class="setting-item">
    <label>Nivel de contraste de color:</label>
    <select bind:value={colorContrast}>
      <option value="AA">AA (estándar)</option>
      <option value="AAA">AAA (alto contraste)</option>
    </select>
  </div>
  
  <h4>Toolbar de accesibilidad</h4>
  
  <div class="setting-item">
    <label class="toggle-label">
      <input
        type="checkbox"
        bind:checked={toolbarEnabled}
      />
      <span class="toggle-slider"></span>
      <span>Mostrar toolbar de accesibilidad</span>
    </label>
    <p class="setting-description">
      Permite a los usuarios ajustar tamaño de texto, contraste, etc.
    </p>
  </div>
  
  <button on:click={handleSave} class="btn-primary">
    Guardar cambios
  </button>
</div>
```
      </div>
      
      <div class="setting-item">
        <label class="toggle-label">
          <input
            type="checkbox"
            checked={skipLinks}
            onChange={(e) => setSkipLinks(e.target.checked)}
          />
          <span class="toggle-slider"></span>
          <span>Skip links (saltar al contenido)</span>
        </label>
      </div>
      
      <h4>ARIA y estructura</h4>
      
      <div class="setting-item">
        <label class="toggle-label">
          <input
            type="checkbox"
            checked={ariaLabels}
            onChange={(e) => setAriaLabels(e.target.checked)}
          />
          <span class="toggle-slider"></span>
          <span>Labels ARIA y roles semánticos</span>
        </label>
      </div>
      
      <h4>Contenido</h4>
      
      <div class="setting-item">
        <label class="toggle-label">
          <input
            type="checkbox"
            checked={altTexts}
            onChange={(e) => setAltTexts(e.target.checked)}
          />
          <span class="toggle-slider"></span>
          <span>Textos alternativos en imágenes</span>
        </label>
      </div>
      
      <div class="setting-item">
        <label>Nivel de contraste de color:</label>
        <select
          value={colorContrast}
          onChange={(e) => setColorContrast(e.target.value as 'AA' | 'AAA')}
        >
          <option value="AA">AA (estándar)</option>
          <option value="AAA">AAA (alto contraste)</option>
        </select>
      </div>
      
      <h4>Toolbar de accesibilidad</h4>
      
      <div class="setting-item">
        <label class="toggle-label">
          <input
            type="checkbox"
            checked={toolbarEnabled}
            onChange={(e) => setToolbarEnabled(e.target.checked)}
          />
          <span class="toggle-slider"></span>
          <span>Mostrar toolbar de accesibilidad</span>
        </label>
        <p class="setting-description">
          Permite a los usuarios ajustar tamaño de texto, contraste, etc.
        </p>
      </div>
      
      <button onClick={handleSave} class="btn-primary">
        Guardar cambios
      </button>
    </div>
  );
}
```

## 8. Testing

### 8.1 Testing de SEO (Vitest)

```typescript
// src/lib/__tests__/seo.test.ts
import { describe, it, expect } from 'vitest';
import { DEFAULT_SEO_CONFIG } from '$lib/config/default-seo-config';
import { generateStructuredData } from '$lib/utils/structured-data';
import { SitemapService } from '$lib/services/sitemap.service';
import { RobotsService } from '$lib/services/robots.service';

describe('SEO', () => {
  it('should generate product structured data', () => {
    const config = DEFAULT_SEO_CONFIG;
    const pageData = {
      name: 'Producto Test',
      description: 'Descripción del producto',
      price: 1000,
      stock: 10,
      slug: 'producto-test',
    };
    
    const structuredData = generateStructuredData('product', pageData, config);
    
    expect(structuredData).toHaveLength(2); // Organization + Product
    expect(structuredData[1]['@type']).toBe('Product');
    expect(structuredData[1].name).toBe('Producto Test');
  });
  
  it('should generate sitemap XML', async () => {
    const sitemapService = new SitemapService();
    const config = {
      baseUrl: 'https://mitienda.com',
      includeProducts: true,
      includeCategories: true,
      includeBlog: false,
      changeFrequency: 'weekly',
      priority: 0.5,
    };
    
    const sitemap = await sitemapService.generateSitemap(config);
    
    expect(sitemap).toContain('<?xml version="1.0"');
    expect(sitemap).toContain('<urlset');
    expect(sitemap).toContain('https://mitienda.com');
  });
  
  it('should generate robots.txt', () => {
    const robotsService = new RobotsService();
    const config = {
      baseUrl: 'https://mitienda.com',
      allowPaths: ['/'],
      disallowPaths: ['/admin'],
      sitemapUrl: 'https://mitienda.com/sitemap.xml',
    };
    
    const robots = robotsService.generateRobotsTxt(config);
    
    expect(robots).toContain('User-agent: *');
    expect(robots).toContain('Allow: /');
    expect(robots).toContain('Disallow: /admin');
    expect(robots).toContain('Sitemap: https://mitienda.com/sitemap.xml');
  });
});
```

### 8.2 Testing de Accesibilidad (Vitest + @testing-library/svelte)

```typescript
// src/lib/__tests__/accessibility.test.ts
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import SkipLinks from '$lib/components/SkipLinks.svelte';
import AccessibleNavigation from '$lib/components/AccessibleNavigation.svelte';
import AccessibleImage from '$lib/components/AccessibleImage.svelte';

describe('Accessibility', () => {
  it('should render skip links', () => {
    render(SkipLinks);
    
    expect(screen.getByText('Saltar al contenido principal')).toBeInTheDocument();
    expect(screen.getByText('Saltar a la navegación')).toBeInTheDocument();
  });
  
  it('should render accessible navigation', () => {
    const items = [
      { id: '1', label: 'Inicio', href: '/' },
      { id: '2', label: 'Productos', href: '/productos' },
    ];
    
    render(AccessibleNavigation, { props: { items, currentPath: '/' } });
    
    expect(screen.getByRole('menubar')).toBeInTheDocument();
    expect(screen.getByText('Inicio')).toHaveAttribute('aria-current', 'page');
  });
  
  it('should render accessible image with alt text', () => {
    render(AccessibleImage, { 
      props: {
        src: '/test.jpg',
        alt: 'Descripción de la imagen'
      } 
    });
    
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('alt', 'Descripción de la imagen');
  });
  
  it('should render decorative image without alt text', () => {
    render(AccessibleImage, { 
      props: {
        src: '/decorative.jpg',
        alt: '',
        decorative: true
      } 
    });
    
    const img = screen.getByRole('presentation');
    expect(img).toHaveAttribute('alt', '');
  });
});
```

### 8.3 Testing de Lighthouse (Playwright)

```typescript
// e2e/lighthouse.spec.ts
import { test, expect } from '@playwright/test';

test('Lighthouse SEO score should be above 90', async ({ page }) => {
  // Navegar a la página
  await page.goto('https://mitienda.com');
  
  // Ejecutar Lighthouse (requiere configuración adicional)
  // Ver documentación de Lighthouse CI
  const lighthouseResult = await runLighthouse(page.url());
  
  expect(lighthouseResult.categories.seo.score).toBeGreaterThan(0.9);
});

test('Lighthouse Accessibility score should be above 90', async ({ page }) => {
  await page.goto('https://mitienda.com');
  
  const lighthouseResult = await runLighthouse(page.url());
  
  expect(lighthouseResult.categories.accessibility.score).toBeGreaterThan(0.9);
});
```
    
    expect(screen.getByRole('menubar')).toBeInTheDocument();
    expect(screen.getByText('Inicio')).toHaveAttribute('aria-current', 'page');
  });
  
  it('should render accessible image with alt text', () => {
    render(
      <AccessibleImage
        src="/test.jpg"
        alt="Descripción de la imagen"
      />
    );
    
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('alt', 'Descripción de la imagen');
  });
  
  it('should render decorative image without alt text', () => {
    render(
      <AccessibleImage
        src="/decorative.jpg"
        alt=""
        decorative={true}
      />
    );
    
    const img = screen.getByRole('presentation');
    expect(img).toHaveAttribute('alt', '');
  });
  
  it('should handle keyboard shortcuts', () => {
    const action = jest.fn();
    const shortcuts = [
      { key: 'k', ctrl: true, action, description: 'Buscar' },
    ];
    
    render(<ComponentWithShortcuts shortcuts={shortcuts} />);
    
    fireEvent.keyDown(window, { key: 'k', ctrlKey: true });
    
    expect(action).toHaveBeenCalled();
  });
});
```

### 8.3 Testing de Lighthouse

```typescript
// e2e/lighthouse.spec.ts
import { test, expect } from '@playwright/test';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

test('Lighthouse SEO score should be above 90', async () => {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  
  const result = await lighthouse('https://mitienda.com', {
    port: chrome.port,
    onlyCategories: ['seo'],
  });
  
  expect(result.lhr.categories.seo.score).toBeGreaterThan(0.9);
  
  await chrome.kill();
});

test('Lighthouse Accessibility score should be above 90', async () => {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  
  const result = await lighthouse('https://mitienda.com', {
    port: chrome.port,
    onlyCategories: ['accessibility'],
  });
  
  expect(result.lhr.categories.accessibility.score).toBeGreaterThan(0.9);
  
  await chrome.kill();
});
```

## 9. Base de Datos

### 9.1 Tabla de Configuración SEO

```sql
-- seo_config.sql
CREATE TABLE seo_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  
  -- Meta tags
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  keywords TEXT[] DEFAULT '{}',
  author TEXT DEFAULT 'SmonDev Studio',
  
  -- Open Graph
  og_title TEXT,
  og_description TEXT,
  og_image TEXT DEFAULT '/images/og-default.png',
  og_type TEXT DEFAULT 'website',
  
  -- Twitter Cards
  twitter_card TEXT DEFAULT 'summary_large_image',
  twitter_title TEXT,
  twitter_description TEXT,
  twitter_image TEXT DEFAULT '/images/og-default.png',
  
  -- URLs
  canonical_url TEXT NOT NULL,
  alternate_urls JSONB DEFAULT '[]'::jsonb,
  
  -- Robots
  robots_index BOOLEAN DEFAULT TRUE,
  robots_follow BOOLEAN DEFAULT TRUE,
  robots_noarchive BOOLEAN DEFAULT FALSE,
  robots_nosnippet BOOLEAN DEFAULT FALSE,
  
  -- Sitemap
  sitemap_enabled BOOLEAN DEFAULT TRUE,
  sitemap_include_products BOOLEAN DEFAULT TRUE,
  sitemap_include_categories BOOLEAN DEFAULT TRUE,
  sitemap_include_blog BOOLEAN DEFAULT FALSE,
  sitemap_change_frequency TEXT DEFAULT 'weekly',
  sitemap_priority DECIMAL(2,1) DEFAULT 0.5,
  
  -- Structured Data (JSON)
  structured_data JSONB DEFAULT '[]'::jsonb,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_seo_config_store_id ON seo_config(store_id);
```

### 9.2 Tabla de Configuración de Accesibilidad

```sql
-- accessibility_config.sql
CREATE TABLE accessibility_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  
  -- Keyboard Navigation
  keyboard_navigation_enabled BOOLEAN DEFAULT TRUE,
  keyboard_focus_visible BOOLEAN DEFAULT TRUE,
  keyboard_skip_links BOOLEAN DEFAULT TRUE,
  keyboard_shortcuts BOOLEAN DEFAULT TRUE,
  
  -- ARIA
  aria_labels_enabled BOOLEAN DEFAULT TRUE,
  aria_live_regions BOOLEAN DEFAULT TRUE,
  aria_roles BOOLEAN DEFAULT TRUE,
  
  -- Content
  content_alt_texts BOOLEAN DEFAULT TRUE,
  content_heading_hierarchy BOOLEAN DEFAULT TRUE,
  content_color_contrast TEXT DEFAULT 'AA' CHECK (color_contrast IN ('AA', 'AAA')),
  content_text_alternatives BOOLEAN DEFAULT TRUE,
  
  -- Toolbar
  toolbar_enabled BOOLEAN DEFAULT FALSE,
  toolbar_text_size BOOLEAN DEFAULT TRUE,
  toolbar_contrast BOOLEAN DEFAULT TRUE,
  toolbar_highlight_links BOOLEAN DEFAULT TRUE,
  toolbar_reading_mode BOOLEAN DEFAULT TRUE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_accessibility_config_store_id ON accessibility_config(store_id);
```

## 10. Consideraciones de Performance

### 10.1 Optimizaciones SEO

- **Meta tags en servidor**: Generar meta tags en el servidor (SSR) para que los crawlers los vean
- **Sitemap cacheado**: Cachear el sitemap por 24 horas
- **Lazy loading de imágenes**: Usar `loading="lazy"` en todas las imágenes
- **Imágenes optimizadas**: Usar formatos modernos (WebP, AVIF) con fallback

### 10.2 Optimizaciones de Accesibilidad

- **Skip links sin JavaScript**: Funcionan con CSS puro
- **Focus management eficiente**: No re-renderizar componentes al cambiar focus
- **Toolbar lazy load**: Cargar el toolbar solo cuando el usuario lo necesita
- **ARIA labels estáticos**: Generar ARIA labels en build time cuando sea posible

## 11. Timeline Estimado

| Fase | Descripción | Duración |
|------|-------------|----------|
| 1 | Estructura base y tipos | 2 días |
| 2 | Componentes SEO (meta tags, structured data) | 3 días |
| 3 | Generador de sitemap y robots.txt | 2 días |
| 4 | Componentes de accesibilidad (skip links, focus) | 3 días |
| 5 | Toolbar de accesibilidad | 2 días |
| 6 | Panel de administración | 3 días |
| 7 | Testing (Lighthouse, unit tests) | 3 días |
| 8 | Optimización de performance | 2 días |

**Total estimado: 3-4 semanas**

## 12. Dependencias

- Sistema de configuración de tiendas (NestJS)
- Base de datos (Supabase/PostgreSQL)
- Sistema de routing (SvelteKit)
- Componentes UI (botones, toggles, inputs)
- Lighthouse (para testing)
- Playwright (para e2e testing)
- Svelte 5, SvelteKit
- Vitest, @testing-library/svelte
- NestJS, TypeORM

## 13. Riesgos y Mitigaciones

| Riesgo | Impacto | Mitigación |
|--------|---------|------------|
| Meta tags no se renderizan en SSR | Alto | Usar frameworks con SSR (Next.js, Astro) |
| Sitemap muy grande (>50MB) | Medio | Dividir en múltiples sitemaps |
| Toolbar afecta performance | Bajo | Lazy loading, código optimizado |
| Cambios en algoritmos de Google | Alto | Seguir mejores prácticas, actualizar frecuentemente |

## 14. Éxito del Proyecto

### Métricas de éxito:
- Lighthouse SEO score > 90 en todas las tiendas
- Lighthouse Accessibility score > 90 en todas las tiendas
- 100% de tiendas con sitemap.xml generado
- 100% de tiendas con meta tags configurados
- 0 errores de accesibilidad críticos (WCAG 2.1 AA)

### KPIs de negocio:
- Aumento de 30% en tráfico orgánico (6 meses)
- Reducción de 50% en rebote por problemas de accesibilidad
- Aumento de 20% en conversión (mejor UX)
- 100% de cumplimiento con WCAG 2.1 AA
