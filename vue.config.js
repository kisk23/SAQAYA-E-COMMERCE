const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  parallel: false,
  lintOnSave: false,

  chainWebpack: (config) => {
    config.plugins.delete('fork-ts-checker')

    config.module
      .rule('ts')
      .use('ts-loader')
      .tap((options) => {
        options.transpileOnly = true
        return options
      })
  },
})
