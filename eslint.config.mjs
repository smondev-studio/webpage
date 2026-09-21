import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astroPlugin from 'eslint-plugin-astro';
import prettierConfig from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astroPlugin.configs.recommended,
  prettierConfig,
  {
    // .claude/.github/.opencode: assets vendorizados de skills de agentes de
    // IA (ej. impeccable) -- no es código propio, no debe lintearse.
    ignores: ['dist/', '.astro/', 'node_modules/', '.claude/', '.github/', '.opencode/'],
  },
  {
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
];
