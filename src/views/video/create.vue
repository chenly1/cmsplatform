<template>
<el-upload
  class="upload-demo"
  action="https://jsonplaceholder.typicode.com/posts/"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :file-list="fileList2"
  :http-request="httpRequest"
  list-type="picture">
  <el-button style = "margin: 10px;float:left;" size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
  <el-progress style = "width :800px" :text-inside="true" :stroke-width="18" :percentage="per" ></el-progress>
</el-upload>
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
    httpRequest(vuefile) {
      let file = vuefile.file;
      let videoName = file.name;
      this.isShow = true;
      var _that = this;
      handeLoadFile(file, videoName, this.progress)
        .then(function(result) {
          _that.per = 0;
          console.log(result);
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    progress(per, fileList) {
      console.log(per); 
      this.per = per * 100;
    }
  },
  mounted(){

  }
};
</script>
