<template>
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
      <el-col :span="12">
        <el-form-item label="原创">
          <el-checkbox :checked="check" v-model="check"></el-checkbox>
          <template v-if=" check === true ">
            <el-input v-model="form.original" style="display:none" value=1></el-input>
          </template>
           <template v-else>
            <el-input v-model="form.original" style="display:none" value=0></el-input>
          </template>
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
          <template slot="prepend"> Http://</template>
        </el-input>
      </template>
      <template v-else>
        <el-input v-model="form.sourceUrl" :disabled="false" class="login-form-input">
          <template slot="prepend"> Http://</template>
        </el-input>
      </template>
    </el-form-item>
  </el-form>
</template>
<style>
.login-form-input .el-input__inner {
  border: 0 none;
  border-bottom: 1px solid #ccc;
  border-radius: 0px;
}

.info {
  border-radius: 10px;
  line-height: 20px;
  padding: 10px;
  margin: 10px;
  margin-bottom: 10px;
  background-color: #ffffff;
}

.button {
  margin: 10px;
  float: right;
}
</style>
<script>
export default {
  name: 'create',
  data() {
    return {
      form: {
        title: '',
        subtitle: '',
        editor: '',
        source: '',
        sourceUrl: '',
        original: 1,
        author: '',
        mainBody: '',
        purpose: ''
      },
      check: true,
      rules: {
        title: [
          { required: true, message: '请输入模版标题', trigger: 'blur' }
        ],
        editor: [
          { required: true, message: '请输入责任编辑', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit(url, ueContent,purpose) {
      debugger;
      var _that = this;
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            let content = ueContent;
            this.form.mainBody = content;
            this.form.purpose = purpose;
            let para = Object.assign({}, this.form);
            _that.$http.post(url, para)
              .then(function(res) {
                debugger;
                //请求成功的回调函数
                //先结束loading效果
                loading.close();
              }, function() { }
              );
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