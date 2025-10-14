import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/types/index.ts', 'src/schemas/index.ts', 'src/utils/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  external: ['react', 'react-dom'],
});
