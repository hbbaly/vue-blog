<template>
  <div class="page page-user">

  </div>
</template>
<script>
import axios from 'axios'
export default {
  mounted () {
    axios.get('/api/user/info').then(res => {
      
    })
  }
}
</script>
