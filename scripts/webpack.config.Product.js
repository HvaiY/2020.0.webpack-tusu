const path = require("path");
// webpack 创建 index  https://www.npmjs.com/package/html-webpack-plugin
const HtmlWebpackPlugin = require("html-webpack-plugin");
//生成 css
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 配置 dev 启动 --  npm install webpack-dev-server --save-dev
//静态文件copy
const CopyPlugin = require("copy-webpack-plugin");
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
    filename: "static/js/[name].[chunkHash:8].js",
  },

  // css 载入 先安装css-loader  -- npm install --save-dev css-loader
  module: {
    rules: [
      {
        test: /\.css$/i,
        // use: ["style-loader", "css-loader"], //系统的并不会生成css文件 仅仅 js 生成载入样式
        //npm install --save-dev mini-css-extract-plugin
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.less$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          {
            loader: "less-loader",
            options: {},
          },
        ],
      },
      // 文件匹配规则
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          // {
          //   loader: "file-loader",
          //   options: {
          //     name: "static/images/[name].[ext]",
          //     publicPath: "/",
          //   },
          // },
          {
            loader: "url-loader",
            options: {
              limit: 80,
              name: "static/images/[name].[ext]",
              publicPath: "/",
            },
          },
        ],
      },
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
    ],
  },

  //直接自动生成 html
  // plugins: [new HtmlWebpackPlugin()],
  plugins: [
    new HtmlWebpackPlugin({
      title: "webpack",
      //指定模板
      template: "public/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "static/cs/[name].[chunkHash:8].css",
    }),
    new CopyPlugin([
      {
        from: path.resolve(process.cwd(), "src/static/"),
        to: path.resolve(process.cwd(), "dist/static/"),
      },
    ]),
  ],

  // 配置开发环境 端口
  devServer: {
    port: 3000,
    open: true, //自动打开
  },
};
