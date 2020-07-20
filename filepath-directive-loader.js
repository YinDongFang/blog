/*
 * @Author: Ian
 * @Email: 1136005348@qq.com
 * @Date: 2020-07-09 20:04:57
 * @LastEditTime: 2020-07-10 00:01:20
 * @LastEditors: Ian
 * @Description:
 */

module.exports = function(source) {
  return `'${this.resourcePath.replace(/\\/g, '/')}'\n${source}`
}
