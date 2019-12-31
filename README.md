# vue-blog

>Vue2 + Vue-router + Axios + Vuex + Node + Express + MongoDB + Webpack 搭建博客

blog样式已改进

## Run Setup

注意：先启动MongoDB

``` bash
cd server
npm i
pm2 start pm2.json (启动服务端)
```

## Build Setup

``` bash
# install dependencies（安装依赖）
npm install

# serve with hot reload at localhost:8080（试运行）
npm run dev

# build for production with minification（项目构建）
npm run build

# build for production and view the bundle analyzer report（打包分析报告）
npm run build --report
```
## 已完成的功能
- 首页轮播设置及获取
- 文章列表分页获取
- 文章详情
- 登陆
- 注册
- 修改密码
- 编辑文章
- 创建文章
- 创建标签
- 修改标签
- 删除标签

## 未完成功能
- 使用vuex管理数据
- 需要登陆状态的页面需要路由守卫
- 删除某篇文章
- 标签搜索文章页面
- 首页完善各个页面入口
- 待添加......


## 目录结构

```
│  .babelrc
│  .eslintignore
│  .eslintrc.js
│  .gitignore
│  index.html
│  package.json
│  README.md
│
├─build
│      build.js
│      check-versions.js
│      dev-client.js
│      dev-server.js
│      utils.js
│      webpack.base.conf.js
│      webpack.dev.conf.js
│      webpack.prod.conf.js
│
├─config
│      dev.env.js
│      index.js
│      prod.env.js
│
├─server                        后端文件夹
│  │  .env
│  │  app.js    后端入口
│  │
│  ├─api
│  │      index.js  后端api
│  │
│  ├─lib
│  │      mongo.js 数据库
│  │
│  ├─utils
│  │      checkToken.js
│  │      createToken.js
│  │
│  └─routes                 后端路由
│          articleList.js
│          createArticle.js
│          createTag.js
│          detail.js
│          index.js
│          login.js
|          register.js
|          user.js
│
├─src       前端文件夹
│  │  App.vue
│  │  main.js   前端入口
│  │
│  ├─api    前端api
│  │      index.js
│  │
│  ├─assets
│  │  ├─css
│  │  │      reset.css
│  │  │      default.css
│  │  │      default0.css
│  │  │      highlight.css
│  │  │
│  │  ├─img
│  │  │
│  │  └─js
│  │          highlight.pack.js
│  │          hljs.js
│  │
│  ├─components
│  │  │  info.vue
│  │
│  |─config             前端请求配置
│  │      common.config.js
│  │      development.config.js
│  │      index.js.vue
│  │      production.config.js
│  |─filter             过滤
│  │      
|  |
│  |─mixins             混入
│  │
│  ├─routes             前端路由vue-router
│  │      index.js
│  │      routes.js
│  │
│  └─store             前端vuex
│  │
│  │
│  │
│  └─utils             公用函数
│  │   http
│  │   index
│  │   store
│  │
│  └─view              前端页面
│  │   ├─index         首页
│  │   ├─notfound      404页面
│  │   ├─user          个人中心相关页面
│  │   │   ├─article
│  │   │   │   create
│  │   │   │   detail
│  │   │   │   list
│  │   │   │   tag
│  │   │   ├─center
│  │   │   ├─changepass
│  │   │   ├─index
│  │   │   ├─login
│  │   │   ├─register
```  

## 功能展示展示
**没有太过在意样式,后期计划会进行样式大修改**
### 首页
http://localhost:8080/


### 创建文章
http://localhost:8080/article/create


### 文章列表
http://localhost:8080/article/list


### 标签
http://localhost:8080/article/tag

### 文章详情
http://localhost:8080/user/article/detail/${_id}

### 登陆
http://localhost:8080/article/tag

### 注册
http://localhost:8080/article/tag



For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
more info, contact with 1422699902@qq.com
