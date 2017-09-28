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
            <el-checkbox v-model="check" @change="changeOnOff"></el-checkbox>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="用途">
            <el-select v-model="form.purpose" placeholder="请选择" :disabled="disabled">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
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

.button {
  margin: 10px;
  float: right;
}
</style>
<script>
import UE from '../../components/ue/ue.vue';
import { update, getListData, submit } from '../../api/api'
export default {
  name: 'edit',
  components: { UE },
  data() {
    var isCheck = (rule, value, callback) => {
      if (value === '' && this.check === false) {
        return callback(new Error('请输入内容！'));
      } else {
        callback();
      }

    };
    return {
      options: [{
        value: 'edu',
        label: '健康教育'
      }, {
        value: 'news',
        label: '新闻'
      }],
      defaultMsg: '',
      config: {
        toolbars: [
          ['source', //源代码
            'undo', //撤销
            'redo', //重做
            'bold', //加粗
            'indent', //首行缩进
            'snapscreen', //截图
            'italic', //斜体
            'underline', //下划线
            'strikethrough', //删除线
            'subscript', //下标
            'fontborder', //字符边框
            'superscript', //上标
            'formatmatch', //格式刷
            'blockquote', //引用
            'pasteplain', //纯文本粘贴模式
            'selectall', //全选
            'horizontal', //分隔线
            'removeformat', //清除格式
            'time', //时间
            'date', //日期
            'insertrow', //前插入行
            'insertcol', //前插入列
            'mergeright', //右合并单元格
            'mergedown', //下合并单元格
            'deleterow', //删除行
            'deletecol', //删除列
            'splittorows', //拆分成行
            'splittocols', //拆分成列
            'splittocells', //完全拆分单元格
            'deletecaption', //删除表格标题
            'inserttitle', //插入标题
            'mergecells', //合并多个单元格
            'deletetable', //删除表格
            'cleardoc', //清空文档
            'insertparagraphbeforetable', //"表格前插入行"
            'fontfamily', //字体
            'fontsize', //字号
            'paragraph', //段落格式
          ], [
            'simpleupload', //单图上传
            'insertimage', //多图上传
            'edittable', //表格属性
            'edittd', //单元格属性
            'emotion', //表情
            'spechars', //特殊字符
            'searchreplace', //查询替换
            'insertvideo', //视频
            'help', //帮助
            'justifyleft', //居左对齐
            'justifyright', //居右对齐
            'justifycenter', //居中对齐
            'justifyjustify', //两端对齐
            'forecolor', //字体颜色
            'backcolor', //背景色
            'map', //Baidu地图
            'insertorderedlist', //有序列表
            'insertunorderedlist', //无序列表
            'fullscreen', //全屏
            'directionalityltr', //从左向右输入
            'directionalityrtl', //从右向左输入
            'rowspacingtop', //段前距
            'rowspacingbottom', //段后距
            'pagebreak', //分页
            'insertframe', //插入Iframe
            'imagenone', //默认
            'imageleft', //左浮动
            'imageright', //右浮动
            'attachment', //附件
            'imagecenter', //居中
            'wordimage', //图片转存
            'lineheight', //行间距
            'edittip ', //编辑提示
            'autotypeset', //自动排版
            'touppercase', //字母大写
            'tolowercase', //字母小写
            'background', //背景
            'template', //模板
            'inserttable' //插入表格
          ]],
        initialFrameWidth: null,
        initialFrameHeight: 350
      },
      ue1: "ue1",
      redStar: false,
      forbidden: true,
      disabled: false,
      form: {
        id: '',
        title: '',
        subtitle: '',
        editor: '',
        source: '',
        sourceUrl: '',
        original: '',
        author: '',
        mainBody: '',
        purpose: 'edu'
      },
      getDataUrl: '/manager/article/',
      check: '',
      rules: {
        title: [
          { required: true, message: '请输入模版标题', trigger: 'blur' }
        ],
        editor: [
          { required: true, message: '请输入责任编辑', trigger: 'blur' }
        ],
        source: [
          { message: '请输入来源', trigger: 'blur', validator: isCheck }
        ],
        sourceUrl: [
          { message: '请输入来源地址', trigger: 'blur', validator: isCheck }
        ],
        author: [
          { message: '请输入原作者', trigger: 'blur', validator: isCheck }
        ]
      }
    }
  },
  methods: {
    getData() {
      debugger;
      var _that = this;
      if (this.$route.params.rowid == 0) {
        _that.form.original = 1;
        _that.disabled = false;
        _that.check = true;
      } else {
        _that.disabled = true;
        var url = this.getDataUrl + this.$route.params.rowid;
        getListData(url).then(function(response) {
          _that.form = response.data.data;
          _that.defaultMsg = response.data.data.mainBody;
          _that.$refs.ue.setUEContent(_that.defaultMsg);
          console.log(_that.defaultMsg);
          if (_that.form.original === 2) {
            _that.check = false;
          }
          if (_that.form.original === 1) {
            _that.check = true;
          }
          _that.changeOnOff();
        }).catch(() => {
        });
      }
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
            debugger;
            _that.form.mainBody = _that.$refs.ue.getUEContent();
            let para = Object.assign({}, _that.form);
            if (_that.$route.params.rowid == 0) {
              submit(_that.getDataUrl, para)
                .then(function(res) {
                  debugger;
                  _that.$router.push('/article/search');
                }).catch(() => {
                });
            }
            else {
              let url = _that.getDataUrl + para.id;
              update(url, para)
                .then(function(res) {
                  _that.$router.push('/article/search');

                }).catch(() => {
                });
            }
          }).catch(() => {
          });
        }
        else {
          return false;
        }
      });
    },
    changeOnOff() {
      if (this.check === false) {
        // 开启重复提醒功能，给表单验证添加相应规则，并添加红色星号。
        this.forbidden = false;
        this.redStar = true;
        this.form.original = 2;
      } else {
        // 关闭重复提醒功能，将表单验证中的相应规则，替换为空，并移除红色星号。不能删除相关规则，否则无法重新验证了，残留表单验证信息。
        this.forbidden = true;
        this.redStar = false;
        this.form.original = 1;
      }
    }
  }
}
</script>