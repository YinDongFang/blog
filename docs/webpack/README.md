<!--
 * @Author: Ian
 * @Email: 1136005348@qq.com
 * @Date: 2020-06-26 12:02:57
 * @LastEditTime: 2020-06-28 19:22:24
 * @LastEditors: Ian
 * @Description:
-->

# Webpack 学习笔记

## 配置文件

webpack 默认[配置](https://www.webpackjs.com/configuration/)文件为 `webpack.config.js`

```js

module.exports = {

  mode: "production", /* "production" | "development" | "none" */
  /* mode选择webpack打包模式，不同模式会启用不同的优化选项 */

  entry: {
    a: "./app/entry-a",
    b: ["./app/entry-b1", "./app/entry-b2"]
  },
  /* entry是webpack打包的入口文件，以该文件为入口，形成模块依赖图并打包 */
  /* 多入口以object形式配置，a,b为块名，可在output中用[name]占位符表示指定输出文件名，也可在HtmlWebpackPlugin中用于指定不同html文件所使用的模块 */
  /* 默认但入口可以简写为 entry: './app/index.js'，默认的块名为main，相当于entry: {main: './app/index.js'} */

  output: {
    path: path.resolve('dist'),
    // 输出路径，必须是绝对路径
    filename: '[name].[chunkhash:8].js',
    // 输出文件名
    publicPath: '/assets/',
    // 输出解析文件的目录
    // ...
  }

  module: {
    rules: [
      test: /\.js$/,
      use: [{
        loader: 'babel-loader',
        options: {
          // ...
        }
      }]
    ]
  }
  /* 配置模块解析，rules中配置不同的解析规则数组，test匹配文件，use配置loader列表，loader执行顺序从后到前执行。可简写为 use: ['style-loader', 'css-loader']，如果只用一个loader，可简写为字符串 use: 'raw-loader' */


  devtool: 'source-map', /* 'source-map' | 'cheap-source-map' | 'cheap-module-source-map' | ... */
  /* 开启源码映射，不同的规则来控制是否单独生成映射文件等细节 */

  devServer: {
    port: 3000, // 端口
    proxy: {
      '/api': {
        target: "https://other-server.example.com",
        secure: false
      }
    }, // http代理
    contentBase: path.join(__dirname, 'public'),
    compress: true, // 启用gzip压缩
    hot: true, // 热更新，依赖HotModuleReplacementPlugin插件
    open: true, // 是否打开浏览器
    before(app) {
      app.get('/some/path', function(req, res) {
        res.json({ custom: 'response' });
      });
    }// 提供express接口，可以优先于其他中间操作执行
    after(app) {
      // ...
    }// 提供express接口，可以后于其他中间操作执行
  },
  // webpack-dev-server配置

  cache: true,
  // 启用/禁用缓存

  watch: true,
  // 启用观察，用于自动打包

  watchOptions: {
    aggregateTimeout: 1000, // in ms
    // 将多个更改聚合到单个重构建(rebuild)
    poll: true,
    poll: 500, // 间隔单位 ms
    // 启用轮询观察模式
    // 必须用在不通知更改的文件系统中
  },
  // watch配置，watch为true时有效
}

```

## 打包 HTML 文件

### [HtmlWebpackPlugin](https://webpack.js.org/plugins/html-webpack-plugin/)

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: 'index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      // 模板文件路径
      filename: 'index.html',
      // 输出文件名
      title: 'Webpack App',
      // html页面title
      hash: true,
      // 页面中link和script的链接是否加hash
      chunks: ['main'],
      // 页面引入的chunk
      minify: {
        collapseWhitespace: true, // 删除空格换行等
        removeComments: true, // 删除注释
        removeRedundantAttributes: true, // 删除默认属性值
        removeScriptTypeAttributes: true, // 删除 type="text/javascript"
        removeStyleLinkTypeAttributes: true, // 删除 type="text/css"
        useShortDoctype: true, // 简写doctype
      },
      // 文件压缩
    }),
  ],
}
```

## 样式处理

### [css-loader](https://www.webpackjs.com/loaders/css-loader/)

`css-loader` 用于解析 `@import` 和 `url()`

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
}
```

### [style-loader](https://www.webpackjs.com/loaders/style-loader/)

`style-loader` 通过 `<style>` 标签将 css 注入到 HTML 页面中

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              // insertAt: 'bottom'
              insertAt: {
                before: '#id',
              },
              // 插入顺序
              insertInto: '<head>',
              // 插入位置
            },
          },
          'css-loader',
        ],
      },
    ],
  },
}
```

### [less-loader](https://www.webpackjs.com/loaders/less-loader/)

用于将 less 预处理文件转换为 css 格式

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
    ],
  },
}
```

### [MiniCssExtractPlugin](https://webpack.js.org/plugins/mini-css-extract-plugin/)

用于将 css 文件和 html 文件分离，替代 `style-loader`

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
}
```

### [OptimizeCssAssetsWebpackPlugin](https://www.npmjs.com/package/optimize-css-assets-webpack-plugin)

用于优化压缩 css 资源

```js
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  optimization: {
    minimizer: [new OptimizeCssAssetsPlugin()],
  },
}
```

## 转换 ES6 语法

### [babel-loader](https://www.webpackjs.com/loaders/babel-loader/)

用 `babel` 转换 es6 语法

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
}
```

`options` 配置可以通过外部文件 `.babelrc` 进行配置

```json
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react" // 解析react，jsx
  ],
  "plugins": ["@babel/proposal-class-properties"]
}
```

### [转换类属性@babel/plugin-proposal-class-properties](https://www.babeljs.cn/docs/babel-plugin-proposal-class-properties)

#### `Use`

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [['@babel/plugin-proposal-class-properties', {loose: true}]],
          },
        },
      },
    ],
  },
}
```

#### `Input`

```js
class Bork {
  static a = 'foo'
  static b

  x = 'bar'
  y
}
```

#### `Output`

```js
var Bork = function Bork() {
  babelHelpers.classCallCheck(this, Bork)
  Object.defineProperty(this, 'x', {
    configurable: true,
    enumerable: true,
    writable: true,
    value: 'bar',
  })
  Object.defineProperty(this, 'y', {
    configurable: true,
    enumerable: true,
    writable: true,
    value: void 0,
  })
}

Object.defineProperty(Bork, 'a', {
  configurable: true,
  enumerable: true,
  writable: true,
  value: 'foo',
})
Object.defineProperty(Bork, 'b', {
  configurable: true,
  enumerable: true,
  writable: true,
  value: void 0,
})
```

### [装饰器@babel/plugin-proposal-decorators](https://www.babeljs.cn/docs/babel-plugin-proposal-decorators)

支持类装饰器，函数装饰器

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              ['@babel/plugin-proposal-decorators', {legacy: true}],
              ['@babel/plugin-proposal-class-properties', {loose: true}],
            ],
          },
        },
      },
    ],
  },
}
```

## 字体图片等资源处理

### [file-loader](https://www.webpackjs.com/loaders/file-loader/)

打包字体图片等资源文件

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg|jpeg|woff|woff2|ttf|otf|eot)$/,
        use: 'file-loader',
      },
    ],
  },
}
```

### [url-loader](https://www.webpackjs.com/loaders/url-loader/)

`url-loader` 功能类似于 `file-loader`，但是在文件大小（单位 byte）低于指定的限制时，可以返回一个 DataURL，内部也是使用了 `file-loader`

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg|jpeg|woff|woff2|ttf|otf|eot)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192,
          },
        },
      },
    ],
  },
}
```
