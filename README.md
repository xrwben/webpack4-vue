# webpack+vue脚手架改造为typescritp语法

##### 一、安装typscript、ts-loader、vue-class-component、vue-property-decorator
   
   + typescript: ts语法解析

   + ts-loader: webpack打包ts的插件,让webpack识别 .ts .tsx文件

   + vue-class-component: 强化 Vue 组件，使用 TypeScript/装饰器 增强 Vue 组件

   + vue-property-decorator: 在 vue-class-component 上增强更多的结合 Vue 特性的装饰器
   
##### 二、改造文件

   1、将入口文件main.js改为main.ts

   2、将entry入口文件改为.ts结尾

   ```js
   entry: {
      app: path.resolve(__dirname, "../src/main.ts")
   },
   ```

   3、webpack配置resolve.extensions中增加.ts

   ```js
   extensions: [".js", ".json", ".vue", ".ts"]
   ```

   4、增加webpack中的rules规则

   ```js
   {
      test: /\.tsx?$/, // .ts或.tsx结尾的文件
      loader: "ts-loader",
      exclude: /node-modules/,
      options: {
         appendTsSuffixTo: [/\.vue$/]
      }
   }
   ```

##### 三、增加tsconfig.json配置文件

   **详情解释查阅ts文档**

   ```js
   {
      "compilerOptions": {
         "target": "esnext",
         "module": "esnext",
         "strict": true,
         "jsx": "preserve",
         "importHelpers": true,
         "moduleResolution": "node",
         "experimentalDecorators": true,
         "esModuleInterop": true,
         "allowSyntheticDefaultImports": true,
         "sourceMap": true,
         "baseUrl": ".",
         // "types": [
         //   "webpack-env"
         // ],
         "paths": {
            "@/*": [
            "src/*"
            ]
         },
         "lib": [
            "esnext",
            "dom",
            "dom.iterable",
            "scripthost"
         ]
      },
      "include": [
         "src/**/*.ts",
         "src/**/*.tsx",
         "src/**/*.vue",
         "tests/**/*.ts",
         "tests/**/*.tsx"
      ],
      "exclude": [
         "node_modules"
      ]
   }
   ```

##### 四、src目录下增加vue.shims.d.ts文件，让 ts 识别 .vue

   ```js
   declare module '*.vue' {
      import Vue from 'vue';
      export default Vue;
   }
   ```
##### 五、改造.vue文件

   1、在script标签上增加lang="ts"

   ```js
   <script lang="ts">
      //
   </script>
   ```

   2、使用vue-class-component装饰器来改造文件

   文档地址：https://github.com/kaorun343/vue-property-decorator

   本脚手架案例可查看src/page目录中的Login.vue文件

------

**使用方式：**

   + git clone https://github.com/xrwben/webpack4-vue.git

   + git checkout webpack-vue-typescript
   
   + npm install / yarn
   
   + 开发：npm run dev 
   
   + 打包： npm run build
 
 
 
