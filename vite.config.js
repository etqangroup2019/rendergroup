import { defineConfig } from 'vite';

export default defineConfig({
    base: './', // Essential for GitHub Pages deployment in subfolders
    build: {
        outDir: 'dist',
    },
});
