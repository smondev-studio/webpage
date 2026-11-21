// Planes de Store. Fuente de verdad: PRICING_TIERS.md. Los códigos de plan del
// backend (STARTER / COMMERCE / ENTERPRISE) coinciden con estos nombres.
// Solo se listan funciones que la plataforma tiene hoy; lo que no existe
// todavía va en Enterprise "Próximamente".

export interface PricingTier {
  name: string;
  price: string;
  priced: boolean;
  setup: string;
  /** Qué incluye el alta (texto corto para la card). */
  setupIncludes?: string[];
  description: string;
  productLimit: string;
  comingSoon?: boolean;
  features: string[];
  excluded: string[];
  popular: boolean;
}

export const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    price: "50.000",
    priced: true,
    setup: "35.000",
    description:
      "Para empezar a vender online con un catálogo chico y manejarlo a mano",
    productLimit: "Hasta 100 productos",
    features: [
      "Catálogo con variantes de talla y color, y fotos",
      "Carga manual de productos, con borradores",
      "Cobro con Mercado Pago, transferencia o efectivo (con recargo o descuento por método)",
      "Actualización masiva de precios, con vista previa y deshacer",
      "Filtro del catálogo por marca",
      "Tu tienda en un subdominio de smondevstudio.com",
      "Panel de administración: productos, pedidos y clientes",
      "Dashboard con tus números del mes",
      "1 usuario",
      "Soporte por mensaje (respuesta en 48 h)",
    ],
    excluded: [
      "Promociones (packs y combos)",
      "Importación masiva desde Excel",
      "Dominio propio",
      "Códigos de descuento",
      "Analytics y ventas por día",
      "Facturación electrónica",
    ],
    popular: false,
  },
  {
    name: "Commerce",
    price: "80.000",
    priced: true,
    setup: "60.000",
    setupIncludes: [
      "Tienda con tu logo y colores, Mercado Pago, dominio y acompañamiento al lanzamiento",
      "Carga de hasta 500 productos desde tu listado (más de 500 o buscar imágenes se cotiza aparte)",
      "El dominio lo registrás y pagás vos, a tu nombre",
    ],
    description:
      "Para comercios que venden en serio: más productos y todas las herramientas de venta",
    productLimit: "Hasta 1.000 productos",
    features: [
      "Todo lo de Starter",
      "Promociones: packs y combos a precio fijo",
      "Importación masiva desde Excel",
      "Tu dominio propio, con configuración DNS",
      "Códigos de descuento (gift codes)",
      "Analytics: visitas, conversión y ventas por día",
      "Clientes y productos más vendidos",
      "Varios usuarios con roles dentro de la tienda",
      "Facturación electrónica AFIP (beta)",
      "Soporte por mensaje (respuesta en menos de 24 h)",
    ],
    excluded: ["Multi-sucursal", "Integración con marketplaces"],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "A consultar",
    priced: false,
    setup: "",
    description: "Para cadenas y negocios con varias sucursales",
    productLimit: "Productos ilimitados",
    comingSoon: true,
    features: [
      "Todo lo de Commerce",
      "Multi-sucursal / multi-ubicación",
      "Analytics avanzado (cohortes, funnels)",
      "Soporte prioritario (teléfono / reunión semanal)",
      "Integración con marketplaces y redes sociales",
      "Opciones de white-label",
    ],
    excluded: [],
    popular: false,
  },
];

/** "80.000" -> 80000 */
export function parsePrice(value: string): number {
  return Number(value.replace(/\./g, ""));
}
