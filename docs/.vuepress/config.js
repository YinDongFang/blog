/*
 * @Author: Ian
 * @Email: 1136005348@qq.com
 * @Date: 2020-06-21 16:02:39
 * @LastEditTime: 2020-06-29 12:48:54
 * @LastEditors: Ian
 * @Description: 
 */ 
module.exports = {
  base: '/blog-dist/',
  title: 'Yindongfang\'s Blog',
  description: 'Just some notes',
  markdown: {
    lineNumbers: true // 代码块显示行号
  },
  themeConfig: {
    sidebar: 'auto',
    sidebarDepth: 2,
    activeHeaderLinks: false,
    lastUpdated: 'Last Updated',
    nav:[
      { text: 'Vue', link: '/vue/' }, 
      { text: 'Webpack', link: '/webpack/' }, 
      { text: '重学前端', link: '/relearnjs/' }, 
      { text: 'GitHub', link: 'https://github.com/YinDongFang' }
    ]
  }
}
