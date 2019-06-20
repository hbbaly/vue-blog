<template>
  <div class="article-list">
    <div class="__content">
      <div class="item-list" v-for="(item, index) in list" :key="index" @click="jumpDetail(item._id)">
        <h1 class="__title">{{ item.title }}</h1>
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
    }
  },
  data () {
    return {
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
.__title:hover, .__wrapper>div:hover{
  color: #666;
}
  .__wrapper{
    display: -webkit-box ;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
</style>