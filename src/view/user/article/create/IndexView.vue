<template lang="html">
  <div class="page page-create">
    
  </div>
</template>

<script>
import Http from '@/utils/http'
import marked from '../../../../assets/js/marked';
import SimpleMDE from "simplemde";
import css from "simplemde/dist/simplemde.min.css";
import NProgress from 'nprogress'
let simplemde;
export default {
  name: 'CreateArticle',
  data(){
    return {
      article:{
        id:'',
        title:'',
        type:'',
        content:''
      },
      classifyList:['js','vue','node','html','css'],
      createRules:{
        title:[
          { required: true, message: '请填写标题', trigger: 'blur' }
        ],
        content:[
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        type:[
          { required: true, message: '请选择分类', trigger: 'change' }
        ]
      },
      load:false,
      btnText:"立即更新",
      listLoading:false,
      isEdit: false
    }
  },
  computed: {
  },
  watch: {
    $route (newVal, oldVal) {
      this.initData()
    }
  },
  created () {
    this.initData()
  },
  mounted () {
    this.$nextTick(() => {
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
        this.article.content = simplemde.value();
      });
    });
  },
  methods: {
    initData () {
      const { article }  = this.$route.query
      if (article) {
        this.article = Object.assign({}, this.article, JSON.parse(article))
        this.isEdit = true
      } else {
        this.article = {
          id:'',
          title:'',
          type:'',
          content:''
        }
        this.isEdit = false
      }
    },
    editArticle () {
      // 上传文章
      this.$refs.articleCreate.validate(valid=>{
        if(valid){
          this.showMessage({content:"是否创建改文章"}).then(res => {
            if (res === 'confirm') {
              this.operateArticle()
            }
          })
        }
      })
    },
    cancel () {
    },
    async updateArticle (data) {
      await Http.post('/api/update/article', data, true).then(res => {
        if (res.data.code === 200) {
          this.$message({
            showClose: true,
            message: '更新成功',
            type: 'success',
            onClose: () => {
              this.$router.go(-1)
            }
          });
        } else {
          this.$message({
            showClose: true,
            message: '更新失败',
            type: 'error'
          });
        }
      }).catch(err => {
        this.$message({
            showClose: true,
            message: err.toString(err),
            type: 'error'
          });
      })
    },
    async operateArticle () {
      let data = {
        contentToMark:this.markedToHtml,
        ...this.article
      }
      NProgress.start()
      this.btnText = "更新中"
      this.load = true
      if (this.isEdit) {
        await this.updateArticle(data)
      } else {
        await this.createArticle(data)
      }
      this.btnText = "立刻更新"
      this.load = false
      NProgress.done()
    },
    async createArticle (data) {
      await Http.post('/api/create/article', data, true).then(res => {
        if (res.data.code === 200) {
          this.$message({
            showClose: true,
            message: '创建成功',
            type: 'success',
            onClose: () => {
              this.$router.push({
                path: '/article/list'
              })
            }
          });
        } else {
          this.$message({
            showClose: true,
            message: '创建失败',
            type: 'error'
          });
        }
      }).catch(err => {
        this.$message({
            showClose: true,
            message: err.toString(err),
            type: 'error'
          });
      })
    },
    showMessage (data) {
      const {content, type="warning", title="提示", cancel="取消", sure="确定", cancelText="取消成功", sureText="确认成功"} = data
      return this.$confirm(content, title, {
        confirmButtonText: sure,
        cancelButtonText: cancel,
        type: type
      })
    }
  }
}
</script>
<style lang="stylus">
/* 代码块高亮 */
.gutter pre
  color #999
pre
  color: #525252
  background: #ddd
  .function .keyword,
  .constant
    color: #0092db
  .keyword,
  .attribute
    color: #e96900
  .number,
  .literal
    color: #AE81FF
  .tag,
  .tag .title,
  .change,
  .winutils,
  .flow,
  .lisp .title,
  .clojure .built_in,
  .nginx .title,
  .tex .special
    color: #2973b7
  .class .title
    color: #42b983
  .symbol,
  .symbol .string,
  .value,
  .regexp
    color: $blue
  .title
    color: #A6E22E
  .tag .value,
  .string,
  .subst,
  .haskell .type,
  .preprocessor,
  .ruby .class .parent,
  .built_in,
  .sql .aggregate,
  .django .template_tag,
  .django .variable,
  .smalltalk .class,
  .javadoc,
  .django .filter .argument,
  .smalltalk .localvars,
  .smalltalk .array,
  .attr_selector,
  .pseudo,
  .addition,
  .stream,
  .envvar,
  .apache .tag,
  .apache .cbracket,
  .tex .command,
  .prompt
    color: $blue
  .comment,
  .java .annotation,
  .python .decorator,
  .template_comment,
  .pi,
  .doctype,
  .deletion,
  .shebang,
  .apache .sqbracket,
  .tex .formula
    color: #b3b3b3
  .coffeescript .javascript,
  .javascript .xml,
  .tex .formula,
  .xml .javascript,
  .xml .vbscript,
  .xml .css,
  .xml .cdata
    opacity: 0.5
</style>