# webpack 构建梯子

- ### 全局 npm 初始化 安装 webpack webpack-cli :`npm i webpack webpack-cli -g`
  - 安装完成之后会有 package.json 配置文件
- ### package.json 配置文件 指定 webpack 启动

  ```
  "scripts": {
  "build": "webpack --mode production --config scripts/webpack.config.js",
  "test": "echo \"Error: no test specified\" && exit 1"
  },
  ```

- ### 默认启动无需指定 webpack.config.js 默认需要创建 index.js 文件, 构建默认 main.js `npm run build`
- 使用 webpack.config.js 指定入口文件和输出 js

  ```
  const path = require("path"); // 地址js 文件 path

  module.exports = {
  // webpack  可以配置 入口 ，输出js
  // 默认入口 index.js 输出main.js
  // entry: {
  //   //入口文件可以有多个
  //   home: "./src/home.js",
  //   about: "./src/about.js",
  // },
  entry: "./src/index.js",

  //输出js 路径
  output: {
    //path: path.resolve(__dirname, "../dist"),
    path: path.resolve(process.cwd(), "dist"),
    //输出文件名称 chunkHash 不重复 ，hash 所有的都会是同一个hash
    filename: "js/[name].[chunkHash:8].js",
  },
  ```

- ### 生成 html 文件

  ```
   // webpack 创建 index  https://www.npmjs.com/package/html-webpack-plugin
    const HtmlWebpackPlugin = require("html-webpack-plugin");
   //直接自动生成 html
  // plugins: [new HtmlWebpackPlugin()],
  plugins: [
    new HtmlWebpackPlugin({
      title: "webpack",
      //指定模板
      template: "public/index.html",
    }),

  ```

- ### 使用 css 文件 ，先创建 index.css 文件并增加一个 body 背景色样式 ，需要安装 npm in style-loader -D

  ```
  // css 载入 先安装css-loader  -- npm install --save-dev css-loader
    //直接自动生成 html
  // plugins: [new HtmlWebpackPlugin()],
  plugins: [
    new HtmlWebpackPlugin({
      title: "webpack",
      //指定模板
      template: "public/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "cs/[name].[chunkHash:8].css",
    }),
  ],

  // 可以生成 css
    const MiniCssExtractPlugin = require("mini-css-extract-plugin");

    // css 载入 先安装css-loader  -- npm install --save-dev css-loader
  module: {
    rules: [
      {
        test: /\.css$/i,
        // use: ["style-loader", "css-loader"], //系统的并不会生成css文件 仅仅 js 生成载入样式
        //npm install --save-dev mini-css-extract-plugin
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  ```

- ### 配置 开发环境服务 配置 dev 启动 -- `npm install webpack-dev-server --save-dev`

  package.json 配置 dev 启动则 `npm run dev`

  ```
  "scripts": {
   "build": "webpack --mode production --config scripts/webpack.config.js",
   "dev": "webpack-dev-server --mode development  --config scripts/webpack.config.js",
   "test": "echo \"Error: no test specified\" && exit 1"
  },

   // 配置开发环境 端口
  devServer: {
    port: 3000,
    open: true, //自动打开
  },
  ```

- ### css 预处理 之 Less `npm install less-loader less --save-dev`
  ```
   indes.js --新增了index.less样式
   import "./index.less";
   import "./app.css";
   {
       test: /\.less$/i,
       use: [
         MiniCssExtractPlugin.loader,
         "css-loader",
         {
           loader: "less-loader",
           options: {},
         },
       ],
     },
  ```

* ### css 自动前缀 `npm i postcss-loader autoprefixer -D` 自动替换 适应多种浏览器
  package.json 加上,检查浏览器
  ```
   "browserslist": [
   "cover 99.5%"
  ]
  }
  ```
  增加 postcss.config.js
  ```
  module.exports = {
  plugins: [require("autoprefixer")],
  };
  ```
  webpack.config.js 在 css-loader 之前加上 postcss-loader
  ```
   rules: [
      {
        test: /\.css$/i,
        // use: ["style-loader", "css-loader"], //系统的并不会生成css文件 仅仅 js 生成载入样式
        //npm install --save-dev mini-css-extract-plugin
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
  ```

- ### 图片资源处理 `npm i file-loader --save-dev`
  ```
  css 引用    background: url(/static/images/1.jpg);
   // 文件匹配规则
     {
       test: /\.(png|jpe?g|gif)$/i,
       use: [
         {
           loader: "file-loader",
           options: {
             name: "static/images/[name].[ext]",
             publicPath: "/",
           },
         },
       ],
     },
  ```
  - 还可以是用 url-loader 来将文件处理(base64) `npm i url-loader --save-dev` 其包含 file-loader ,当文件大小小于 80 时那么自动使用 file-loader，否则转 base64
  ```
     {
           loader: "url-loader",
           options: {
             limit: 80,
             name: "static/images/[name].[ext]",
             publicPath: "/",
           },
         },
  ```
- ### 静态文件处理 `npm install copy-webpack-plugin --save-dev`

  ```
  const CopyPlugin = require("copy-webpack-plugin");

   new CopyPlugin([
     {
       from: path.resolve(process.cwd(), "src/static/"),
       to: path.resolve(process.cwd(), "dist/static/"),
     },
  ```

- ### babel 添加 `npm install -D babel-loader @babel/core @babel/preset-env` es6 转 es5
  ```
   {
        test: /\.js$/, //m 代表模块化js   test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
  ```
