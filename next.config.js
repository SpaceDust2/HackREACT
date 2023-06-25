/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig

// next.config.js
module.exports = {
    webpack: (config) => {
      // Игнорировать обработку файла canvas.node
      config.module.rules.push({
        test: /canvas\.node$/,
        use: 'ignore-loader',
      });
  
      return config;
    },
  };
  