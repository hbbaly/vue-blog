<template>
  <div class="page page-edit-tag">
    <el-row class="demo-autocomplete">
  <el-col :span="12" :offset="6">
    <el-autocomplete
      class="inline-input"
      v-model="state"
      :fetch-suggestions="querySearch"
      placeholder="请输入内容"
      @select="handleSelect"
    ></el-autocomplete>
  </el-col>
</el-row>
<el-button class="ui-btn" type="primary" :loading="loading" @click="addTag">{{ btnText }}</el-button>
<el-tag
  v-for="tag in tags"
  :key="tag._id"
  closable
  :type="info">
  {{tag.classify}}
</el-tag>
  </div>
</template>
<script>
import Http from '@/utils/http'
  export default {
    data() {
      return {
        restaurants: [],
        state: '',
        btnText: '添加',
        loading: false,
        tags: [
        ]
      };
    },
    mounted() {
      this.restaurants = this.loadAll();
      this.getAllTag()
    },
    methods: {
      addTag () {
        this.loading = true
        this.btnText = '提交中'
        Http.post('/api/create/tag',{classify: this.state}, true).then(res => {
          this.loading = false
          this.btnText = '添加'
          this.state = ''
        })
      },
      getAllTag () {
        Http.post('/api/get/all/tag',{}).then(res => {
          if (res.data.code === 200) {
            this.tags = res.data.data
          } else {
            this.$message({
              message: res.data.message,
              type: 'warning'
            });
          }
        }).catch( err => {
          this.$message({
              message: err.toString(),
              type: 'warning'
            });
        })
      },
      querySearch(queryString, cb) {
        let restaurants = this.restaurants;
        let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        return [
          {value: 'vue'},
          {value: 'js'},
          {value: 'html'},
          {value: 'css'},
          {value: 'node'},
          {value: 'python'},
          {value: 'java'},
          {value: 'go'},
          {value: 'nuxt'},
          {value: 'react'},
          {value: 'next'},
          {value: 'ssr'},
        ];
      },
      handleSelect(item) {
        console.log(item);
      }
    }
  }
</script>
<style lang="css">
  .ui-btn{
    display: block;
    margin: 50px auto;
  }
  .inline-input{
    display: block;
    margin: 30px auto;
  }
  .el-tag{
    margin: 20px 20px 0;
  }
</style>