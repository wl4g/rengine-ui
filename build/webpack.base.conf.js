var path = require("path")
var utils = require("./utils")
var config = require("../config")
var vueLoaderConfig = require("./vue-loader.conf")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin")
function resolve(dir) {
  return path.join(__dirname, "..", dir)
}

module.exports = {
  entry: {
    app: "./src/main.js",
  },
  output: {
    path: config.build.assetsRoot,
    filename: "[name].js",
    publicPath:
      process.env.NODE_ENV === "production"
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath,
  },
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@": resolve("src"),
      assets: resolve("src/assets"),
      cps: resolve("src/components"),
      views: resolve("src/views"),
      layout: resolve("src/layout"),
      config: resolve("src/config"),
      utils: resolve("src/utils"),
      store: resolve("src/store"),
      filters: resolve("src/filters"),
      mixins: resolve("src/mixins"),
      plugins: resolve("src/plugins"),
      register: resolve("src/register"),
      libs: resolve("src/libs"),
      apis: resolve("src/apis"),
      router: resolve("src/router"),
    },
  },
  module: {
    rules: [
      // {
      //   test: /\.(js|vue)$/,
      //   loader: 'eslint-loader',
      //   enforce: 'pre',
      //   include: [resolve('src'), resolve('test')],
      //   options: {
      //     formatter: require('eslint-friendly-formatter')
      //   }
      // },
      {
        test: /\.js$/,
        loader: "babel-loader",
        options: {
          presets: ["es2015"],
        },
        include: [resolve("src"), resolve("test")],
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: vueLoaderConfig,
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: [resolve("src"), resolve("test")], //,resolve('node_modules/vue-contextmenujs')
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: utils.assetsPath("img/[name].[hash:7].[ext]"),
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: utils.assetsPath("media/[name].[hash:7].[ext]"),
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: utils.assetsPath("fonts/[name].[hash:7].[ext]"),
        },
      },
    ],
  },
  plugins: [
    new MonacoWebpackPlugin({
      languages: ["javascript", "typescript", "json"],
    }),
  ],
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: "empty",
    fs: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty",
  },
}
