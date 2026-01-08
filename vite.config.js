import { defineConfig } from 'vite';

export default defineConfig({
    base: '/rendergroup/', // Specific base path for the repository
    build: {
        outDir: 'dist',
    },
});
