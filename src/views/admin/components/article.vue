<!--
 * @Author: hbbaly
 * @Date: 2019-11-17 12:01:28
 * @GitHub: https://github.com/hbbaly
 * @Description: 文章列表
 -->
<template>
  <div class="component-article" ref = "articleList">
  <el-card class="box-card">
    <div slot="header" class="clearfix">
       <i class="fa fa-book"
       aria-hidden="true"></i>文章列表
    </div>
    <div class="article-wrapper">
      <div class="article-list" v-for="(item, index) in article" :key="item.id" @click="goDetail(item._id)">
        <div class="__title overflow">{{ item.title }}</div>
        <div class="__time">{{ item.created_at }}</div>
        <div class="tags">{{ item.type }}</div>
        <div class="__description overflow"
             v-html="item.contentToMark"></div>
      </div>
    </div>
  </el-card>
  </div>
</template>
<script>
import Http from '@/utils/http.js'
export default {
  data() {
    return {
      activeNames: ['1'],
      article: []
    };
  },
  created () {
    this.getData()
  },
  mounted () {
    this.$nextTick(() => {
      // let height = document.body.clientHeight || document.documentElement.clientHeight 
      // this.$refs.articleList.clientHeight = 0.6 * height
    })
  },
  methods: {
    handleChange(val) {
      console.log(val);
    },
    getData () {
      Http.post('/api/get/article', {page: 1, limit: 10}).then(res => {
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
<style lang="stylus" scoped>
@import '../../../assets/css/_variables.styl';
.el-collapse 
      border none !important
.el-card__body
  padding 0
.component-article 
  overflow-x hidden
  overflow-y auto
  width 250px
  height 600px
  padding $row-sm
  padding-top $col-lger
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
    margin-bottom $col-lger
    cursor pointer
    &:hover
      opacity 0.6
    &:before
      content ''
      position absolute 
      top 0
      left 0
      width 5px
      height 100%
      background $orange
    .__title
      -webkit-line-clamp 1
      font-size $fs-lg
      line-height 40px 
      color #000
    .tags
      position absolute
      top 4px 
      right 0
      padding $row-smest
      background $orange
      border-radius 2px 
      color $color
    .__time
      line-height 20px 
      margin-bottom $col-smest
</style>
