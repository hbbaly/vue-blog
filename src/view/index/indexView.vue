<template>
  <div class="page page-index">
    <div class="container" v-loading="loading">
      <banner-list :banner-list="BannerList"/>
      <article-list :list="article" @jumpDetail="jumpDetail"/>
    </div>
  </div>
</template>
<script>
import Http from '@/utils/http'
import BannerList from './components/BannerListView'
import ArticleList from './components/ArticleListVIew'
export default {
  name: 'Index',
  components: {
    BannerList,
    ArticleList
  },
  data () {
    return {
      loading: true,
      bannerData: [
        {
          title: 'H5视屏播放器',
          img: 'http://www.hbbaly.com/wp-content/themes/blog/img/article/H5Video.png',
          url: 'http://www.hbbaly.com/2017/09/07/h5%E8%A7%86%E9%A2%91%E6%92%AD%E6%94%BE%E5%99%A8/',
          description: 'HTML5DIY视频播放器'
        },
        {
          title: 'vue.js创建',
          img: 'http://www.hbbaly.com/wp-content/uploads/2017/09/v11.png',
          url: 'http://www.hbbaly.com/2017/09/30/vue-js%E7%8E%AF%E5%A2%83%E7%9A%84%E6%90%AD%E5%BB%BA/',
          description: 'Vue.js环境的搭建'
        }
      ],
      BannerList: [],
      article: [],
      pagr:1,
      limit: 10
    }
  },
  async mounted () {
    await Http.get('/api/get/banner').then(res => {
      if (res.data.code === 200) this.BannerList = res.data.data.slice(0,3)
    })
    let data = {
      page: this.page,
      limit: this.limit
    }
    await Http.post('/api/get/article', data, true).then(res => {
      if (res.data.code === 200) {
        this.article = [...this.article, ...res.data.data]
      } else {
        this.$message({
          message: res.data.data.message,
          type: 'warning'
        });
      }
    })    
    this.loading = false
  },
  methods: {
    jumpDetail (_id) {
      this.$router.push({
        path: `/user/article/detail/${_id}`
      })
    }
  }
}
</script>
style