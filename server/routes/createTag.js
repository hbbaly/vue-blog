// const express = require('express')
// const router = express.Router()
// const api = require('../api/index')
// const checkToken = require('../utils/checkToken')

// router.post('/create/tag',checkToken, (req, res, next) => {
//   api.searchClassify(req.body).then(resp => {
//     if (resp.length) {
//       //更新
//       api.updateClassify(resp[0]._id, req.body).then(response => {
//         if (response.result.ok && response.result.n > 0){
//           res.send({
//             code: 200,
//             message: '更新成功'
//           });
//         } else {
//           res.send({
//             code: -200,
//             message: '更新失败'
//           })
//         }
//       }).catch(err => {
//         res.send({
//           code: -200,
//           message: err.toString()
//         })
//       })
//     } else {
//       // 创建
//       api.setClassify(req.body).then(response => {
//         if (response.result.ok && response.result.n > 0){
//           res.send({
//             code: 200,
//             message: '添加成功'
//           });
//         } else {
//           res.send({
//             code: -200,
//             message: '添加失败'
//           })
//         }
//       }).catch(err => {
//         res.send({
//           code: -200,
//           message: err.toString()
//         })
//       })
//     }
//   })
// })
// router.post('/get/all/tag', (req, res, next) => {
//   api.searchClassify(req.body).then(response => {
//     if (response.length){
//       res.send({
//         code: 200,
//         message: '添加成功',
//         data: response
//       });
//     } else {
//       res.send({
//         code: -200,
//         message: '获取失败'
//       })
//     }
//   }).catch(err => {
//     res.send({
//       code: -200,
//       message: err.toString()
//     })
//   })
// })
// router.post('/remove/tag',checkToken, (req, res, next) => {
//   api.removeClassify(req.body).then(response => {
//     if (response.result.ok && response.result.n > 0){
//       res.send({
//         code: 200,
//         message: '删除成功'
//       })
//     } else {
//       throw new Error('该分类不存在')
//     }
//   }).catch(err => {
//     res.send({
//       code: -200,
//       message: err.toString()
//     })
//   })
// })
// module.exports = router