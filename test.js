/*
 * @Author: Ian
 * @Email: 1136005348@qq.com
 * @Date: 2020-06-29 17:23:00
 * @LastEditTime: 2020-07-20 13:50:44
 * @LastEditors: Ian
 * @Description:
 */
const {default: template} = require('@babel/template')

const path = require('path')

const compiler = require('./compiler')

const run = async () => {
  const stats = await compiler('D:/MyProjects/cm-admin/src', 'D:/MyProjects/cm-admin/src/router/commonRoutes.js')
  const output = eval(stats.compilation.assets['main.js'].source())
  console.log(output)
}
run()

const test = () => {
  const output = require('./dist/main.js')
  console.log(output)
}
//test()

