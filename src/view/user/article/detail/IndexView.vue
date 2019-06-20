<template>
  <div class="page page-article-detail">
    <el-page-header @back="goBack" content="文章详情"></el-page-header>
    <div class="container">
      <h1 class="__title"> {{ title }} </h1>
      <div class="__top">
        <el-tag
          type="success">
          {{tag}}
        </el-tag>
        <div class="__time">创建于: {{ time }}</div>
      </div>
      <div class="__content" v-html="html"></div>
    </div>
  </div>
</template>
<script>
import Http from '@/utils/http'
export default {
  name: 'ArticleDetail',
  data () {
    return {
      html: '',
      _id: '',
      tag: '',
      time: new Date().getUTCMonth(),
      title: '',
    }
  },
  created () {
    this._id = this.$route.params._id
    this.getDetail()
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    getDetail () {
      Http.post('/api/get/article/detail', {_id: this._id}).then(res => {
        if (res.data.code === 200) {
          this.html = res.data.data[0].contentToMark
          this.tag = res.data.data[0].type,
          this.title = res.data.data[0].title
          this.time = res.data.data[0].created_at
        } else {
          this.$message({
            message: res.data.data.message,
            type: 'warning'
          });
        }
      })
    }
  }
}
</script>
<style scoped>
.page-article-detail {
  width: 70%;
  margin: 0 auto;
}
.__title{
  margin: 20px auto;
}
.container{
  margin: 20px auto;
}
.__top {
  display: flex;
  justify-content: space-between;
  justify-items: center;
  align-items: center;
  margin-bottom: 20px;
}
.el-tag{
  margin-right: 50px;
}
.__time{
  color: #666;
}
</style>