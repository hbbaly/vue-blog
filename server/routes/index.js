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
module.exports = router