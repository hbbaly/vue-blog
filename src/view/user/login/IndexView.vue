<template>
  <div class="page page-login">
  <el-row :gutter="20" class="container">
  <el-col :xs="{span:20,offset:2}" :sm="{span:18,offset:3}" :md="{span:18,offset:3}" :lg="{span:18,offset:3}" :xl="{span:18,offset:3}">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-row :gutter="20">
      <el-col :xs="{span:20,offset:2}" :sm="{span:18,offset:3}" :md="{span:18,offset:3}" :lg="{span:18,offset:3}" :xl="{span:18,offset:3}">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
     <el-row :gutter="20">
      <el-col :xs="{span:20,offset:2}" :sm="{span:18,offset:3}" :md="{span:18,offset:3}" :lg="{span:18,offset:3}" :xl="{span:18,offset:3}">
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
       </el-col>
    </el-row>
       <el-row :gutter="20">
      <el-col :xs="{span:20,offset:2}" :sm="{span:18,offset:3}" :md="{span:18,offset:3}" :lg="{span:18,offset:3}" :xl="{span:18,offset:3}">
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">登陆</el-button>
        <el-button @click="jumpRegister">注册</el-button>
      </el-form-item>
       </el-col>
    </el-row>
    </el-form>
    </el-col>
</el-row>
  </div>
</template>
<script>
import axios from 'axios'
import store from '@/utils/store'
import Http from '@/utils/http'
export default {
  name: "Login",
  data() {
      var checkName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }
        setTimeout(() => {
          // 姓名验证 "^[A-Za-z_@.]{6,10}$"
          if (/^[A-Za-z_@.]{2,10}$/.test(value)) {
            callback();
          } else {
            callback(new Error('请填写2-10位已数字字母开头的用户名'));
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }
        callback()
      };
      return {
        ruleForm: {
          pass: '',
          name: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          name: [
            { validator: checkName, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      open(msg) {
        this.$message(msg);
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = {
              name: this.ruleForm.name,
              password: this.ruleForm.pass
            }
            Http.post('/api/user/login', data).then(res => {
              this.open(res.data.message)
              store.saveWithKey('localStorage', 'token', res.data.data.token)
              if (res.data.code === 200) {
                this.$router.push({
                  path: '/user',
                  query: {
                    name: this.ruleForm.name
                  }})
              } else {
                this.resetForm(formName)
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      jumpRegister () {
        this.$router.push('/user/register')
      }
    }
}
</script>
<style scoped>
.container{
  position: absolute;
  top: 20%;
  left: 0;
  width: 100%;
}
</style>
