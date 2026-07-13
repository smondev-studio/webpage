import { describe, it, expect } from 'vitest';

// Mock de los tiers de precios
const pricingTiers = [
  {
    name: 'Starter',
    price: '18.000',
    setup: '20.000',
    description: 'Ideal para comercios pequeños que quieren presencia online rápida',
    features: [
      'Catálogo básico (productos, variantes, fotos)',
      'Checkout con Mercado Pago',
      'Subdominio temporal / dominio propio (opcional)',
      'Panel admin básico: productos, pedidos, clientes',
      'Soporte por mensaje (respuesta 48h)',
      'Importación CSV básica',
    ],
    excluded: [
      'Dominio propio configurado',
      'WhatsApp integrado',
      'Reportes mensuales',
      'SEO avanzado',
    ],
    popular: false,
  },
  {
    name: 'Commerce',
    price: '38.000',
    setup: '35.000',
    description: 'Ideal para comercios con facturación media, integraciones de ventas',
    features: [
      'Todo lo de Starter',
      'Dominio propio y configuración DNS',
      'WhatsApp integrado (botón + plantillas)',
      'Métodos de pago adicionales',
      'Reportes mensuales básicos',
      'Mejora de SEO y optimización',
      'SLA de soporte (respuesta <24h)',
      'Exportación/backup mensual',
    ],
    excluded: [
      'Multi-sucursal',
      'Analytics avanzado',
      'Integración con marketplaces',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: '75.000',
    setup: '50.000',
    description: 'Ideal para cadenas, multi-sucursal, integración avanzada',
    features: [
      'Todo lo de Commerce',
      'Multi-sucursal / multi-ubicación',
      'Integraciones con POS',
      'Analytics avanzado (dashboards, cohortes, funnels)',
      'Soporte prioritario (teléfono / reunión semanal)',
      'Integración con marketplaces y redes sociales',
      'Opciones de white-label',
    ],
    excluded: [],
    popular: false,
  },
];

describe('Pricing Tiers', () => {
  it('debe tener 3 tiers de precios', () => {
    expect(pricingTiers).toHaveLength(3);
  });

  it('debe tener un tier popular', () => {
    const popularTier = pricingTiers.find((tier) => tier.popular);
    expect(popularTier).toBeDefined();
    expect(popularTier?.name).toBe('Commerce');
  });

  it('el tier Starter debe tener el precio más bajo', () => {
    const starter = pricingTiers.find((tier) => tier.name === 'Starter');
    const commerce = pricingTiers.find((tier) => tier.name === 'Commerce');
    const enterprise = pricingTiers.find((tier) => tier.name === 'Enterprise');

    expect(parseFloat(starter!.price.replace('.', ''))).toBeLessThan(
      parseFloat(commerce!.price.replace('.', ''))
    );
    expect(parseFloat(commerce!.price.replace('.', ''))).toBeLessThan(
      parseFloat(enterprise!.price.replace('.', ''))
    );
  });

  it('cada tier debe tener nombre, precio, setup y descripción', () => {
    pricingTiers.forEach((tier) => {
      expect(tier.name).toBeDefined();
      expect(tier.price).toBeDefined();
      expect(tier.setup).toBeDefined();
      expect(tier.description).toBeDefined();
    });
  });

  it('cada tier debe tener features', () => {
    pricingTiers.forEach((tier) => {
      expect(tier.features).toBeDefined();
      expect(tier.features.length).toBeGreaterThan(0);
    });
  });

  it('el tier Enterprise no debe tener features excluidas', () => {
    const enterprise = pricingTiers.find((tier) => tier.name === 'Enterprise');
    expect(enterprise?.excluded).toHaveLength(0);
  });
});
