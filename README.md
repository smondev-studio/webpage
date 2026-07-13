# SmonDev Studio — Landing Page

Landing page para SmonDev Studio, servicio de desarrollo de e-commerce multi-tenant en Argentina. Ofrecemos plataformas de tiendas online completas con catálogo, pagos con Mercado Pago, panel de administración y soporte integral.

## 🚀 Stack Tecnológico

- **Framework**: Astro 6.4.3
- **Estilos**: TailwindCSS v4
- **Lenguaje**: TypeScript
- **Testing**: Vitest
- **Icons**: Lucide Astro
- **Base de datos**: Supabase (formularios de contacto)
- **Gestor de paquetes**: pnpm

## 📁 Estructura del Proyecto

```text
/
├── public/              # Assets estáticos (imágenes, favicon)
├── src/
│   ├── components/      # Componentes Astro (Hero, Features, Pricing, etc.)
│   ├── layouts/         # Layouts base
│   ├── lib/            # Utilidades y lógica de negocio
│   │   ├── __tests__/   # Tests unitarios
│   │   ├── contact.ts   # Lógica del formulario de contacto
│   │   └── projects.ts # API de portfolio
│   ├── pages/           # Páginas (rutas)
│   └── styles/          # Estilos globales
├── .env.example         # Variables de entorno de ejemplo
├── PRICING_TIERS.md     # Documentación de planes y precios
└── package.json
```

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env.local` basándote en `.env.example`:

```bash
# Supabase (para formulario de contacto)
PUBLIC_SUPABASE_URL=tu_url_de_supabase
PUBLIC_SUPABASE_ANON_KEY=tu_anon_key

# API de portfolio (opcional)
PUBLIC_API_URL=tu_api_url
```

### Instalación

```bash
pnpm install
```

## 🧞 Comandos

Todos los comandos se ejecutan desde la raíz del proyecto:

| Comando                | Acción                                           |
| :--------------------- | :----------------------------------------------- |
| `pnpm dev`             | Inicia servidor de desarrollo en `localhost:4321` |
| `pnpm build`           | Build para producción en `./dist/`              |
| `pnpm preview`         | Previsualiza el build localmente                |
| `pnpm test`            | Ejecuta tests unitarios                         |
| `pnpm test:watch`      | Ejecuta tests en modo watch                      |

## 🎨 Características

- **Tema Dark/Light**: Toggle de tema con persistencia en localStorage
- **Responsive**: Diseño adaptado a mobile, tablet y desktop
- **SEO Optimizado**: Meta tags, URLs amigables
- **Formulario de Contacto**: Validación, geolocalización, integración con Supabase
- **Portfolio Dinámico**: Carga de tiendas desde API externa
- **Componentes Modulares**: Arquitectura de componentes reutilizables

## 📄 Documentación Adicional

- `PRICING_TIERS.md`: Planes de precios y modelo de negocio detallado

## � Despliegue

El sitio está configurado para desplegarse en `https://smondevstudio.com`. Para desplegar:

1. Build del proyecto: `pnpm build`
2. Sube el contenido de `dist/` a tu hosting
3. Configura las variables de entorno en producción

## 👀 Recursos

- [Documentación de Astro](https://docs.astro.build)
- [Documentación de TailwindCSS](https://tailwindcss.com)
- [Documentación de Supabase](https://supabase.com/docs)
