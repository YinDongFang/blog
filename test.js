/*
 * @Author: Ian
 * @Email: 1136005348@qq.com
 * @Date: 2020-06-29 17:23:00
 * @LastEditTime: 2020-06-29 18:18:10
 * @LastEditors: Ian
 * @Description:
 */

const babel = require('@babel/core')
const {code} = babel.transformFileSync('./module.js', {plugins: [require('./js2json-plugin.js')]})
console.log(code.replace(/'/g, '"'))
