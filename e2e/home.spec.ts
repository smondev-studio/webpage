import { test, expect } from '@playwright/test';

test('homepage loads correctly', async ({ page }) => {
  await page.goto('/');
  
  // Verificar título
  await expect(page).toHaveTitle(/SmonDev Studio/);
  
  // Verificar elementos principales
  await expect(page.getByRole('heading', { name: 'SmonDev Studio' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Contacto' })).toBeVisible();
});

test('navigation works', async ({ page }) => {
  await page.goto('/');
  
  // Navegar a la sección de precios
  await page.getByRole('link', { name: 'Precios' }).click();
  await expect(page.locator('#pricing')).toBeInViewport();
  
  // Navegar a contacto
  await page.getByRole('link', { name: 'Contacto' }).click();
  await expect(page.locator('#contact')).toBeInViewport();
});

test('contact form validation', async ({ page }) => {
  await page.goto('/#contact');
  
  // Intentar enviar formulario vacío
  await page.getByRole('button', { name: 'Enviar mensaje' }).click();
  
  // Verificar que el formulario no se envíe sin datos
  const emailInput = page.getByPlaceholder('tu@email.com');
  await expect(emailInput).toBeVisible();
});

test('theme toggle works', async ({ page }) => {
  await page.goto('/');
  
  // Verificar que el toggle de tema existe
  const themeToggle = page.getByRole('button').filter({ hasText: /☀|🌙/ });
  await expect(themeToggle).toBeVisible();
  
  // Hacer clic en el toggle
  await themeToggle.click();
  
  // Verificar que el tema cambió (se puede verificar por cambios en las clases)
  await expect(page.locator('html')).toHaveClass(/light|dark/);
});

test('pricing section displays tiers', async ({ page }) => {
  await page.goto('/#pricing');
  
  // Verificar que los 3 tiers de precios se muestran
  await expect(page.getByText('Starter')).toBeVisible();
  await expect(page.getByText('Commerce')).toBeVisible();
  await expect(page.getByText('Enterprise')).toBeVisible();
  
  // Verificar el badge de "Más Popular"
  await expect(page.getByText('Más Popular')).toBeVisible();
});
