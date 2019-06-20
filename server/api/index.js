 const {Article, SetBannerList, User, Classify} = require('../lib/mongo')
 
 module.exports = {
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
  changePass (params) {
    const {name} = params
    return User.update({name},{$set:params}).exec()
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
  // 获取文章详情
  getArticleDetail: (params) => {
    return Article.find(params).addCreateAt().sort({_id: -1}).exec()
  },
  updateArticle (params) {
    const { _id, title, content,type,contentToMark } = params 
    return Article.update({_id},{$set:{title, type, content,contentToMark }}).exec()
  },
  setClassify (params) {
    return Classify.create(params).exec()
  },
  searchClassify (params = {}) {
    return Classify.find(params).exec()
  },
  updateClassify (_id, params) {
    return Classify.update({_id:_id},{$set:params}).exec()
  },
  // remove Classify
  removeClassify (params) {
    return Classify.remove(params).exec()
  }
 }
