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
import handeLoadFile from "./handelLoadFile";
export default {
  data() {
    return {
      per: 0,
      fileList2: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ]
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    httpRequest(vuefile) {
      let file = vuefile.file;
      let videoName = file.name;
      this.isShow = true;
      handeLoadFile(file, videoName, this.progress)
        .then(function(result) {
          this.per = 0;
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
