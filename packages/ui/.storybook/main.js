const path = require('path');
const { mergeConfig } = require('vite');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  framework: '@storybook/react',
  // core: {
  //   builder: '@storybook/builder-vite',
  // },
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false,
      },
    }
  },
  staticsDirs: ['../public', '../public/assets'],
  async webpackFinal(config, { configType }) {
    config.resolve.alias['react-native'] = 'react-native-web';
    config.module.rules.push({
      loader: 'babel-loader',
      test: /\.jsx?$/,
      options: {
        presets: ['@babel/preset-env', '@babel/preset-react'],
      },
      include: [
        /node_modules\/.*react-native.*/,
      ],
    });
    return config;
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      optimizeDeps: {
        esbuildOptions: {
          loader: {
            '.js': 'jsx',
          },
        },
      },
      base: './',
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '..', 'src'),
          'react-native': 'react-native-web',
        },
      },
      assetsDir: './public/assets',
    });
  },
};

