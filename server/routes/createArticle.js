const express = require('express')
const router = express.Router()
const checkToken = require('../utils/checkToken')
const api = require('../api/index')
router.post('/create/article', checkToken, (req, res, next) => {

  api.createArticle(req.body).then(({res: {ok,n}}) => {
    if (ok && n > 0){
      res.send({
        code: 200,
        message: '发布成功'
      });
    } else {
      res.send({
        code: -200,
        message: '发布失败'
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