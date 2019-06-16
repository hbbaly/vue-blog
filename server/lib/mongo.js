const Mongolass = require('mongolass');
const mongolass = new Mongolass();
mongolass.connect('mongodb://localhost:27017/test');
const moment = require('moment');//时间格式化(前后台都可以用的npm包)
const objectIdToTimestamp = require('objectid-to-timestamp');// 根据_id生成时间戳
/*
    mongolass插件系统，语法:
    mongolass.plugin(插件名字,{
    before(方法)
    after(方法)
  })
*/
mongolass.plugin('addCreateAt',{
  // 只要查询所有条件，那么一定会有最终结果
  afterFind:results => {
    results.forEach(item => {
      item.created_at =item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm:ss');
    })
    return results
  },
  // 单个查询有可能是null，所以要加if
  afterFindOne: (result) => {
    if(result){
      result.created_at =result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm:ss');
    }
    return result
  }
})
// 文章
exports.Article = mongolass.model('article',{
 title: {type: 'string'},
 content: {type: 'string'},
 type: {type: 'string'},
 contentToMark: {type: 'string'},
})
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