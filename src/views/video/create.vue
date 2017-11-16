<template>
  <div>
    <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :file-list="fileList2" :http-request="httpRequest" list-type="picture">
      <el-button style="margin: 10px;float:left;" size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传.mp4/.avi/.qt/.mov/.mpg/.mpeg文件</div>
      <el-progress style="width :800px" :text-inside="true" :stroke-width="18" :percentage="per"></el-progress>
    </el-upload>
    <div>
      <el-button style="margin: 10px;float:left;" size="small" type="primary" @click="cancelClick">返回</el-button>
    </div>
  </div>
</template>
<script>
import handeLoadFile from "../../components/videoUpload/handelLoadFile";
export default {
  data() {
    return {
      per: 0,
      fileList2: []
    };
  },
  methods: {
    // 退出事件
    cancelClick() {
      this.$confirm('确认返回吗？', '提示', {
        type: 'warning'
      }).then(() => {
        this.$message({
          message: "返回成功!"
          // type: 'success'
        });
        this.$router.push('/video/search');
      }).catch(() => {

      });
    },
    httpRequest(vuefile) {
      // debugger;
      let file = vuefile.file;
      let videoName = file.name;
      this.isShow = true;
      var _that = this;
      handeLoadFile(file, videoName, this.progress)
        .then(function(result) {
          debugger;
          _that.per = 0;
          // console.log(result);
          if (result.flag == true) {
            _that.$message({
              message: "提交成功!",
              type: 'success'
            });
            _that.$router.push('/video/search');
          } else {
            _that.$message({
              message: "提交失败!",
              type: 'error'
            });
          }
        })
        .catch(function(err) {
          debugger;
          _that.$message({
            message: "提交失败!",
            type: 'error'
          });
          // console.log(err);
        });
    },
    progress(per, fileList) {
      console.log(per);
      this.per = per * 100;
    }
  },
  mounted() {

  }
};
</script>
