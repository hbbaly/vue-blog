<template>
  <div>
    <h1>Index</h1>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  mounted () {
    axios.get('/api/get/topics').then(res => {
      console.log(res, 'hbb')
    })
  }
}
</script>