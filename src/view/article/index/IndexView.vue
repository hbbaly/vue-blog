<template lang="html">
  <el-row>
    <el-col :span="24">
      <el-form ref="articleCreate" :model="article" :rules="createRules"  v-loading="listLoading">
        <el-row style="margin-top:20px">
          <el-col :span='10' :push="1">
            <el-form-item label="文章标题" label-width="90px" prop="title">
              <el-input v-model="article.title" style="width:260px" placeholder="请在此处输入标题"></el-input>
            </el-form-item>
          </el-col>
      </el-row>
      <el-row>
      <el-col :span="24" :push="1">
            <el-form-item label="所属分类" label-width="90px" prop="type">
              <el-select v-model="article.type" placeholder="请选择分类">
                <el-option  v-for="item in classifyList" :key="item.id" :label="item.type" :value="item"></el-option>
            </el-select>
            </el-form-item>
          </el-col>
      </el-row>
        <el-row style="margin-top:20px">
          <el-col :span='12'>
            <!-- 编辑区 -->
            <el-form-item class="show" prop="content" >
               <el-input type="textarea" v-model="article.content" :rows="25" placeholder="请在此处编辑文章"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='12'>
            <!-- 展示区 -->
            <div style="background:#fff;margin:0 0 0 20px;height:526px;overflow-y:auto;" v-html="markedToHtml" class="article"></div>
          </el-col>
        </el-row>
        <el-form-item style="padding:20px 20px 0 0 " >
          <el-button type="primary" style="float:right;" size='small' @click="editArticle" :loading="load">{{btnText}}</el-button>
            <el-button style="float:right;margin-right:10px" size='small' @click="cancel" >返回</el-button>
      </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import Http from '@/utils/http'
import marked from 'marked';
import hlj from 'highlight.js'
import  'highlight.js/styles/atom-one-dark.css'
import NProgress from 'nprogress'
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
      listLoading:false
    }
  },
  computed: {
     markedToHtml(){
       let content
      marked.setOptions({
        highlight: function (code) {
        return hlj.highlightAuto(code).value;
        }
      });
      content = marked(this.article.content)
      return content;
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      
    },
    editArticle () {
      // 上传文章

      this.$refs.articleCreate.validate(valid=>{
          if(valid){
            this.showMessage({content:"是否创建改文章"}).then(async res => {
              console.log(res)
              NProgress.start()
              this.load = true
              this.btnText = "更新中"
              await this.createArticle()
              this.btnText = "立刻更新"
            })
          }
      })
    },
    cancel () {

    },
    async createArticle () {
      let data = {
        contentToMark:this.markedToHtml,
        ...this.article
      }
      await Http.post('/api/create/article', data, true).then(res => {
        if (res.data.code === 200) {
          this.$message({
            showClose: true,
            message: '创建成功',
            type: 'success'
          });
        } else {
          this.$message({
            showClose: true,
            message: '创建失败',
            type: 'error'
          });
        }
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
<style scoped>
  
</style>