<template>
  <div class="page page-index">
    <div class="container" v-loading="loading">
      <banner-list :banner-list="BannerList"/>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import BannerList from './components/BannerListView'
export default {
  name: 'Index',
  components: {
    BannerList
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
      BannerList: []
    }
  },
  async mounted () {
    await axios.get('/api/get/banner').then(res => {
      if (res.data.code === 200) this.BannerList = res.data.data.slice(0,3)
    })
    await axios.get('/api/get/topics').then(res => {
    })
    this.loading = false

  }
}
</script>
style