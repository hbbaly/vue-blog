const mysql = require('mysql');
module.exports = function (sql,zhi,callback) { 
    let config = mysql.createConnection({
        // 数据库的地址
        host:"localhost",
        // 数据库的用户名
        user:'root',
        // 数据库的密码
        password:'123456789',
        // 数据库的端口号
        port:3306,
        //那个数据库
        database:'test'
    })
    // 开始连接
    config.connect()
    // 进行数据库操作  1. 数据库代码  2.回调
    config.query(sql,zhi,(err,data)=>{
        callback(err,data)
    })
    config.end()
 }