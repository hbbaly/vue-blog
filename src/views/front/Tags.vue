<template>
  <div class="page page-tags">
    <ComponentHeader />
    <div class="tag-wrapper">
      <el-tag v-for="(item, index) in tags" :key="index" :type="typeArr[index%5]" @click="goDetail(item.type)">{{item.type}}</el-tag>
    </div>
  </div>
</template>
<script>
import Http from '@/utils/http.js'
import ComponentHeader from '@/components/header.vue'
export default {
  data () {
    return {
      typeArr: ['success', 'info', 'warning', 'danger', ''],
      tags: []
    }
  },
  components: {
    ComponentHeader
  },
  created () {
    this.getTags()
  },
  methods: {
    async getTags () {
      let res = await Http.post('/api/get/all/tag')
      if (res.data.code === 200) {
        this.tags = res.data.data
      }
    },
    goDetail (type) {
      this.$router.push(`/${type}/article`)
    }
  }
}
</script>
<style lang="stylus" >
.page-tags
  .tag-wrapper
    width 800px
    height 70vh
    margin 0 auto
    .el-tag
      margin 10px
      cursor pointer
      &:active 
        color #ccc

</style>