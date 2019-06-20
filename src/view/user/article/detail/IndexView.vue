<template>
  <div class="page page-article-detail">
    <div class="container">
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
      time: new Date().getUTCMonth()
    }
  },
  created () {
    this._id = this.$route.params._id
    this.getDetail()
  },
  methods: {
    getDetail () {
      Http.post('/api/get/article/detail', {_id: this._id}).then(res => {
        if (res.data.code === 200) {
          this.html = res.data.data[0].contentToMark
          this.tag = res.data.data[0].type,
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
<style>
.__top {
  display: flex;
  justify-content: space-around;
  justify-items: center;
  align-items: center;
}
.el-tag{
  margin-right: 50px;
}
.__time{
  color: #666;
}
</style>