<template>
  <div class="page page-register">
    <info :btn-txt="btnTxt" @submit="submitForm"/>
  </div>
</template>
<script>
import Http from '@/utils/http'
import Info from '@/components/Info'
import store from '@/utils/store'
export default {
  name: "Register",
  components: {
    Info
  },
  data() {
      return {
        btnTxt: '注册'
      }
    },
    created () {
    },
    methods: {
      submitForm(data) {
        Http.post('/api/user/register',data).then(res => {
          if (res.data.code === 200) {
            store.saveWithKey('localStorage', 'token', res.data.data.token)
            this.$router.push({
              path: '/user'
            })
          } else {
            this.$message({
              message: res.data.message,
              type: 'warning'
            });
          }
        }).catch(err => {
            this.$message({
              message: err,
              type: 'warning'
            });
        })
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
