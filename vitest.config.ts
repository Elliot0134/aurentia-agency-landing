import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  test: {
    environment: 'node',
    include: [
      'src/lib/audit/**/*.test.ts',
      'src/workflows/**/*.test.ts',
      'src/app/api/audit/**/*.test.ts',
      'src/app/api/stripe/**/*.test.ts',
    ],
    passWithNoTests: true,
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
});
