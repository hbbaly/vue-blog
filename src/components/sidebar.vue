<template>
<div class="sidebar">
  <el-card class="box-card component-sidebar" :class="{'sidebar_close': open}">
    <div slot="header" class="clearfix">
      <span>{{title}}</span>
      <el-button style="float: right; padding: 3px 0" type="text" @click="close">关闭</el-button>
    </div>
    <div class="sidebar-wrapper">
      <div v-if="item.tagName === 'h1' || item.tagName === 'h2'" class="sidebar-list" :class="[item.tagName === 'h1' ? '__first': item.tagName==='h2' ? '__second': item.tagName==='h3' ? '__third' : '__none']"  v-for="(item) in category" :key="item._id">
        <a class="overflow ui-link" :href="item.href">{{item.text}}</a>
      </div>
    </div>
  </el-card>
  <div class="sidebar-btn" :class="{'sideba-btn_hidden': !open}" @click="openBar">
    目录
  </div>
</div>
</template>
<script>
export default {
  props:{
    category: {
      type: Array,
      default: []
    },
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      open: false
    }
  },
  mounted () {
    // if (window.screenWidth > 1200) {
      console.log(document.body.clientWidth)
    // }
    let width = document.body.clientWidth
    if (width < 1250) {
      this.open = true
    }
  },
  methods: {
    close () {
      this.open = true
    },
    openBar () {
      this.open = false
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../assets/css/_variables.styl'
.overflow
  overflow hidden
  text-overflow ellipsis
  white-space: nowrap;
  -webkit-box-orient vertical
  word-wrap break-word
  word-break break-all
.ui-link
  display block
  width 210px
  margin 5px 0
  line-height 1.5
  &:hover
   color $blue
.component-sidebar
  position fixed
  top 120px
  left 0
  height auto
  transition  left 0.5s linear
.__first
  width: 210px
  text-indent 10px

  font-size 20px
.__second
  .ui-link
    text-indent 20px
    font-size 16px
.__third
  .ui-link
    text-indent 30px
    font-size 14px
.sidebar-btn
  position fixed
  top 200px
  left 0
  width 40px
  height 75px
  padding 10px
  font-size 20px
  border-radius 0 5px 5px 0 
  cursor pointer
  background-color #FFF
  -webkit-box-shadow 0 2px 12px 0 rgba(0,0,0,.1)
  box-shadow 0 2px 12px 0 rgba(0,0,0,.1)
  transition  left 0.5s linear
.sidebar_close
  position fixed
  top 80px
  left -550px
.sideba-btn_hidden
  left -200px
</style>