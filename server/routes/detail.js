const express = require('express')
const router = express.Router()
const api = require('../api/index')
router.post('/get/article/detail', (req, res, next) => {
  api.getArticleDetail(req.body).then(response => {
    if (response.length) {
      res.send({
        code: 200,
        message: 'ok',
        data: response
      })
    } else {
      res.send({
        code: -200,
        message: '没有找到改文章',
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