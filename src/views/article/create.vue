<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px" :rules="rules" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
      <el-row>
        <el-col :span="12">
          <el-form-item label="标题" prop="title">
            <el-input v-model="form.title" placeholder="（必填）" class="login-form-input"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="副标题">
            <el-input v-model="form.subtitle" class="login-form-input"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="责任编辑" prop="editor">
            <el-input v-model="form.editor" placeholder="（必填）" class="login-form-input"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="原创">
            <el-checkbox :checked="check" v-model="check"></el-checkbox>
            <template v-if=" check === true ">
              <el-input v-model="form.original" style="display:none" value=1></el-input>
            </template>
            <template v-else>
              <el-input v-model="form.original" style="display:none" value=2></el-input>
            </template>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="用途">
            <el-select v-model="form.purpose" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="来源">
            <template v-if=" check === true ">
              <el-input v-model="form.source" :disabled="true" class="login-form-input"></el-input>
            </template>
            <template v-else>
              <el-input v-model="form.source" :disabled="false" class="login-form-input"></el-input>
            </template>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="原作者">
            <template v-if=" check === true ">
              <el-input v-model="form.author" :disabled="true" class="login-form-input"></el-input>
            </template>
            <template v-else>
              <el-input v-model="form.author" :disabled="false" class="login-form-input"></el-input>
            </template>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="来源地址">
        <template v-if=" check === true ">
          <el-input v-model="form.sourceUrl" :disabled="true" class="login-form-input">
          </el-input>
        </template>
        <template v-else>
          <el-input v-model="form.sourceUrl" :disabled="false" class="login-form-input">
          </el-input>
        </template>
      </el-form-item>
    </el-form>
    <div class="components-container">
      <div class="editor-container">
        <UE :defaultMsg=defaultMsg :config=config :id=ue1 ref="ue"></UE>
      </div>
    </div>
    <el-button type="primary" @click="cancelClick" class="button">返回</el-button>
    <el-button type="primary" @click="onSubmit" class="button">提交
      <i class="el-icon-upload el-icon--right"></i>
    </el-button>

  </div>
</template>
<style>
.button {
  margin: 10px;
  float: right;
}
</style>
<script>
import UE from '../../components/ue/ue.vue'
import { submit } from '../../api/api'
export default {
  components: { UE },
  data() {
    return {
      options: [{
        value: 'edu',
        label: '健康教育'
      }, {
        value: 'news',
        label: '新闻'
      }],
      form: {
        title: '',
        subtitle: '',
        editor: '',
        source: '',
        sourceUrl: '',
        original: 1,
        author: '',
        mainBody: '',
        purpose: 'edu'
      },
      check: true,
      rules: {
        title: [
          { required: true, message: '请输入模版标题', trigger: 'blur' }
        ],
        editor: [
          { required: true, message: '请输入责任编辑', trigger: 'blur' }
        ]
      },
      defaultMsg: '',
      config: {
        toolbars: [
          ['fullscreen', 'simpleupload', 'insertimage', 'insertvideo', 'source', 'undo', 'redo', 'bold']
        ],
        initialFrameWidth: null,
        initialFrameHeight: 350
      },
      ue1: "ue1"
    }
  },
  methods: {
    // 退出事件
    cancelClick() {
      this.$router.push('/article/search');
    },
    onSubmit() {
      let content = this.$refs.ue.getUEContent(); // 调用子组件方法
      var url = '/manager/article'
      var _that = this;
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.form.mainBody = content;
            let para = Object.assign({}, this.form);
            debugger;
            submit(url, para)
              .then(function(res) {
                debugger;
                _that.$router.push('/article/search');
              }).catch(() => {
              });
          }).catch(() => {
          });
        }
        else {
          return false;
        }
      });
    }

  }
}

</script>