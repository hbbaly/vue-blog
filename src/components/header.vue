<template>
<header>
  <div class="component-header">
    <div class="__left">
      <img class="ui-img" src="../assets/images/logo.png" alt="" srcset="">
    </div>
    <div class="__right">
      <div class="__title" @click="choose(index)" :class="{'_act': chooseIndex === index}" v-for="(item, index) in nav" :key="item.title"> {{ item.title }} </div>
    </div>
  </div>
</header>
</template>
<script>
export default {
  props:{
    nav: {
      type: Array,
      default () {
        return [
        {
          title: '首页',
          path: '/'
        },
        {
          title:'时间轴',
          path: '/timeline'
        }, 
        {
          title:'标签',
          path: '/tags'
        },
        {
          title:'我的',
          path: '/my'
        }
      ]
      }
    }
  },
  data () {
    return {
      chooseIndex: 0
    }
  },
  mounted () {
  },
  methods: {
    choose (index) {
      this.chooseIndex = index
      this.$router.push({
        path: this.nav[index].path
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../assets/css/_variables.styl'
header
  overflow hidden
  position fixed
  top 0
  left 0
  width 100%
  z-index 100
  border-bottom 1px solid #EBEEF5
  -webkit-transition .3s
  transition .3s
  -webkit-box-shadow 0 0px 12px 0 rgba(0,0,0,.1)
  box-shadow 0 0px 12px 0 rgba(0,0,0,.1)

.component-header
  display flex
  height 80px 
  width 800px
  margin 0 auto
  background-color #FFF
  align-items center
  justify-content space-between
  color #303133
  
  .__left
    .ui-img
      margin $col-base 0 $col-base 0
  .__right
    display: flex;
    align-items: center;
    margin-right 0
    .__title
      padding $row-smest $col-base
      cursor pointer
      &:hover
        color $blue
      &_act
        color $blue
</style>