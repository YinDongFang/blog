<!--
 * @Author: Ian
 * @Email: 1136005348@qq.com
 * @Date: 2020-06-21 21:49:05
 * @LastEditTime: 2020-06-21 21:58:21
 * @LastEditors: Ian
 * @Description: 
--> 
# Vue实现响应式Array
```js
/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 * 
 * 这里只是实现继承数组和对函数的修改
 * 在observer/index.js中对数组值进行原型的变更
 */

// def函数是对Object.defineProperty()的封装
import { def } from '../util/index'

// 实现对Array的继承
const arrayProto = Array.prototype
export const arrayMethods = Object.create(arrayProto)

const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

/**
 * Intercept mutating methods and emit events
 * 对数组原地函数进行拦截修改
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  // 缓存原函数
  const original = arrayProto[method]
  def(arrayMethods, method, function mutator (...args) {
    // 执行原函数，保存结果
    const result = original.apply(this, args)
    const ob = this.__ob__
    let inserted
    // 获取插入的新值
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    // 对新值进行响应式处理
    if (inserted) ob.observeArray(inserted)
    // notify change
    // 通知依赖更新
    ob.dep.notify()
    return result
  })
})
```
```js
export class Observer {
  ...
  constructor (value: any) {
    this.value = value
    this.dep = new Dep()
    this.vmCount = 0
    def(value, '__ob__', this)
    if (Array.isArray(value)) {
      // protoAugment 和 copyAugment 是对原型的修改或属性方法的修改
      if (hasProto) {
        protoAugment(value, arrayMethods)
      } else {
        copyAugment(value, arrayMethods, arrayKeys)
      }
      this.observeArray(value)
    } else {
      this.walk(value)
    }
  }

  /**
   * Walk through all properties and convert them into
   * getter/setters. This method should only be called when
   * value type is Object.
   */
  walk (obj: Object) {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i])
    }
  }

  /**
   * Observe a list of Array items.
   * 对数组每一项创建一个Observer
   */
  observeArray (items: Array<any>) {
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i])
    }
  }
}
```