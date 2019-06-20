<template>
  <div class="block">
    <el-carousel height="300px" :interval="40000" type="card" :autoplay="false">
      <el-carousel-item v-for="item in BannerList" :key="item.id">
        <el-link :href="item.url" target="_blank">
          <el-image :src="item.img" alt="" fit="cover" height="200" ></el-image>
        </el-link>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  name: 'BannerListView',
  props: {
    BannerList: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    BannerList: {
      handler (newVal, oldVal) {
      },
      deep: true
    }
  }
}
</script>
<style>
  .block{
    width: 70%;
    margin: 0 auto 30px;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
</style>