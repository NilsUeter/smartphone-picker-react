const { injectBabelPlugin } = require("react-app-rewired");

function rewireMobX(config, env) {
  config = injectBabelPlugin(
    ["@babel/plugin-proposal-class-properties", { loose: true }],
    config
  );
  config = injectBabelPlugin(
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    config
  );

  return config;
}

module.exports = rewireMobX;
