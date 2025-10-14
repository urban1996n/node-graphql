import { defineConfig } from 'tsup'

defineConfig({
  entry: ['public/train_service.ts', 'public/app.ts'],
  format: ['esm'],
  target: 'node18',
  sourcemap: true,
  clean: true,
  dts: false,
  outDir: 'dist'
})
