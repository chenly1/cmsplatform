<template>
  <el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
    <el-row>
      <el-col :span="12">
        <el-form-item label="标题">
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
        <el-form-item label="责任编辑">
          <el-input v-model="form.editor" placeholder="（必填）" class="login-form-input"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="原创">
          <el-switch on-color="#13ce66" off-color="#ff4949" v-model="form.original" :change="switchChange()"></el-switch>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="来源">
          <el-input v-model="form.source" :disabled="true" class="input"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="原作者">
          <el-input v-model="form.author" :disabled="true" class="input"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="来源地址">
      <el-input v-model="form.sourceurl" :disabled="true" class="input">
        <template slot="prepend">Http://</template>
      </el-input>
    </el-form-item>
  </el-form>
</template>
<style>
.login-form-input .el-input__inner {
  border: 0 none;
  border-bottom: 1px solid #ccc;
  border-radius: 0px;
}

.input .el-input__inner {
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
        sourceurl: '',
        original: true,
        author: '',
        mainbody: ''
      }
    }
  },
  methods: {
    switchChange: function() {
      debugger;
      if (this.form.original === false) {
        const input = document.querySelector(".input .el-input__inner");
        input.disabled = false;
      }
    },
    onSubmit (url,ueContent) {
      debugger;
      let content = ueContent;
      this.form.mainbody = content;
      let para = Object.assign({}, this.form);
      Vue.http.post(url, para, { emulateJSON: true })
        .then(
        function(res) {
          debugger;
           //请求成功的回调函数
          //先结束loading效果
          loading.close();
          //调用设置hot数据的方法,把请求成功的数据给hot数组
          content.commit("setHot", res.body);
        }, function() { }
        );
    }
  }
}
</script>