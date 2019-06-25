const express = require('express')
const router = express.Router()
const sql = require('../lib/sql')
router.get('/get', (req, res)=>{
  console.log('hbb')
  sql('SELECT * FROM `group`', (err, data) => {
    console.log(err, data, 'hbb')
    res.send({
      data
    })
  })
})
module.exports = router