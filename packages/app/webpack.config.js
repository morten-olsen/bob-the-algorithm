const path = require("path");
const createExpoWebpackConfigAsync = require("@expo/webpack-config");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  // Use the React refresh plugin in development mode
  if (env.mode === "development") {
    config.plugins.push(
      new ReactRefreshWebpackPlugin({
        forceEnable: true,
      })
    );
  }

  config.module.rules.push({
    test: /\.tsx?$/,
    loader: require.resolve("babel-loader"),
    include: [
      /@morten-olsen\/ui/,
    ],
  });

  return config;
};
