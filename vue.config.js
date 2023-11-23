const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          $primary-color: #3498db;
          $secondary-color: #2ecc71;
        `,
      },
    },
  },
})
