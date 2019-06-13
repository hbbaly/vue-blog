const express = require('express')
const router = express.Router()
const api = require('../api/index')
router.get('/get/topics', (req, res) => {
  api.getTopics().then(data => {
    res.send({
      code: 200,
      message: 'ok',
      data
    })
  })
});
// 设置banner
router.post('/set/banner', (req, res, next) => {
  const data = req.body
  console.log(req)
  api.setBanner(data).then(response => {
    res.send({
      code: 200,
      message: 'ok',
      data: response
    })
  })
})
router.get('/get/banner',(req, res, next) => {
  api.getBanner().then(response => {
    res.send({
      code: 200,
      message: 'ok',
      data: response
    })
  })
})
module.exports = router