const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const index = require('./routes/index')
const register = require('./routes/register.js')
const login = require('./routes/login')
const user = require('./routes/user')
const createArticle = require('./routes/createArticle')
const articleList = require('./routes/articleList')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// 跨域
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");//预检请求使用
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");//预检请求使用
    next();
});
app.use('/api', index)
app.use('/api', register)
app.use('/api', login)
app.use('/api', user)
app.use('/api', createArticle)
app.use('/api', articleList)
app.set('port', process.env.PORT || 3009);
app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

