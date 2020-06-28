/*
 * @Author: Ian
 * @Email: 1136005348@qq.com
 * @Date: 2020-06-23 13:39:04
 * @LastEditTime: 2020-06-24 22:23:02
 * @LastEditors: Ian
 * @Description:
 */

require('./style.css')
require('./style.less')
require('@babel/polyfill')


var image = new Image();
image.src = require('./img.jpg');
document.body.appendChild(image);

console.log('hello webpack')

let fn = () => {
  console.log('es6'.includes('es'));
}
fn()

let log = function(target){
  console.log(target);
}
@log
class A {
  a = 1;
}
alert(new A().a);