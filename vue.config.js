const path = require("path");
const vueSrc = "./src";

module.exports = {
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, vueSrc)
      },
      extensions: ['.js', '.vue', '.json', '.sass']
    }
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/sass/variable.scss";
        `
      }
    }
  }
};
