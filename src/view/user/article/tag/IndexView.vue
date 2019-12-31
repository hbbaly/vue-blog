<template>
  <div class="page page-edit-tag">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="分类" prop="classify">
        <el-row class="demo-autocomplete">
          <el-col>
            <el-autocomplete
              class="inline-input"
              v-model="ruleForm.classify"
              :fetch-suggestions="querySearch"
              placeholder="请输入内容"
              @select="handleSelect"
            ></el-autocomplete>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <el-button class="ui-btn" type="primary" :loading="loading" @click="addTag('ruleForm')">{{ btnText }}</el-button>
    <el-tag
      v-for="tag in tags"
      :key="tag._id"
      closable
      :disable-transitions="false"
      @close="deleteTag(tag.classify)"
      type="info">
      {{tag.classify}}
    </el-tag>
  </div>
</template>
<script>
import Http from '@/utils/http'
  export default {
    data() {
      let validateClassify = (rule, value, callback) => {
        setTimeout(() => {
          if (value === '') {
            callback(new Error('请输入分类'));
          }
          callback()
        })
      };
      return {
        restaurants: [],
        btnText: '添加',
        loading: false,
        tags: [
        ],
        ruleForm: {
          classify: ''
        },
        rules: {
          classify: [
            { required: true, validator: validateClassify, trigger: 'change' }
          ]
        }
      };
    },
    mounted() {
      this.restaurants = this.loadAll();
      this.getAllTag()
    },
    methods: {
      addTag (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true
            this.btnText = '提交中'
            Http.post('/api/create/tag',{classify: this.ruleForm.classify}, true).then(res => {
              this.loading = false
              this.btnText = '添加'
              this.getAllTag()
              this.$message({
                message: res.data.message,
                type: 'success'
              });
            })
          } else {
            return false
          }
        })
      },
      getAllTag () {
        Http.post('/api/get/all/tag',{}).then(res => {
          if (res.data.code === 200) {
            this.tags = res.data.data
            // this.ruleForm.classify = ''
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
      deleteTag (classify) {
        let data = {
          classify
        }
        Http.post('/api/remove/tag', data,true).then(res => {
          if (res.data.code === 200) {
              this.getAllTag()
            } else {
              this.$message({
                message: res.data.message,
                type: 'warning'
              })
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
      }
    }
  }
</script>
<style lang="css">
.page-edit-tag{
  margin-top: 30px;
}
  .ui-btn{
    display: block;
    margin: 50px auto;
  }
  .inline-input{
    display: block;
    /* margin: 30px auto; */
  }
  .el-tag{
    margin: 20px 20px 0;
  }
</style>