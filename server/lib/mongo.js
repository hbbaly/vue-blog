var Mongolass = require('mongolass');
var mongolass = new Mongolass();
mongolass.connect('mongodb://localhost:27017/test');

// 文章
exports.Article = mongolass.model('col',{
 title: {type: 'string'},
 description: {type: 'string'},
 url: {type: 'string'},
 by: {type: 'string'},
 likes:{type:'number'}
})
exports.Article.index({_id:1}).exec();