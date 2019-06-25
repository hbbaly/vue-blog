// require('dotenv').config('../.env')
// const express = require('express')
// const router = express.Router()
// const api = require('../api/index')
// const sha1 = require('sha1')
// const createToken = require('../utils/createToken')
// router.post('/user/login', (req, res, next) => {
//   const {name, password} = req.body
//   let encodePassword = sha1(password),
//       user = {
//         name,
//         password: encodePassword
//       }

//   api.getUserLogin(user).then(response => {
//     if (response && response.length > 0 && response[0].password === encodePassword) {
//       res.send({
//         // 登陆成功
//         code:200,
//         message: '登陆成功',
//         data: {
//           token: createToken(name),
//           name: name
//         }
//       })
//     } else {
//       res.send({
//         // 登陆成功
//         code: -200,
//         message: '用户名或密码错误',
//       })
//     }
//   }).catch(err => {
//     next(err)
//     // 服务器发生错误（例如status:）
//     return res.json({
//       code:-200,
//       message:err.toString()
//     })
//   })
// })
// module.exports = router