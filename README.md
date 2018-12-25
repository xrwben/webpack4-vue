# webpack4-vue打包单页应用的基本配置

>2018年12月24日，又是一个平安夜，还是一个人，可能人上了年纪吧，时常感慨光阴短暂，总是要在这几十载岁月中留下点痕迹才算是不枉在世间走一遭。作为一个前端开发，如果说连webpack这样的神奇都不会使，还敢说自己是一名前端er，即使在webpack4之前我还对于webpack一无所知，但是从此时开始学习我也算为时不晚吧。

##### 一、安装webpack
   
   + 全局安装 webpack webpack-cli
   
##### 二、初始化项目

   + git init
   + 安装webpack、webpack-dev-server、webpack-merge
   + 配置好本地开发服务webpack-dev-server、配置好package.json启动
   
##### 三、html模板和清空dist

   + html-webpack-plugin
   + clean-webpack-plugin
   
##### 四、js使用babel转码

   + babel-core、babel-loader
   + babel-preset-env、babel-plugin-transform-runtime、babel-preset-stage-2

##### 五、（css|sass|less）文件打包、添加前缀、分离、压缩

   + css-loader、style-loader
   + node-sass、sass-loader
   + postcss-loader、autoprefixer
   + mini-css-extract-plugin
   + optimize-css-assets-webpack-plugin
   
##### 六、图片字体等资源打包

   + url-loader

##### 七、html中的图片打包

   + html-loader

##### 八、热更新

   + 配置devServer


##### 九、分离不常变化的文件 比如node_modules引用的第三方库打包成一个单独的js文件

   + uglifyjs-webpack-plugin
   
##### 十、安装vue或react

   + vue、vue-loader、vue-template-compiler
   + react、react-dom、babel-preset-react...
   
   
>这些配置大概满足的开发的需求，如果有特殊需求可以修改配置

------

**使用方式：**

   + git clone https://github.com/xrwben/webpack4-vue.git
   
   + npm install 
   
   + 开发：npm run dev 
   
   + 打包： npm run build
 
 
 
