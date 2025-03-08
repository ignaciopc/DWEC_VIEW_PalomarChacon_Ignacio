import { defineConfig } from 'vite';
import { resolve } from 'path';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  appType: 'mpa',
  base: './',
  root: resolve(__dirname, 'src'),
  build: {
    outDir: '../produccion',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        jquery : resolve(__dirname, 'src/jquery.html'),

      },
    },
    minify: 'terser',
  },
  plugins: [
    createHtmlPlugin({
      minify: true,
    }),
  ],
  server: {
    open: true,
  },
  preview: {
    open: true,
    port: 4173,
  },
});
