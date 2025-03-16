const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    configure: (webpackConfig) => {
      const cssRule = webpackConfig.module.rules.find(
        (rule) => rule.test && rule.test.toString().includes('css')
      );
      
      if (cssRule) {
        const cssModuleRule = cssRule.oneOf.find(
          (rule) => rule.test && rule.test.toString().includes('module')
        );
        
        if (cssModuleRule) {
          cssModuleRule.use = cssModuleRule.use.map((loader) => {
            if (loader.loader && loader.loader.includes('postcss-loader')) {
              return {
                ...loader,
                options: {
                  postcssOptions: {
                    plugins: [
                      'postcss-flexbugs-fixes',
                      [
                        'postcss-preset-env',
                        {
                          autoprefixer: {
                            flexbox: 'no-2009',
                          },
                          stage: 3,
                        },
                      ],
                    ],
                  },
                },
              };
            }
            return loader;
          });
        }
      }
      
      return webpackConfig;
    },
  },
  style: {
    postcss: {
      mode: 'extends',
      plugins: [require('postcss-flexbugs-fixes'), require('postcss-preset-env')],
    },
  },
}; 