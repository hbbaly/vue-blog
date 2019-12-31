<template>
  <div class="core-container">
    <div class="scroll-wrapper" ref="scroll">
      <div class="scroll-content">
        <div class="scroll-item" v-for="(item, index) in list" :key="index" @click="clickHandler(item)">{{item.title}}</div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import BScroll from '@better-scroll/core'
import ObserveDom from '@better-scroll/observe-dom'
import Http from '@/utils/http'
  BScroll.use(ObserveDom)
  export default {
    props: {
    list: {
      type: Array,
      default: () => []
    }
  },
    data () {
      return {
        article: []
      }
    },
    mounted() {
      this.$nextTick(() => {
        setTimeout(() => {
          this.init()
        })
      })
    },
    beforeDestroy() {
      this.bs.destroy()
    },
    methods: {
      init() {
        this.bs = new BScroll(this.$refs.scroll, {
          scrollY: true,
          click: true,
          observeDom: true,
          probeType: 3 // listening scroll hook
        })
      },
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>

  .scroll-wrapper{
    height: 400px;
    padding: 70px 0 0px;
    overflow: hidden;
    .scroll-item{
      height: 150px;
      line-height: 50px;
      font-size: 24px;
      font-weight: bold;
      border-bottom: 1px solid #eee;
      text-align: center;
    }
      
  }
</style>