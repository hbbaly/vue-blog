<template>
  <div class="page page-user">

  </div>
</template>
<script>
import Http from '@/utils/http'
export default {
  mounted () {
    Http.post('/api/user/info',{}, true).then(res => {
      
    })
  }
}
</script>
