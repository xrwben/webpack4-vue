const path = require("path");
const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const webpackBaseConfig = require("./webpack-base-conf.js");

module.exports = webpackMerge(webpackBaseConfig, {
  mode: "development",
  plugins: [
    // 全局定义环境变量 
    // 注意，因为这个插件直接执行文本替换，给定的值必须包含字符串本身内的实际引号。
    // 通常，有两种方式来达到这个效果，使用 '"production"', 或者使用 JSON.stringify('production')。
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
  ],
  devServer: {
    host: "localhost",
		port: "8888",
		contentBase: path.resolve(__dirname, "../dist"),
		compress: true,
		hot: true,
		// open: true,
		// inline: true,
		historyApiFallback: true,
		overlay: {
			warnings: true,
			errors: true
		},
		proxy: {
			// "/api": {
			// 	target: "",
			// 	secure: false,
			// }
			// 代理多个
			// context: ["/api"],
			// target: ""
		}
  }
})