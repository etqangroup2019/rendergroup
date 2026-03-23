import { defineConfig } from 'vite';

export default defineConfig({
    base: process.env.NODE_ENV === 'production' ? '/rendergroup/' : '/',
    build: {
        outDir: 'dist',
    },
    plugins: [], // هذا هو الحل
});