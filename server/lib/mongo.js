var Mongolass = require('mongolass');
var mongolass = new Mongolass();
mongolass.connect('mongodb://localhost:27017/test');

// 文章
exports.Article = mongolass.model('col',{
 title: {type: 'string'},
 description: {type: 'string'},
 type: {type: 'string'},
 contentToMark: {type: 'string'},
})
// exports.Article.index({_id:1}).exec();
exports.SetBannerList = mongolass.model('banner', {
  title: {type: 'string'},
  description: {type: 'string'},
  url: {type: 'string'},
  img: {type: 'string'},
})
// 用户集合
exports.User = mongolass.model('User',{
  name: {type: 'string'},
  password:{type:'string'}
})