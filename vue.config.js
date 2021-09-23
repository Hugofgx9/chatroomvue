const path = require("path");
const vueSrc = "./src";

module.exports = {
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, vueSrc)
      },
      extensions: ['.js', '.vue', '.json', '.sass', '.svg']
    },
    // module: {
    //   rules: [
    //     {
    //       test: /\.svg$/,
    //       use: [
    //         'vue-loader',
    //         'vue-svg-loader',
    //       ],
    //     },
    //   ],
    // }
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/sass/variable.scss";
        `
      }
    }
  },
};
