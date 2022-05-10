module.exports = function(api) {
  api.cache.using(() => process.env.NODE_ENV);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [require.resolve('babel-plugin-module-resolver'), {
        alias: {
          '#': './src',
        },
      }],
    ],
  };
};
