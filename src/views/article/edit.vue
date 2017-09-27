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
        <el-col :span="12">
          <el-form-item label="原创">
            <el-checkbox :checked="changeOnOff" v-model="check" @change="changeOnOff"></el-checkbox>
            <template v-if=" check === true ">
              <el-input v-model="form.original" style="display:none" value=1></el-input>
            </template>
            <template v-else>
              <el-input v-model="form.original" style="display:none" value=2></el-input>
            </template>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="来源" prop="source" :required="redStar">
              <el-input v-model="form.source" :disabled="forbidden" class="login-form-input"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="原作者" prop="author" :required="redStar">
              <el-input v-model="form.author" :disabled="forbidden" class="login-form-input"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="来源地址" prop="sourceUrl" :required="redStar">
          <el-input v-model="form.sourceUrl" :disabled="forbidden" class="login-form-input">
          </el-input>
      </el-form-item>
    </el-form>
    <div class="components-container">
      <div class="editor-container">
        <UE :defaultMsg=defaultMsg :config=config :id=ue1 ref="ue" v-on:aaa="getData"></UE>
      </div>
    </div>
    <el-button type="primary" @click="cancelClick" class="button">返回</el-button>
    <el-button type="primary" @click="onSubmit" class="button">提交
      <i class="el-icon-upload el-icon--right"></i>
    </el-button>
  </div>
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
import UE from '../../components/ue/ue.vue';
import { update, getListData } from '../../api/api'
export default {
  name: 'edit',
  components: { UE },
  data() {
    return {
      source: [
        { required: true, message: '请输入来源', trigger: 'blur' }
      ],
      sourceUrl: [
        { required: true, message: '请输入来源地址', trigger: 'blur' }
      ],
      author: [
        { required: true, message: '请输入原作者', trigger: 'blur' }
      ],
      defaultMsg: '',
      config: {
        toolbars: [
          ['fullscreen', 'simpleupload', 'insertimage', 'insertvideo', 'source', 'undo', 'redo', 'bold']
        ],
        initialFrameWidth: null,
        initialFrameHeight: 350
      },
      ue1: "ue1",
      redStar: false,
      forbidden: true,
      form: {
        id: '',
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
      getDataUrl: '/manager/article/',
      check: '',
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
    getData() {
      var _that = this;
      var url = this.getDataUrl + this.$route.params.rowid;
      getListData(url)
        .then(function(response) {
          _that.form = response.data.data;
          //_that.$refs.ue.setUEContent(response.data.data.mainBody);
          _that.defaultMsg = response.data.data.mainBody;
          _that.$refs.ue.setUEContent(_that.defaultMsg);
          console.log(_that.defaultMsg);
          if (_that.form.original === 2) {
            _that.check = false;
          }
          if (_that.form.original === 1) {
            _that.check = true;
          }

        }).catch(() => {
        });
    },
    // 退出事件
    cancelClick() {

      this.$router.push('/article/search');
    },
    onSubmit() {
      var _that = this;
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.form.mainBody = this.$refs.ue.getUEContent();
            let para = Object.assign({}, this.form);
            let url = _that.getDataUrl + para.id;
            update(url, para)
              .then(function(res) {
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
    },
    changeOnOff(val) {
      debugger;
      if (val.eventPhase === 2) {
        // 开启重复提醒功能，给表单验证添加相应规则，并添加红色星号。
        this.forbidden = false;
        this.redStar = true;
        this.$set(this.rules, "source", this.source);
        this.$set(this.rules, "sourceUrl", this.sourceUrl);
        this.$set(this.rules, "author", this.author);
        this.$refs['form'].validate();
      } else {
        // 关闭重复提醒功能，将表单验证中的相应规则，替换为空，并移除红色星号。不能删除相关规则，否则无法重新验证了，残留表单验证信息。
        this.forbidden = true;
        this.redStar = false;
        this.$set(this.rules, "source", [{}]);
        this.$set(this.rules, "sourceUrl", [{}]);
        this.$set(this.rules, "author", [{}]);
        this.$refs['form'].validate();
      }
    }
  }
  // ,
  // mounted() {
  //   this.getData();
  // }
}
</script>