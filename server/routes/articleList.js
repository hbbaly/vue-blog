const express = require('express')
const router = express.Router()
const api = require('../api/index')
const checkToken = require('../utils/checkToken')
router.post('/get/article',checkToken, (req, res, next) => {
  api.getArticle(req.body).then(response => {
    res.send({
      code: 200,
      message: 'ok',
      data: response
    })
  }).catch(err => {
    res.send({
      code: -200,
      message: err.toString()
    })
  })
})
module.exports = router