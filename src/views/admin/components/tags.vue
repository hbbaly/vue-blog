
<!--
 * @Author: hbbaly
 * @Date: 2019-11-16 17:16:51
 * @GitHub: https://github.com/hbbaly
 * @Description: tags
 -->
<template>

<div class="component-tags">
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <i class="fa fa-tags" aria-hidden="true"></i>标签
  </div>
    <ul class="tags-wrapper">
      <el-tag
        class="tags-list"
        :key="tag._id"
        v-for="tag in tags"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)">
        {{tag.type}}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur = "handleInputConfirm"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
  </ul>
</el-card>
</div>

</template>
<script>
import Http from '@/utils/http.js'
export default {
  props: {
    tags: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      inputVisible: false,
      inputValue: ''
    }
  },
  created () {
    // this.getTags()
  },
  methods: {
    async getTags () {
      let res = await Http.post('/api/get/all/tag', {
      })
      this.tags = res.data.code === 200 ? res.data.data : []
    },
    async handleClose(tag) {
      let res = await Http.post('/api/remove/tag', {
        type: tag.type
      })
      if (res.data.code !== 200) {
        this.$message({
          message: '删除失败',
          type: 'warning'
        });
      } else {
        this.$parent.tags.splice(this.$parent.tags.indexOf(tag), 1)
      }
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    async handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.$parent.tags.push({type: inputValue});
      }
      await this.createTag()
      this.inputVisible = false;
      this.inputValue = '';
    },
    async createTag () {
      let res = await Http.post('/api/create/tag', {
        type: this.inputValue
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../../../assets/css/_variables.styl'
.component-tags
  width 250px 
  height auto 
  padding $row-sm
  background #fefefe
  .fa
    display inline-block
    color $orange
    margin-right $col-smest
  .tags-wrapper
    display flex
    flex-wrap wrap
    .tags-list
      margin $row-sm $row-sm 0 $row-sm 
      // padding $col-smest $row-sm
      // background $orange
      // font-size $fs-sm
      // color $color
      // border-radius 2px 
      cursor pointer
      &:active
        opacity 0.6
    .tags-add
      margin $row-sm $row-sm 0 $row-sm 
      padding $col-smest $row-sm
      font-size $fs-sm
      background $orange
      color $color
      cursor pointer
      &:active
        opacity 0.6
  .el-tag + .el-tag 
    margin-left 10px
  .button-new-tag
    margin-top $row-sm
    margin-left 10px
    height 32px
    line-height 30px
    padding-top 0
    padding-bottom 0
  .input-new-tag 
    margin-top $row-sm
    width 90px
    margin-left 10px
    vertical-align bottom
</style>