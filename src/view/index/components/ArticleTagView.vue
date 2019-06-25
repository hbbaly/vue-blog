<template>
<div class="right-tag">
  <div class="__title">
    <i class="el-icon-document-copy"></i> 热门文章
  </div>
  <div class="__cont">
    <div class="item" v-for="(item, index) in tagArticle" :key="index" @click="chooseArticle(item)">
      <i class="el-icon-star-on"></i> {{item.title}}
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: 'ArticleTagView',
  props: {
    tagArticle: {
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
  background: #fff;
  margin: 0 0 10px 0;
  border: 1px solid #ddd;
  border-radius: 2px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.04);
  .__title{
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ddd;
    .el-icon-document-copy{
      margin-left: 10px;
      font-size: 30px;
      color: #5692a3;
      vertical-align: middle;
    }
  }
  .__cont{
    padding: 10px 10px 20px 10px;
    .item{
      overflow: hidden;
      line-height: 28px;
      text-indent: 10px;
      font-size: 16px;
      white-space: nowrap;
      word-wrap: normal;
      text-overflow: ellipsis;
      transition: color .3s;
      cursor: pointer;
      .el-icon-star-on{
        font-size: 20px;
        vertical-align: middle;
        transition: color .3s;
        &:hover{
          color: #5692a3;
        }
      }
      &:hover{
        color: #5692a3;
      }
    }
  }
}
</style>
