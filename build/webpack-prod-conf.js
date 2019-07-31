const path = require("path");
const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const webpackBaseConfig = require("./webpack-base-conf.js");

// 当需要分析打包大小时 添加 --report
if (process.env.npm_config_report) {
  const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
  webpackBaseConfig.plugins.push(new BundleAnalyzerPlugin());
}
module.exports = webpackMerge(webpackBaseConfig, {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.(css|scss|sass)$/,
        // 从右至左执行，sytle-loader：创建style标签 postcss-loader：添加前缀 需要autoprefixer插件
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    // 打包之前先清除之前的打包文件
    new CleanWebpackPlugin([path.resolve(__dirname, "../dist")], {
      allowExternal: true // 是否允许清除webpack文件所在目录之外的dist
    }),
    // 把打包的css文件单独提取出来通过link添加到模板,每个包含css的js文件都会创建一个CSS文件,但不支持HMR
    // 这个插件应该只用在 production 配置中，并且在loaders链中不使用 style-loader
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[hash].css",
      chunkFilename: "static/css/[id].[hash].css"
    }),
    // 压缩css文件
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g, // 用于匹配需要优化或者压缩的资源名
      cssProcessor: require("cssnano"), // 用于压缩和优化CSS 的处理器
      cssProcessorPluginOptions: {
        preset: ["default", { discardComments: { removeAll: true } }],
      },
      canPrint: true // 默认 表示插件能否在console中打印信息
    }),
  ],
  optimization: {
    // 允许自己配置来覆盖默认的压缩配置，或者写到plugins也可以
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          warnings: false,
          ecma: 6,
          output: {
            comments: false
          },
          compress: {
            drop_console: true,
            drop_debugger: true
          }
        },
        sourceMap: true,
        parallel: true // 使用多进程并行运行来提高构建速度
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
});