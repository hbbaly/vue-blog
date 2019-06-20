<template>
  <el-table
    :data="tableData"
    border
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
</template>

<script>
import Http from '@/utils/http'
  export default {
    name: 'ArticleList',
    data() {
      return {
        tableData: []
      }
    },
    mounted () {
      this.getArticle()
    },
    methods: {
      getArticle () {
        let data = {
          page: 1,
          limit: 10
        }
        Http.post('/api/get/article', data, true).then(res => {
          if (res.data.code === 200) {
            this.tableData = [...this.tableData, ...res.data.data[0]]
          }
        })
      },
      handleClick (row) {
        console.log(row);
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
      }
    }
  }
</script>
<style>
.el-table tr.el-table__row td{

}
/* .el-table tr.el-table__row td .cell{
  display: -webkit-box ;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
} */
</style>
