const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");


module.exports = {
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
        test: /\.svg$/,
        loader: "svg-sprite-loader",
        include: [path.resolve(__dirname, "../src/asserts/icon")],
        options: {
          symbolId: "x-icon-[name]",
        },
      },
      {
        test: /\.(png|svg|jpg|gif|ico|woff|woff2|eot|ttf|otf)$/i,
        exclude: [path.resolve(__dirname, "../src/asserts/icon")],
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
      favicon: path.resolve(__dirname, "../favicon.ico"), // 图标
      // 对浏览器查看源码的操作
      minify: {
        removeComments: true, // 移除注释
        collapseWhitespace: true, // 压缩文件去掉空格
        removeAttributeQuotes: true  // 去掉引号
      },
      cache: true, // 内容变化的时候是否生成一个新的文件
      chunksSortMode: "dependency" // script顺序 有四个值
    }),
    new VueLoaderPlugin()
  ],
  devtool: process.env.NODE_ENV === "development" ? "inline-source-map" : "source-map",
  // 导入不用写扩展名的
  resolve: {
    extensions: [".js", ".json", ".vue"]
  }
};