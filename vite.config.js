import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
    // التحقق من البيئة لتحديد المسار (GitHub Pages vs Cloudflare)
    // GitHub Actions تضع المتغير GITHUB_ACTIONS=true تلقائياً
    const isGitHub = !!process.env.GITHUB_ACTIONS;
    
    return {
        base: isGitHub ? '/rendergroup/' : '/',
        build: {
            outDir: 'dist',
        },
        plugins: [],
    };
});