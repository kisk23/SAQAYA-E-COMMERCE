const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  parallel: false,
  chainWebpack: (config) => {
    // Avoid forked child-process checkers in restricted CI environments.
    config.plugins.delete('fork-ts-checker')
  },
})
