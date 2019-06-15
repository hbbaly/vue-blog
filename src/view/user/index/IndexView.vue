<template>
<div class="page page-user">
  <el-row class="tac">
  <el-col :span="6">
    <el-menu
      :default-active="menuActive"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      :router="isRouter"
      active-text-color="#ffd04b">
      <el-menu-item index="user">
        <i class="el-icon-user"></i>
        <span slot="title">个人中心</span>
      </el-menu-item>
       <el-submenu index="article">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span >文章管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="create">编辑文章</el-menu-item>
          <el-menu-item index="list">文章列表</el-menu-item>
          <el-menu-item index="tag">标签</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="settings">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>设置</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="changePass">更改密码</el-menu-item>
          <el-menu-item index="logout">选项登陆</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-col>
  <el-col :span="18">
    <router-view></router-view>
  </el-col>

</el-row >
</div>
</template>
<script>
  export default {
    name: 'User',
    data (){
      return {
        isRouter: false,
        menuActive: '1'
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleSelect (index, indexPath) {
        console.log(index, indexPath, 'hbb')
        this.selectComponent(indexPath)
      },
      selectComponent (indexPath) {
        let path = indexPath.join('/')
        this.$router.push({
          path:`/${path}`
        })
      }
    }
  }
</script>
<style scoped>
.el-col-6{
  height: 100vh;
  background-color:#545c64;
}
.el-submenu .el-menu-item{
  min-width: 100%;
}
</style>

