<template>
<div class="right-tag">
  <div class="__title">
    <i class="el-icon-collection-tag"></i> 文章分类
  </div>
  <div class="__cont">
    <div class="item" v-for="(item, index) in tagData" :key="index" @click="chooseArticle(item)">
      {{item}}
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: 'AllTagView',
  props: {
    tagData: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    chooseArticle (item) {
      this.$emit('chooseArticle', item)
    }
  }
}
</script>
<style lang="less" scoped>
.right-tag{
  width: 280px;
  height: auto;
  margin: 0 0 10px 0;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 2px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.04);
  .__title{
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ddd;
    .el-icon-collection-tag{
      margin-left: 10px;
      font-size: 30px;
      color: #5692a3;
      vertical-align: middle;
    }
  }
  .__cont{
    display: flex;
    padding: 10px 10px 20px 10px;
    flex-wrap: wrap;
    .item{
      padding: 5px 10px;
      margin: 10px 10px 0 10px;
      border: 1px solid #ddd;
      border-radius: 3px;
      transition: color .3s;
      cursor: pointer;
      &:hover{
        color: #5692a3;
      }
    }
  }
}
</style>
