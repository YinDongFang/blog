/*
 * @Author: Ian
 * @Email: 1136005348@qq.com
 * @Date: 2020-06-26 12:28:02
 * @LastEditTime: 2020-06-29 15:12:40
 * @LastEditors: Ian
 * @Description:
 */

const express = require('express');

const app = express()

app.get('/api/user', (req, res) => {
  res.json({name: 'dongfang'})
})

app.listen(8000)