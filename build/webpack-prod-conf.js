const path = require("path");
// const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const webpackBaseConfig = require("./webpack-base-conf.js");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = webpackMerge(webpackBaseConfig, {
  mode: "production",
  optimization: {
    // 允许自己配置来覆盖默认的压缩配置，或者写到plugins也可以
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          ecma: 6,
          output: {
            comments: false
          },
          compress: {
            warnings: false,
            drop_console: true,
            drop_debugger: true
          }
        },
        sourceMap: true,
        parallel: true
      })
    ],
    // 分离不常变化的文件 比如node_modules引用的第三方库打包成一个单独的js文件
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: "vendor",
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          reuseExistingChunk: true,
        }
      }
    }
  }
})