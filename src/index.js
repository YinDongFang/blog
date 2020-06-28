/*
 * @Author: Ian
 * @Email: 1136005348@qq.com
 * @Date: 2020-06-23 13:39:04
 * @LastEditTime: 2020-06-27 12:18:59
 * @LastEditors: Ian
 * @Description:
 */

const xhr = new XMLHttpRequest()
xhr.open('GET', '/api/user', true)
xhr.onload = () => {
  console.log(xhr.response)
}
xhr.send()
