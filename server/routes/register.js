const express = require('express')
const router = express.Router()
const api = require('../api/index')
const sha1 = require('sha1')
router.post('/user/register', (req, res, next) => {
  const {name, password} = req.body
  let encodePassword = sha1(password),
      user = {
        name,
        password: encodePassword
      }

  api.registerUser(user).then(response => {
    res.send({
      // 创建用户成功
      code:200,
      message: 'ok',
    })
  }).catch(err => {
    if(err.message.match('E11000 duplicate key')){
      return res.json({
        code:-200,
        message:'用户名重复'
      })
    }
    // 服务器发生错误（例如status:）
    return res.json({
      code:-200,
      message:err.toString()
    })
  })
})
module.exports = router