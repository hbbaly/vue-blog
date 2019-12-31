
<!--
 * @Author: hbbaly
 * @Date: 2019-11-16 17:15:51
 * @GitHub: https://github.com/hbbaly
 * @Description: time line
 -->
<template>
  <div>
    <div class="page page-time-line">
      <ComponentHeader />
      <el-timeline>
        <el-timeline-item v-for="(item, index) in timeLine" :key="index" :class="{'item_show': item && item.title}" :timestamp="item && item.created_at.split(' ')[0]" size='large' :icon="timeLineIcon(index)" :color="timeLineColor(index)" placement="top">
          <div v-if="item && !Array.isArray(item)" @click="goDetail(item._id)" >
            <el-card v-if="item.title">
              <h4>{{ item.title }}</h4>
              <p>hbbaly 提交于 {{ item.created_at }}</p>
            </el-card>
          </div>
          <div v-if="item && Array.isArray(item)">
            <div v-for="itm in item" :key="itm.id" @click="goDetail(itm._id)">
              <el-card v-if="itm.title">
                <h4>{{ itm.title }}</h4>
                <p>hbbaly 提交于 {{ itm.created_at }}</p>
              </el-card>
            </div>
          </div>
        </el-timeline-item>
      </el-timeline>
    </div>
    <el-pagination
      background
      :page-size="10"
      :pager-count="11"
      layout="prev, pager, next"
      :total="total"
      @current-change="currentChange">
    </el-pagination>
  </div>
</template>
<script>
import ComponentHeader from '@/components/header.vue'
import Http from '@/utils/http.js'
export default {
  components: {
    ComponentHeader
  },
  data () {
    return {
      timeLine: [],
      page: 1,
      limit: 10,
      total: 1
    }
  },
  computed: {
  },
  created () {
    this.getTimeLine()
  },
  methods: {
    timeLineIcon (index) {
      let iconArr = ['el-icon-orange', 'el-icon-pear','el-icon-potato-strips', 'el-icon-lollipop', 'el-icon-ice-cream-round', 'el-icon-ice-tea', 'el-icon-grape', 'el-icon-sugar', 'el-icon-hot-water', 'el-icon-sunny']
      return iconArr[index]
    },
    timeLineColor (index) {
      let colorArr = ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#f60', '#909399', '#303133', '#0D3D6F', '#AA6959' , '#8E1D88' ,'#535EDA']
      // let index = Math.floor(Math.random()*(colorArr.length-1))
      return colorArr[index]
    },
    getTimeLine () {
      Http.post('/api/get/article', {page: this.page, limit: this.limit}).then(res => {
        if (res.data.code === 200 && res.data.data) {
          this.timeLine = res.data.data
          this.total = res.data.total
          // let timeLine = res.data.data
          // let nowTimeLine = [], timeLineObj = [], indexArr = []
          // for (let i = 0 ; i < timeLine.length; i++) {
          //   let item = timeLine[i]
          //   let nowDay = item.created_at.split(' ')[0]
          //   for (let j = i + 1; j <timeLine.length; j++) {
          //     let itemj = timeLine[j]
          //     let nowDayj = itemj.created_at.split(' ')[0]
          //     if (nowDayj === nowDay) {
          //       if (indexArr.length) {
          //         if (indexArr[i]) {
          //           timeLineObj[i] = [...timeLineObj[i], itemj]
          //           indexArr[i] = [...indexArr[i], j]
          //         } else {
          //           for (let k = 0 ; k < indexArr.length; k++ ) {
          //             console.log(indexArr[k], 'indexArr[k]')
          //             if (indexArr[k] && indexArr[k].includes(i)) {
          //               timeLineObj[k] = [...timeLineObj[k], itemj]
          //               indexArr[k] = [...indexArr[k], j]
          //               break
          //             }
          //             if (indexArr[k] && indexArr[k].indexOf(i) === -1 && k === indexArr.length -1) {
          //               timeLineObj[i] = [item, itemj]
          //               indexArr[i] = [i, j]
          //             }
          //           }
          //         }
          //       }else {
          //         timeLineObj[i] = [item, itemj]
          //         indexArr[i] = [i,j]
          //         break
          //       }
          //     } else {
          //       if (indexArr.length) {
          //         if (indexArr[i]) {
          //           timeLineObj[i] = [...timeLineObj[i], itemj]
          //           indexArr[i] = [...indexArr[i], j]
          //         } else {
          //           // if (j === timeLine.length - 1) {
          //           //   timeLineObj[i] = [item]
          //           //   indexArr[i] = [i]
          //           // }
          //           // if (j !== timeLine.length - 1) {
          //             for (let k = 0 ; k<indexArr.length; k++ ) {
          //               if (indexArr[k] && indexArr[k].indexOf(i) >=0) {
          //                 continue
          //               } else {
          //                 if (k === indexArr.length-1 && j === timeLine.length - 1) {
          //                   timeLineObj[i] = [item]
          //                   indexArr[i] = [i]
          //                 }
          //               }
          //             }
          //           // }
          //         }
          //       }else {
          //         timeLineObj[i] = [item, itemj]
          //         indexArr[i] = [i,j]
          //         break
          //       }
          //     }
          //   }
          // }
          // let newTimeLine = []
          // timeLineObj.forEach((item, index) => {
          //   if (item) {
          //     let itm = Array.from(new Set(item))
          //     newTimeLine[index] = Array.from(new Set(item))
          //   }
          // })
          // this.timeLine = newTimeLine
          // console.log(this.timeLine, '===asjkfbshbfsh====')
        }
      })
    },
    goDetail (id) {
      this.$router.push('/article/'+id)
    },
    currentChange (index) {
      this.page = index
      this.getTimeLine()
    }
  }
}
</script>
<style lang="stylus">
@import '../../assets/css/_variables.styl';
.page-time-line
  width 800px
  margin 0 auto 0
  .el-timeline-item
    display none
  .item_show
    display block
    cursor pointer
.el-pagination
  text-align center
</style>