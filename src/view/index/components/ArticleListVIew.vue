<template>
  <div class="article-list">
    <div class="__content">
      <div class="item-list" v-for="(item, index) in list" :key="index" @click="jumpDetail(item._id)">
        <div class="__top">
          <h1 class="__title">{{ item.title }}</h1>
          <el-tag
          type="success">
          {{item.type}}
        </el-tag>
        </div>
        <div class="__wrapper">
          <div v-html="item.content"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ArticleListView',
  props: {
    list: {
      type: Array,
      default: () => []
    },
    total: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      value: true
    }
  },
  methods: {
    jumpDetail (id) {
      this.$emit('jumpDetail', id)
    }
  }
}
</script>
<style scoped>
.article-list{
  width: 70%;
  margin: 50px auto;
  cursor: pointer;
}
.item-list{
  padding: 20px;
  margin-top: 20px;
  border: 1px solid #ddd;
  background: #fff;
}
.item-list:hover{
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.04);
  border-radius: 5px;
}
.__top{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.__title:hover, .__wrapper>div:hover{
  color: #666;
}
.el-tag{
}
.__wrapper{
  display: -webkit-box ;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>