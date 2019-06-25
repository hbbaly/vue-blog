<template>
  <div class="page page-index">
    <header class="__header">
      <div class="__left">
        <img class="ui-img" src="../../assets/img/logo.png" alt="" srcset="">
      </div>
      <div class="__right">
        <div class="__title" v-for="item in title" :key="item.title" :class="{'_act': choosedTitle === item.title}" @click="chooseTitle(item)"> {{ item.title }} </div>
      </div>
    </header>
    <!-- <div class="__nav">
      <article-tag :tag-article="tagArticle" @chooseArticle="chooseArticle"></article-tag>
      <all-tag :tag-data="tagData"></all-tag>
    </div> -->
      <!--热门文章--->
      <!--文章归档--->
    <div class="container" v-loading="loading">
      <!-- <article-list :list="article" @jumpDetail="jumpDetail"/> -->
      <!-- <el-pagination
        background
        :page-size="limit"
        :hide-on-single-page="value"
        layout="prev, pager, next"
        :total="total"
        @current-change="changeCurrent">
      </el-pagination> -->
      <article-list-m :list="article" @jumpDetail="jumpDetail"></article-list-m>
    </div>
    <!-- <el-row type="flex" class="row-bg" justify="center">
      <el-col :xs="16" :sm="18" :md="14" :lg="12" :xl="10"><div class="grid-content bg-purple"></div></el-col>
    </el-row> -->
  </div>
</template>
<script>
import Http from '@/utils/http'
import ArticleTag from './components/ArticleTagView'
import AllTag from './components/allTagView'
import BannerList from './components/BannerListView'
import ArticleList from './components/ArticleListView'
import ArticleListM from './components/ArticleListMView'
export default {
  name: 'Index',
  components: {
    BannerList,
    ArticleList,
    ArticleTag,
    AllTag,
    ArticleListM
  },
  data () {
    return {
      title: [
        {
          title: '首页',
          path: '/'
        },
        {
          title:'标签',
          path: '/tag'
        }, 
        {
          title:'我的',
          path: '/my'
        }
      ],
      tagArticle: [
        {
          title: 'node 使用',
          desc: 'node的使用过',
          _id: 'dsbjhbdsvgbhgvhsg'
        },
        {
          title: 'node 使用',
          desc: 'node的使用过',
          _id: 'dsbjhbdsvgbhgvhsg'
        },
        {
          title: 'node 使用',
          desc: 'node的使用过',
          _id: 'dsbjhbdsvgbhgvhsg'
        }
      ],
      tagData: [
        'js',
        'java',
        'python',
        'css',
        'html'
      ],
      choosedTitle: '首页',
      loading: true,
      total: 0,
      value:true,
      article: [{
          title: 'node 使用',
          desc: 'node的使用过',
          _id: 'dsbjhbdsvgbhgvhsg'
        },
        {
          title: 'node 使用',
          desc: 'node的使用过',
          _id: 'dsbjhbdsvgbhgvhsg'
        },
        {
          title: 'node 使用',
          desc: 'node的使用过',
          _id: 'dsbjhbdsvgbhgvhsg'
        }],
      page:1,
      limit: 5
    }
  },
  async mounted () {
    await this.getArticle()   
    this.loading = false
  },
  methods: {
    chooseTitle (item) {
      this.choosedTitle = item.title
    },
    async getArticle () {
      let data = {
        page: this.page,
        limit: this.limit
      }
      await Http.post('/api/get/article', data, true).then(res => {
        if (res.data.code === 200) {
          // this.article = [...this.article, ...res.data.data[0]]
          this.article = res.data.data[0]
          this.total = res.data.data[1]
        } else {
          this.$message({
            message: res.data.data.message,
            type: 'warning'
          });
        }
      })
    },
    async getBanner () {
      await Http.get('/api/get/banner').then(res => {
        if (res.data.code === 200) this.BannerList = res.data.data.slice(0,3)
      })
    },
    jumpDetail (_id) {
      this.$router.push({
        path: `/user/article/detail/${_id}`
      })
    },
    async changeCurrent (val) {
      this.loading = true
      this.page = val
      await this.getArticle()
      this.loading = false
    },
    chooseArticle (id) {

    }
  }
}
</script>
<style lang="less">
  .page-index{
    background: #f1f1f1;
    .__header{
      display: flex;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 100;
      width: 100%;
      align-items: center;
      justify-content: space-between;
      height: 50px;
      background: #fff;
      border-bottom: 1px solid #ddd;
      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.04);
      .__left{
        display: flex;
        align-items: center;
        margin-left: 30px;
        .ui-img{
          display: block;
          width: 120px;
          height: 30px;
        }
      }
      .__right{
        display: flex;
        align-items: center;
        margin-right: 50px;
        .__title{
          width: 80px;
          height: 30px;
          line-height: 30px;
          color: #000;
          font-size: 16px;
          text-align: center;
          cursor: pointer;
          &:hover{
            color: #5692a3;
            background: #ddd;
            border-radius: 3px;
          }
        }
        ._act{
          color: #5692a3;
        }
      }
    }
    .__nav{
      position: absolute;
      top: 80px;
      right: 10px; 
      z-index: 10;     
    }
    .el-pagination{
      width: 70%;
      margin: 20px auto;
    }
  }
</style>
