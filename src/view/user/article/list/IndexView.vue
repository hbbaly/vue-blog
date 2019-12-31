<template>
<div class="page page-article-list">
  <el-table
    :data="tableData"
    border
    v-loading="loading"
    style="width: 100%">
    <el-table-column
      fixed
      prop="created_at"
      label="日期"
      width="200">
    </el-table-column>
    <el-table-column
      prop="title"
      label="标题"
      width="200">
    </el-table-column>
    <el-table-column
      prop="content"
      label="描述"
      width="450">
    </el-table-column>
    <el-table-column
      prop="type"
      label="标签"
      width="100">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small" @click="handleArticle(scope.row)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    background
    :page-size="limit"
    :hide-on-single-page="value"
    layout="prev, pager, next"
    :total="total"
    @current-change="changeCurrent">
  </el-pagination>
</div>
</template>

<script>
import Http from '@/utils/http'
  export default {
    name: 'ArticleList',
    data() {
      return {
        loading: true,
        tableData: [],
        limit: 2,
        page: 1,
        total: 0,
        value: true
      }
    },
    async mounted () {
      await this.getArticle()
      this.loading = false
    },
    methods: {
      getArticle () {
        let data = {
          page: this.page,
          limit: this.limit
        }
        Http.post('/api/get/article', data, true).then(res => {
          if (res.data.code === 200) {
            this.tableData = res.data.data[0]
            this.total = res.data.data[1]
          }
        })
      },
      handleClick (row) {
        // 跳转文章详情页面
        this.$router.push({
          path: `/user/article/detail/${row._id}`
        })
      },
      handleArticle (row) {
        // 跳转到编辑文章页面
        this.$router.push(
          {
            path: '/article/create',
            query: {
              article: JSON.stringify(row)
            }
          }
        )
      },
      async changeCurrent (val) {
        this.loading = true
        this.page = val
        await this.getArticle()
        this.loading = false
      }
    }
  }
</script>
<style>
.page-article-list{
  margin-top: 30px;
}
.el-table tr.el-table__row td{

}
.el-pagination{
    margin: 20px auto;
  }
/* .el-table tr.el-table__row td .cell{
  display: -webkit-box ;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
} */
</style>
