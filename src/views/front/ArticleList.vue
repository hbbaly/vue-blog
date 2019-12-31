<!--
 * @Author: hbbaly
 * @Date: 2019-11-17 12:01:28
 * @GitHub: https://github.com/hbbaly
 * @Description: 文章列表
 -->
<template>
  <div class="page page-article-list">
  <ComponentHeader />
  <el-card class="box-card">
    <div class="article-wrapper">
      <div class="article-list" v-for="(item, index) in article" :key="item.id" @click="goDetail(item._id)">
        <div class="__title overflow">{{ item.title }}</div>
        <div class="__time">{{ item.created_at }}</div>
        <div class="__description overflow"
             v-html="item.contentToMark"></div>
      </div>
    </div>
  </el-card>
  </div>
</template>
<script>
import Http from '@/utils/http.js'
import ComponentHeader from '@/components/header.vue'
export default {
  data() {
    return {
      activeNames: ['1'],
      article: [],
      type: 'Vue',
      page: 1,
      limit: 20
    };
  },
  components: {
    ComponentHeader
  },
  created () {
    this.type = this.$route.params.type
    this.getData()
  },
  methods: {
    handleChange(val) {
      console.log(val);
    },
    getData () {
      let data = {
        page: this.page,
        limit: this.limit,
        type: this.type
      }
      Http.post('/api/get/article', data).then(res => {
        if (res.data.code === 200 && res.data.data) {
          this.article = res.data.data
        }
      })
    },
    goDetail (id) {
      this.$router.push('/article/'+id)
    }
  }
};
</script>
<style lang="stylus">
@import '../../assets/css/_variables.styl'
.el-collapse 
      border none !important
.page-article-list
  overflow-x hidden
  overflow-y auto
  width 800px
  margin 0 auto
  background #fefefe
  .overflow
    display -webkit-box
    -webkit-line-clamp 2
    overflow hidden
    text-overflow ellipsis
    -webkit-box-orient vertical
    word-wrap break-word
    word-break break-all
  .fa-book
    display inline-block
    color $orange
    margin-right $col-smest
    margin-bottom $row-base
  .article-list
    position relative
    // height 100px
    padding-left $row-sm
    cursor pointer
    .__title
      -webkit-line-clamp 1
      font-size $fs-lg
      line-height 40px 
      color #000
    .__time
      line-height 20px 
      margin-bottom $col-smest
</style>
