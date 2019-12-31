<template>
<div class="page page-user-index">
  <header>
    <div class="block">
      <span class="demonstration">默认</span>
      <el-image :src="src"></el-image>
    </div>
  </header>
  <div class="container">
    <div class="__info">
      座右铭: 和的vbhvbdfvbsdhvbsj
    </div>
    <div class="__btn">
      <el-button type="primary" round>退出登陆</el-button>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: 'Center',
  data () {
    return {
      src: '',

    }
  }
}
</script>