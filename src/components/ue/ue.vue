<template>
  <div>
    <script :id=id type="text/plain"></script>
  </div>
</template>
<script>
export default {
  name: 'UE',
  data() {
    return {
      editor: null
    }
  },
  props: {
    defaultMsg: {
      type: String
    },
    config: {
      type: Object
    },
    id: {
      type: String
    },
  },
  mounted() {
    const _this = this;
    UE.delEditor(this.id);
    this.editor = UE.getEditor(this.id, this.config); // 初始化UE
    this.editor.addListener("ready", function() {
      _this.$emit("aaa");
      // _this.editor.setContent(_this.defaultMsg); // 确保UE加载完成后，放入内容。
    });
  },
  methods: {
    getUEContent() { // 获取内容方法
      //_this.editor.execCommand( 'cleardoc' );
      debugger;
      var content = this.editor.getContent();
      //var contentArr = content.split("</viedo>");
      return content;
    },
    setUEContent(msg) {
      this.editor.setContent(msg) // 确保UE加载完成后，放入内容。
    },
    getUEfocus() {
      this.editor.focus();
    },
    clear() {
      this.editor.setContent('')
    }
  },
  destroyed() {
    this.editor.destroy()
  }
}
</script>
