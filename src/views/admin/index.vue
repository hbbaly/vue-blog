
<!--
 * @Author: hbbaly
 * @Date: 2019-11-16 17:15:51
 * @GitHub: https://github.com/hbbaly
 * @Description: 
 -->
<template>
  <div>
    <div class="page page-admin">
      <ComponentHeader />
      <div class="side-bar">
        <div class="side-wrapper">
          <tags :tags="tags" />
          <articles />
        </div>
      </div>
      <div class="admin-content">
        <editor :tag-list="tags" />
      </div>
    </div>
  </div>
</template>
<script>
import Tags from './components/tags.vue'
import Articles from './components/article.vue'
import Editor from './components/editor.vue'
import Http from '@/utils/http.js'
import ComponentHeader from '@/components/header.vue'
export default {
  components: {
    ComponentHeader,
    Tags,
    Articles,
    Editor
  },
  data () {
    return {
      tags: []
    }
  },
  created () {
    this.getTags()
  },
  methods: {
    async getTags () {
      let res = await Http.post('/api/get/all/tag', {
      })
      this.tags = res.data.code === 200 ? res.data.data : []
    }
  }
}
</script>
<style lang="stylus" scoped>
.page-admin
  display flex
  .side-bar
    width 280px
    .side-wrapper
      position fixed
      top 120px
      left 0
  .admin-content
    width 820px
</style>