<!--
 * @Author: Ian
 * @Email: 1136005348@qq.com
 * @Date: 2020-06-29 12:49:02
 * @LastEditTime: 2020-06-29 15:28:08
 * @LastEditors: Ian
 * @Description:
-->

# 重学前端

## Javascript

### 为什么用 `void 0` 代替 `undefined`

`undefined` 既是 js 中的数据类型，也是值，`undefined` 类型只有 `undefined` 一个值。但是 `undefined` 在 js 中被设计为变量，而不像 `null` 是关键字，存在被意外篡改的风险（新的浏览器中已更正）。

### 为什么对象的方法可以用在基本类型

js 中 `3` 和 `new Number(3)` 是不同的数据类型。

```js
typeof 3 // number
typeof new Number(3) // object
3 == new Number(3) // true
3 === new Number(3) // false
```

为什么 `string` 可以使用 `String` 的方法呢，因为 js 中 `.` 操作符会对基础类型进行装箱操作，构造一个临时对象使得能在基础类型上调用对应对象的方法。

### 为什么 `Promise` 代码先于 `setTimeout` 执行

采纳 JSC 引擎的术语，把宿主发起的任务称为宏观任务，把 JavaScript 引擎发起的任务称为微观任务。在主事件循环中的每次的执行过程，其实都是一个宏观任务。我们可以大概理解：宏观任务的队列就相当于事件循环。在宏观任务中，JavaScript 的 `Promise` 还会产生异步代码，JavaScript 必须保证这些异步代码在一个宏观任务中完成，因此，每个宏观任务中又包含了一个微观任务队列，`Promise` 产生的异步代码是放在当前宏观任务的微观任务队列的队尾。`setTimeout` 等宿主 API，则会添加宏观任务。

```js
var r = new Promise(function(resolve, reject) {
  console.log('a')
  resolve()
})
r.then(() => console.log('c'))
console.log('b')
// new Promise中的代码是同步执行，因此先打印a
// then中的回调是resolve产生的异步代码，在当前同步任务完成后执行，因此c在b之后打印
```

```js
var r = new Promise(function(resolve, reject) {
  console.log('a')
  resolve()
})
setTimeout(() => console.log('d'), 0)
r.then(() => console.log('c'))
console.log('b')
// 先执行new Promise中的同步代码，打印a
// 然后执行打印b
// resolve的代码是在当前宏观任务内的微观任务，setTimeout是新的宏观任务
// 因此打印c之后打印d
```

```js
setTimeout(() => console.log('d'), 0)
var r = new Promise(function(resolve, reject) {
  resolve()
})
r.then(() => {
  var begin = Date.now()
  while (Date.now() - begin < 1000);
  console.log('c1')
  new Promise(function(resolve, reject) {
    resolve()
  }).then(() => console.log('c2'))
})
// 尽管这里while循环1s，仍然会执行完当前宏观任务再执行新的宏观任务
// 所以打印 c1, c2, d
```

#### `async/await`

`async` 函数内的代码相当于 `new Promise` 中的代码，是同步任务立即执行，`await` 后的代码相当于 `resolve` 后的代码是微观异步任务，会在同步任务队列后执行。

```js
setTimeout(() => {
  console.log(2.1)
}, 0)
async function log() {
  console.log(1.2)
  return true
}
async function fn() {
  console.log(1.1)
  await log()
  const start = Date.now()
  while (Date.now() - start < 1000);
  console.log(1.4)
}
fn()
console.log(1.3)
// 1.1  1.2  1.3  1.4  2.1
```
