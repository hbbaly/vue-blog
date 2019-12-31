<template>
  <div class="page page-article-detail" ref="article">
    <ComponentHeader />
    <div class="container">
      <sidebar :category="category" :title="article.title" />
      <div
        class="help-center-content markdown-body"
        v-html="contentToHtml"
        ref="articleContent"
      />
    </div>
    <el-backtop :bottom="100"></el-backtop>
  </div>
</template>
<script>
import Http from '@/utils/http.js'
import marked from '@/utils/marked.js'
import sidebar from '@/components/sidebar.vue'
import ComponentHeader from '@/components/header.vue'
export default {
  data () {
    return {
      article: {},
      _id: '',
      content: '',
      category:[],
      nav: []
    }
  },
  components: {
    sidebar,
    ComponentHeader
  },
  computed: {
    contentToHtml () {
      return marked(this.content)
    },
  },
  created () {
    this._id = this.$route.params._id
  },
  async mounted () {
    await this.getData()
    await this.$nextTick(() => {
      // 提取文章标签，生成目录
      this.getCategory()
    })
  },
  methods: {
    async getData () {
      let res = await Http.post('/api/get/article/detail', {
        _id: this._id
      })
      this.article = res.data.data
      this.content = res.data.data.content
    },
    getCategory () {
      Array.from(this.$refs.articleContent.querySelectorAll('h1,h2,h3,h4,h5,h6')).forEach((item, index) => {
        item.id = item.localName + '-' + index;
        this.category.push({
            tagName: item.localName,
            text: item.innerText,
            href: '#' + item.localName + '-' + index,
        });
      });
    }
  }
}
</script>
<style lang="stylus">
@import '../../assets/css/editor.styl';
@import '../../assets/css/markdown.styl';
  .page-article-detail
    position relative
    min-width 800px
    .help-center-content
      width 800px
      // height 100vh
      margin 0 auto
</style>
