<template>
  <div class="page page-change-pass">
    <info :btn-txt="btnTxt" @submit="submitForm"/>
  </div>
</template>
<script>
import Http from '@/utils/http'
import Info from '@/components/Info'
export default {
  name: "ChangePass",
  components: {
    Info
  },
  data() {
      return {
        btnTxt: '修改'
      };
    },
    created () {
    },
    methods: {
      submitForm(data) {
          Http.post('/api/change/pass',data, true).then(res => {
            if (res.data.code === 200) {
              this.$router.push({
                path: '/user'
              })
            } else {
              this.$message({
                message: res.data.message,
                type: 'warning'
              });
            }
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
