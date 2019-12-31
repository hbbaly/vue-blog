<template>
  <div class="page page-index">
    <ComponentHeader />
    <div class="wrapper">
      <div class="__left">
        <el-card class="box-card">
          <div class="mine-info">
            <el-avatar :size="100" src="https://avatars1.githubusercontent.com/u/34227573?s=460&v=4"></el-avatar>
            <div class="__info">
              <div class="__name">hbbaly</div>
              <div class="__job">前端工程师</div>
              <a href="https://github.com/hbbaly"><i class="fa fa-github"></i></a>
            </div>
          </div>
          <div class="__tags">
            <el-tag
              v-for="tag in tags"
              :key="tag.name"
              :type="tag.type">
              {{tag.type}}
            </el-tag>
          </div>
        </el-card>
        <div class="box-card">
            <div class="article-wrapper">
                <el-card class="article-list" v-for="(item, index) in article.slice(0,3)" :key="item.id" @click="goDetail(item._id)">
                  <div class="__title overflow">{{ item.title }}</div>
                  <div class="__time">{{ item.created_at }}</div>
                  <div class="__description overflow"
                       v-html="item.contentToMark" />
                  </el-card>
                </div>
              </div>
        </el-card>
      </div>
      <div class="__right">
        <el-card class="article-list" v-for="(item, index) in article" :key="item.id" @click="goDetail(item._id)">
            <div class="__title overflow">{{ item.title }}</div>
            <div class="__time">{{ item.created_at }}</div>
            <div class="__description overflow"
                  v-html="item.contentToMark" />
            </el-card>
          </div>
        </div>
        </el-card>
      </div>
    </div>
  </div>
</template>
<script>
import ComponentHeader from '@/components/header.vue'
import Http from '@/utils/http.js'
export default {
  data () {
    return {
      tags: [
        {
          type: 'Vue'
        },
        {
          type: 'JS'
        }
      ],
      article: [],
      type: 'Vue',
      page: 1,
      limit: 20
    }
  },
  components: {
    ComponentHeader,
  },
  created () {
    this.type = this.$route.params.type
    this.getData()
  },
  methods: {
    getData () {
      let data = {
        page: this.page,
        limit: this.limit,
        type: this.type
      }
      Http.post('/api/get/article', data).then(res => {
        if (res.data.code === 200 && res.data.data) {
          this.article = res.data.data
        }
      })
    },
    goDetail (id) {
      this.$router.push('/article/'+id)
    }
  }
}
</script>
<style lang="stylus">
  .page-index
    width 800px
    margin 0 auto
    .overflow
      display -webkit-box
      -webkit-line-clamp 2
      overflow hidden
      text-overflow ellipsis
      -webkit-box-orient vertical
      word-wrap break-word
      word-break break-all
    .wrapper
      .__left
        position fixed
        top 120px
        left 50px
        width 300px
        a
          display inline-block
          margin 10px auto 0px
          width 100%
          text-align center
          .fa-github
            font-size 30px
        .mine-info
          width 300px
          display flex
          .__info
            margin-left 30px
            .__city,.__name, .__job
              margin-top 5px
              font-size 20px
              color #000
              line-height 1.5
            .__city, .__job
              font-size 16px
        .__tags
          margin-top 30px
          .el-tag
            margin 5px
            cursor pointer
        .article-wrapper
          margin-top 30px
          .article-list
            margin-bottom 5px
            cursor pointer
      .__right
        width 800px
        margin 0 auto
</style>