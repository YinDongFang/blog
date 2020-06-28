/*
 * @Author: Ian
 * @Email: 1136005348@qq.com
 * @Date: 2020-06-23 13:43:03
 * @LastEditTime: 2020-06-27 12:25:12
 * @LastEditors: Ian
 * @Description:
 */

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJs = require('uglifyjs-webpack-plugin')
const OptimizeCss = require('optimize-css-assets-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const {BannerPlugin} = require('webpack')

module.exports = {
  optimization: {
    minimizer: [new OptimizeCss(), new UglifyJs()],
  },
  devServer: {
    port: 3000,
    progress: true,
    contentBase: './build',
    compress: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        pathRewrite: {
        },
      },
    },
  },
  mode: 'production',
  entry: './src/index.js',
  devtool: 'source-map',
  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve('build'),
    publicPath: 'http://localhost:3000',
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')({})],
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')({})],
            },
          },
          'less-loader',
        ],
      },
      // {
      //   test: /\.js$/,
      //   include: path.resolve('src'),
      //   exclude: /node_module/,
      //   use: {
      //     loader: 'eslint-loader',
      //     options: {
      //       enforce: 'pre',
      //     },
      //   },
      // },
      {
        test: /\.js$/,
        include: path.resolve('src'),
        exclude: /node_module/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [['@babel/plugin-proposal-decorators', {legacy: true}], ['@babel/plugin-proposal-class-properties', {loose: true}], '@babel/plugin-transform-runtime'],
          },
        },
      },
      {
        test: /\.(jpg|png|gif)$/,
        include: path.resolve('src'),
        exclude: /node_module/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100 * 1024,
            outputPath: '/img/',
          },
        },
      },
      {
        test: /\.html$/,
        include: path.resolve('src'),
        exclude: /node_module/,
        use: {
          loader: 'html-withimg-loader',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      hash: true,
    }),
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
    new BannerPlugin('develop by ian.yin'),
  ],
}
