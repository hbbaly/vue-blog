// const express = require('express')
// const router = express.Router()
// const checkToken = require('../utils/checkToken')
// const api = require('../api/index')
// router.post('/create/article', checkToken, (req, res, next) => {

//   api.createArticle(req.body).then(response => {
//     if (response.result.ok && response.result.n > 0){
//       res.send({
//         code: 200,
//         message: '发布成功'
//       });
//     } else {
//       res.send({
//         code: -200,
//         message: '发布失败'
//       })
//     }
//   }).catch(err => {
//     res.send({
//       code: -200,
//       message: err.toString()
//     })
//   })
// })
// router.post('/update/article', checkToken, (req, res, next) => {
//   api.updateArticle(req.body).then(response => {
//     if (response.result.ok && response.result.n) {
//       res.send({
//         code: 200,
//         message: '更新成功'
//       });
//     } else {
//       res.send({
//         code: -200,
//         message: '更新失败'
//       })
//     }
//   }).catch(err => {
//     res.send({
//       code: -200,
//       message: err.toString()
//     })
//   })
// })
// module.exports = router