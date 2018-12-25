const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");


module.exports = {
  // mode: "development",
  entry: {
    app: path.resolve(__dirname, "../src/main.js")
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "static/js/[name].[hash].bundle.js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader"],
        exclude: /node_modules/
      },
      {
        test: /\.(css|scss|sass)$/,
        // 从右至左执行，sytle-loader：创建style标签 postcss-loader：添加前缀 需要autoprefixer插件
        use: [
          MiniCssExtractPlugin.loader,
          // "style-loader",
          "css-loader",
          "sass-loader",
          "postcss-loader"
        ]
      },
      {
        test: /\.(png|svg|jpg|gif|ico|woff|woff2|eot|ttf|otf)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              name: "static/img/[name].[hash:7].[ext]"
            }
          }
        ]
      },
      {
        test: /\.(htm|html)$/,
        use: "html-loader"
      },
      {
        test: /\.vue$/,
        use: ["vue-loader"]
      }
    ]
  },
  plugins: [
    // 打包的资源添加到哪个指定的html文件模板，有几个入口文件就new几个HtmlWebpackPlugin()
    new HtmlWebpackPlugin({
      title: "Webpack模板",
      filename: "index.html", // 默认
      template: path.resolve(__dirname, "../index.html"), // 制定那个html模板
      inject: true, // 生成的script标签插入到那个位子（true、body、head、false） 默认body底部,
      favicon: "", // 图标
      // 对浏览器查看源码的操作
      minify: {
        removeComments: true, // 移除注释
        collapseWhitespace: true, // 压缩文件去掉空格
        removeAttributeQuotes: true  // 去掉引号
      },
      cache: true, // 内容变化的时候是否生成一个新的文件
      chunksSortMode: "dependency" // script顺序 有四个值
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
    new VueLoaderPlugin()
  ],
  devtool: process.env.NODE_ENV === "development" ? "#cheap-module-eval-source-map" : "#source-map",
  // 导入不用写扩展名的
	resolve: {
		extensions: [".js", ".json", ".vue"]
	}
}