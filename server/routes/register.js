require('dotenv').config('../.env')
const express = require('express')
const router = express.Router()
const api = require('../api/index')
const sha1 = require('sha1')
const createToken = require('../utils/createToken')
const checkToken = require('../utils/checkToken')
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
      data: {
        token: createToken(name)
      }
    })
  }).catch(err => {
    if(err.message.match('E11000 duplicate key')){
      return res.json({
        code:-200,
        message:'用户名重复'
      })
    }
    // 服务器发生错误（例如status:）
    return res.send({
      code:-200,
      message:err.toString()
    })
  })
})
router.post('/change/pass', checkToken, (req, res, next) => {
  api.changePass(req.body).then(response => {
    if (response.result.ok && response.result.n > 0){
      res.send({
        code: 200,
        message: '修改成功'
      })
    } else {
      throw new Error('没有找到该用户');
    }
  }).catch(err => {
    return res.json({
      code:-200,
      message: err.toString()
    })
  })
})
module.exports = router