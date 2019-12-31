
<template>
  <div class="component-editor">
    <i class="fa fa-eraser" aria-hidden="true"></i>请开始您的写作
    <el-input size="medium" maxlength="15" show-word-limit v-model="title" placeholder="请输入内容"></el-input>
    <el-autocomplete
      popper-class="my-autocomplete"
      v-model="tag"
      :fetch-suggestions="querySearch"
      placeholder="请输入内容"
      @select="handleSelect">
      <i
        class="el-icon-edit el-input__icon"
        slot="suffix">
      </i>
      <template slot-scope="{ item }">
        <div class="name">{{ item.type }}</div>
      </template>
    </el-autocomplete>
    <!-- <textarea id="editor"></textarea> -->
    <el-input
      id="editor"
      type="textarea"
      :rows="22"
      placeholder="请输入文章内容"
      v-model="textarea">
    </el-input>
    <div class="function-btn">
      <el-button type="danger" icon="el-icon-delete" @click="clear">清除</el-button>
      <el-button type="warning" icon="el-icon-position" @click="publish">发布</el-button>
    </div>
  </div>
</template>
<script>
import marked from '@/utils/marked.js'
import SimpleMDE from 'simplemde'
import 'simplemde/dist/simplemde.min.css'
let simplemde
import Http from '@/utils/http.js'
export default {
  props: {
    tagList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      title: '',
      tag: '',
      textarea: ''
    }
  },
  created () {

  },
  mounted() {
    this.$nextTick(() => {
      this.editor()
    })
  },
  methods: {
    editor () {
      simplemde = new SimpleMDE({
        autoDownloadFontAwesome: false,
        autosave: {
          enabled: true,
          uniqueId: "MyUniqueID",
          delay: 1000
        },
        element: document.getElementById("editor"),
        spellChecker: false,
        previewRender: function(plainText) {
          return marked(plainText); // Returns HTML from a custom parser
        },
        parsingConfig: {
          allowAtxHeaderWithoutSpace: true,
          strikethrough: false,
          underscoresBreakWords: true
        },
        renderingConfig: {
          renderingConfig: {
            singleLineBreaks: false,
            codeSyntaxHighlighting: true
          }
        }
      });
      simplemde.codemirror.on("change", () => {
        this.textarea = simplemde.value();
      });
    },
    querySearch(queryString, cb) {
      let tagList = this.tagList;
      let results = queryString ? tagList.filter(this.createFilter(queryString)) : tagList;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (tagList) => {
        return (tagList.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    loadAll() {
      return [
        
      ]
    },
    handleSelect(item) {
      this.tag = item.type
    },
    confirm (desc = '', title = '') {
      return this.$confirm(desc, title, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
       })
    },
    message (message='警告', type='warning') {
      this.$message({
        message,
        type
      });
    },
    publish () {
       this.confirm(`是否确定发布${this.title}文章?`, '提示').then(() => {
         this.updateArticle()
       }).catch()
    },
    clear () {
      this.confirm(`是否确定清除${this.title}文章?`, '提示').then(() => {
        this.textarea = ''
        simplemde.value('')
      }).catch()
    },
    clearSpace (val='') {
      return val.replace(/\s*/g,"")
    },
    updateArticle () {
      if (!this.clearSpace(this.title)) {
        this.message('请输入标题')
        return
      }
      if (!this.clearSpace(this.tag)) {
        this.message('请选择tag')
        return
      }
      if (!this.clearSpace(this.textarea)) {
        this.message('请输入文章内容')
        return
      }
      Http.post('/api/create/article', {
        title: this.title,
        content: marked(this.textarea),
        type: this.tag,
        contentToMark: this.textarea,
      }, true).then(res => {
        console.log(res)
      })
    }
  }
}
</script>
<style lang="stylus">
@import '../../../assets/css/_variables.styl';
@import '../../../assets/css/editor.styl';
// @import '../../assets/css/preview.styl';
.component-editor
  width 950
  height 100%
  .fa-eraser
    display inline-block
    margin-left $col-lgest!important
    margin-top $col-lgest
    margin-left $col-sm
    font-size 25px 
    color $orange
  .el-input, .el-autocomplete
    display block
    width 300px!important 
    margin-left $col-lgest
    margin-top $col-lgest
  .el-autocomplete
    .el-input
       margin-left 0
  .el-textarea
    margin-left $col-lgest
    margin-top $col-lgest
  .function-btn
    display flex
    position absolute
    bottom 20px 
    right 50px 
    width 300px 
    justify-content flex-end
</style>