/*
 * @Author: Ian
 * @Email: 1136005348@qq.com
 * @Date: 2020-07-09 22:26:15
 * @LastEditTime: 2020-07-20 13:48:31
 * @LastEditors: Ian
 * @Description:
 */

const path = require('path')
const webpack = require('webpack')
const memoryfs = require('memory-fs')

module.exports = (root, entry) => {
  const compiler = webpack({
    entry: ['@babel/polyfill', entry],
    mode: 'development',
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@': root,
      },
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [['@babel/preset-env', {targets: {node: 'current'}}]],
                plugins: [
                  ['@babel/plugin-proposal-decorators', {legacy: true}],
                  ['@babel/plugin-proposal-class-properties', {loose: true}],
                  '@babel/plugin-transform-runtime',
                  './replace-import-to-literal-string',
                  './normalize-route-object',
                  './entry-js-handler',
                ],
              },
            },
            {
              loader: path.resolve('./filepath-directive-loader.js'),
            },
            {
              loader: path.resolve('./entry-mark-loader.js'),
              options: {
                entry,
              },
            },
          ],
        },
      ],
    },
  })

  compiler.outputFileSystem = new memoryfs()

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) reject(err)

      resolve(stats)
    })
  })
}
