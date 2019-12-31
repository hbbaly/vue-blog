const express = require('express')
const router = express.Router()
const checkToken = require('../utils/checkToken')
router.post('/user/info', checkToken, (req, res, next) => {
  console.log(req.headers['authorization'], 'headers authorization')
  const {name} = req.body
  res.send({
    code: 200,
    message: '用户中心',
    data: {
      name
    }
  });
})
module.exports = router