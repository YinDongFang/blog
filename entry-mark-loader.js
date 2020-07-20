/*
 * @Author: Ian
 * @Email: 1136005348@qq.com
 * @Date: 2020-07-09 20:04:57
 * @LastEditTime: 2020-07-10 01:01:15
 * @LastEditors: Ian
 * @Description:
 */

const path = require('path')
const {getOptions} = require('loader-utils')

module.exports = function(source) {
  return path.resolve(this.resourcePath) === path.resolve(getOptions(this).entry) ? `'entry'\n${source}` : source
}
