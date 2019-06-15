// 验证token中间件
const jwt = require('jsonwebtoken')
module.exports = function (req, res, next) {
  console.log(req.headers['authorization'], "req.headers['authorization']")
  if(req.headers['authorization']){
    const token = req.headers['authorization'].split(' ')[1]
    console.log(token, 'token')
    console.log(jwt.decode(token, process.env.JWT_SECRET), 'jwt.decode(token, process.env.JWT_SECRET)')
    const decoded = jwt.decode(token, process.env.JWT_SECRET)
    // 如果过期了就重新登录
    // 验证token也需要优化
    if(token&&decoded.exp<=Date.now()/1000){
      return  res.send({
        code: 401,
        message:"授权已经过期，请重新登陆"
      })
    }
  }
  next();
}