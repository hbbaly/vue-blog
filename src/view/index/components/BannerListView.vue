<template>
  <div class="block">
    <el-carousel height="300px" :interval="40000" type="card" :autoplay="false">
      <el-carousel-item v-for="item in BannerList" :key="item.title">
        <el-link :href="item.url" target="_blank">
          <el-image :src="item.img" alt="" fit="contain" ></el-image>
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
        console.log(newVal, oldVal, 'ahbb')
      },
      deep: true
    }
  }
}
</script>
<style>
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