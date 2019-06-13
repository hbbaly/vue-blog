 const Article = require('../lib/mongo').Article;
 module.exports = {
  // 根据classify获取所有文章
  getTopics:function (){
    return Promise.all([
        Article.find().exec()
      ])
    }
 }
