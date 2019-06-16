 const {Article, SetBannerList, User} = require('../lib/mongo')
 
 module.exports = {
  // 根据classify获取所有文章
  getTopics: () => {
    return Promise.all([
        Article.find().exec()
      ])
    },
  setBanner: (params) => {
    return SetBannerList.create(params).exec()
  },
  getBanner: (params) => {
    return SetBannerList.find().exec()
  },
  registerUser: (params) => {
    return User.create(params).exec()
  },
  getUserLogin: (params) => {
    const {name} = params
    return User.find({name}).exec()
  },
  createArticle: (params) => {
    return Article.create(params).exec()
  },
  getArticle: (params) => {
    const {page, limit} = params
    let skip
    if (page && limit) {
      skip = (page -1) * limit
      return Promise.all([
        Article.find().addCreateAt().sort({_id:-1}).skip(skip * 1).limit(limit * 1).exec(),
        Article.count().exec()
      ])
    } else {
      return Article.find().addCreateAt().sort({_id: -1}).exec()
    }
  },
  updateArticle (params) {
    const { _id, title, content,type,contentToMark } = params 
    return Article.update({_id},{$set:{title, type, content,contentToMark }}).exec()
  }
 }
