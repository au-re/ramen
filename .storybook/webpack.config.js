const path = require("path");
const TSDocgenPlugin = require("react-docgen-typescript-webpack-plugin");

module.exports = ({ config }) => {

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve("awesome-typescript-loader"),
    options: {
      configFileName: "./tsconfig.dev.json",
      transpileOnly: true,
      useCache: true,
    },
  });

  config.plugins.push(new TSDocgenPlugin());
  config.resolve.extensions.push(".ts", ".tsx");
  return config;
};