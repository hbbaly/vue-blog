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
  }
 }
