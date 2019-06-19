<template>
    <div class="NotFound">
      <div class="__wrapper">
        <p>404 !</p>
        <p class="__back"><a @click="goHome" href="javascript:;">请重回主页</a></p>
      </div>

    </div>
</template>

<script>
export default {
  methods:{
    goHome(){
      this.$router.replace({path:'/'});
    }
  }
}
</script>

<style lang="css" scoped>
  .NotFound{
    display: flex;
    height: 100vh;
    color:#000;
    padding: 1rem;
  }
  .__wrapper{
    margin:auto;
    text-align: center;
  }
  .__wrapper p{
    font-size: 60px;
  }
  .__wrapper .__back{
    font-size: 30px;
    margin-top: 100px;
  }
  .__wrapper p a:hover{
    opacity: 0.8;
  }
</style>
