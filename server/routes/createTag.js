const express = require('express')
const router = express.Router()
const api = require('../api/index')
const checkToken = require('../utils/checkToken')
router.post('/create/tag',checkToken, (req, res, next) => {
  api.setClassify(req.body).then(response => {
    if (response.result.ok && response.result.n > 0){
      res.send({
        code: 200,
        message: '添加成功'
      });
    } else {
      res.send({
        code: -200,
        message: '添加失败'
      })
    }
  }).catch(err => {
    res.send({
      code: -200,
      message: err.toString()
    })
  })
})
router.post('/get/all/tag', (req, res, next) => {
  api.searchClassify(req.body).then(response => {
    console.log(response)
    if (response.length){
      res.send({
        code: 200,
        message: '添加成功',
        data: response
      });
    } else {
      res.send({
        code: -200,
        message: '获取失败'
      })
    }
  }).catch(err => {
    res.send({
      code: -200,
      message: err.toString()
    })
  })
})
module.exports = router