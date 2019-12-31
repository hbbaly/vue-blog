<template>
  <div class="page page-mine">
    <ComponentHeader />
    <el-card class="box-card">
      <div class="minie-info">
        <el-avatar :size="50" src="https://avatars1.githubusercontent.com/u/34227573?s=460&v=4"></el-avatar>
        <div class="__right">
          <div class="__name">hbbaly</div>
          <div class="__city">重庆</div>
          <div class="__job">前端工程师</div>
        </div>
      </div>
      <div class="mine-skill">

      </div>
      <div class="relate-skill">

      </div>
    </el-card>
  </div>
</template>
<script>
import Http from '@/utils/http.js'
import ComponentHeader from '@/components/header.vue'
export default {
  data () {
    return {
    }
  },
  components: {
    ComponentHeader
  },
  created () {
  },
  methods: {
  }
}
</script>
<style lang="stylus" >
</style>