import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Los tests de Playwright (e2e/) los corre `pnpm test:e2e`, no vitest.
    include: ["src/**/*.test.ts"],
  },
});
