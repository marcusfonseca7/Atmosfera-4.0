import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        simulacao: resolve(root, 'src/pages/simulacao.html'),
        intro: resolve(root, 'src/pages/intro.html'),
      },
    },
  },
});
