const isGitHub = process.env.BUILD_ENV === 'github';

export default {
  base: isGitHub ? '/askfood-webapp/' : '/', // GitHub Pages vs 阿里云
  build: {
    outDir: 'dist',
  },
};
