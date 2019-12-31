<template>
  <div class="page page-register">
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
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
       </el-col>
    </el-row>
       <el-row :gutter="20">
      <el-col :xs="{span:20,offset:2}" :sm="{span:18,offset:3}" :md="{span:18,offset:3}" :lg="{span:18,offset:3}" :xl="{span:18,offset:3}">
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"> {{ btnTxt }}</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
       </el-col>
    </el-row>
    </el-form>
    </el-col>
</el-row>
  </div>
</template>
<script>
export default {
  name: "userInfo",
  props: {
    btnTxt: {
      type: String,
      default: '注册'
    }
  },
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
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
          name: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          name: [
            { validator: checkName, trigger: 'blur' }
          ]
        }
      };
    },
    created () {
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = {
              name: this.ruleForm.name,
              password: this.ruleForm.checkPass
            }
            this.$emit('submit', data)
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
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
